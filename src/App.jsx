import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Text, useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import logoSvg from '../assets/LOGOSUPCOM.svg';
import tunnelTextureUrl from '../assets/textures/tunnel.jpg';
import tunnelTwoTextureUrl from '../assets/textures/tunnel 2.jpg';
import tunnelThreeTextureUrl from '../assets/textures/tunnel 3.jpg';
import tunnelFourTextureUrl from '../assets/textures/tunnel 4.png';
import tunnelPanelModelOneUrl from '../assets/models/model-1790538962380-panel.glb?url';
import tunnelPanelModelTwoUrl from '../assets/models/model-1790546000228-panel.glb?url';
import {
  HOME_SECTION_ID,
  InputSystem,
  NavigationSystem,
  SECTION_META,
  SECTION_ORDER,
  TransitionSystem,
  WorldStateSystem,
  CameraController,
} from './systems/navigationSystem';

const TARGET_DATE = new Date('2026-11-12T07:00:00');
const TUNNEL_TEXTURE_URLS = [tunnelTextureUrl, tunnelTwoTextureUrl, tunnelThreeTextureUrl, tunnelFourTextureUrl];
const TUNNEL_PANEL_MODEL_URLS = [tunnelPanelModelOneUrl, tunnelPanelModelTwoUrl];
const TUNNEL_PANEL_COUNT = 10;
const TUNNEL_RING_COUNT = 66;
const TUNNEL_PANEL_RADIUS = 13.78;

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function Navbar({ currentSection, onNavigate }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="brand-block">
        <img src={logoSvg} alt="SUPCOM logo" className="brand-logo" />
      </div>
      <div className="nav-items">
        {['HOME', ...SECTION_ORDER].map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-item ${currentSection === item ? 'is-active' : ''}`}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HomePanel({ timeLeft }) {
  return (
    <div className="home-panel">
      <p className="eyebrow">SUPCOM 2026</p>
      <h1>Future systems. Real world impact.</h1>
      <div className="countdown-grid" aria-label="Countdown timer">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="countdown-box">
            <span className="countdown-value">{String(item.value).padStart(2, '0')}</span>
            <span className="countdown-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionDetail({ sectionId }) {
  const meta = SECTION_META[sectionId];

  return (
    <div className="section-detail">
      <p className="eyebrow">SECTION / {meta.label}</p>
      <h2>{meta.label}</h2>
      <p>{meta.copy}</p>
    </div>
  );
}

function TunnelPanels() {
  const meshRefs = useRef([]);
  const tunnelTextures = useTexture(TUNNEL_TEXTURE_URLS);
  const panelModels = useGLTF(TUNNEL_PANEL_MODEL_URLS);
  const panelGeometries = useMemo(() => panelModels.map(({ scene }) => {
    scene.updateMatrixWorld(true);
    const sourceMesh = scene.getObjectByProperty('isMesh', true);
    const geometry = sourceMesh.geometry.clone().applyMatrix4(sourceMesh.matrixWorld);
    const sourceBounds = new THREE.Box3().setFromBufferAttribute(geometry.getAttribute('position'));
    const sourceCenter = sourceBounds.getCenter(new THREE.Vector3());
    geometry.translate(-sourceCenter.x, -sourceCenter.y, -sourceCenter.z);
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));

    const bounds = new THREE.Box3().setFromBufferAttribute(geometry.getAttribute('position'));
    const size = bounds.getSize(new THREE.Vector3());
    geometry.scale(
      (TUNNEL_PANEL_RADIUS * Math.PI * 2 / TUNNEL_PANEL_COUNT) * 1.02 / size.x,
      0.46 / size.y,
      6.72 / size.z,
    );
    return geometry;
  }), [panelModels]);
  const panelTransforms = useMemo(() => {
    const transformsByModelAndTexture = TUNNEL_PANEL_MODEL_URLS.map(() => TUNNEL_TEXTURE_URLS.map(() => []));
    const dummy = new THREE.Object3D();

    for (let ring = 0; ring < TUNNEL_RING_COUNT; ring += 1) {
      for (let panel = 0; panel < TUNNEL_PANEL_COUNT; panel += 1) {
        const textureRoll = (ring * 17 + panel * 13) % 40;
        const textureIndex = textureRoll === 0 ? 2 : textureRoll === 20 ? 3 : (ring + panel) % 2;
        const modelIndex = (ring + panel) % TUNNEL_PANEL_MODEL_URLS.length;
        const angle = (panel / TUNNEL_PANEL_COUNT) * Math.PI * 2;
        const z = -(ring * 7.5) - 2;

        dummy.position.set(Math.cos(angle) * TUNNEL_PANEL_RADIUS, Math.sin(angle) * TUNNEL_PANEL_RADIUS, z);
        dummy.rotation.set(
          (((ring * 3 + panel) % 5) - 2) * 0.012,
          (((ring * 5 + panel * 2) % 5) - 2) * 0.012,
          angle + Math.PI / 2 + (((ring + panel * 3) % 5) - 2) * 0.008,
        );
        dummy.scale.set(1, 1, 0.9 + ((ring * 11 + panel) % 4) * 0.04);
        dummy.updateMatrix();
        transformsByModelAndTexture[modelIndex][textureIndex].push(dummy.matrix.clone());
      }
    }

    return transformsByModelAndTexture;
  }, []);

  tunnelTextures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  useLayoutEffect(() => {
    panelTransforms.forEach((transformsByTexture, modelIndex) => {
      transformsByTexture.forEach((transforms, textureIndex) => {
        const meshIndex = modelIndex * TUNNEL_TEXTURE_URLS.length + textureIndex;
        const mesh = meshRefs.current[meshIndex];
        if (!mesh) {
          return;
        }

        transforms.forEach((matrix, instanceIndex) => {
          mesh.setMatrixAt(instanceIndex, matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
      });
    });
  }, [panelTransforms]);

  return (
    <group>
      {panelTransforms.flatMap((transformsByTexture, modelIndex) => transformsByTexture.map((transforms, textureIndex) => {
        const meshIndex = modelIndex * TUNNEL_TEXTURE_URLS.length + textureIndex;
        return (
          <instancedMesh
            key={`${TUNNEL_PANEL_MODEL_URLS[modelIndex]}-${TUNNEL_TEXTURE_URLS[textureIndex]}`}
            ref={(mesh) => { meshRefs.current[meshIndex] = mesh; }}
            args={[panelGeometries[modelIndex], null, transforms.length]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial map={tunnelTextures[textureIndex]} color="#ffffff" emissive="#0a2f43" emissiveIntensity={0.18} metalness={0.28} roughness={0.76} />
          </instancedMesh>
        );
      }))}
    </group>
  );
}

function TunnelWindows() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return;
    }

    for (let ring = 0; ring < 22; ring += 1) {
      for (let panel = 0; panel < 8; panel += 1) {
        const index = ring * 8 + panel;
        const angle = (panel / 8) * Math.PI * 2;
        dummy.position.set(Math.cos(angle) * 13.94, Math.sin(angle) * 13.94, -(ring * 22.5) - 11.25);
        dummy.rotation.set(0, 0, angle + Math.PI / 2 + ((ring + panel) % 3 - 1) * 0.03);
        dummy.scale.set(0.76 + ((ring * 3 + panel) % 4) * 0.08, 1, 0.84 + ((ring + panel * 2) % 4) * 0.07);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(index, dummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, 176]}>
      <boxGeometry args={[1.35, 0.16, 3.65]} />
      <meshStandardMaterial color="#b9f4ff" emissive="#3dd4ff" emissiveIntensity={5.5} metalness={0.15} roughness={0.16} />
    </instancedMesh>
  );
}

function TunnelDust() {
  const positions = useMemo(() => {
    const values = [];
    for (let index = 0; index < 260; index += 1) {
      const angle = index * 2.399963;
      const radius = 2.5 + ((index * 17) % 100) / 100 * 9.8;
      values.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -((index * 37) % 470),
      );
    }
    return new Float32Array(values);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#9feaff" size={0.045} transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

function RingLight({ z, index }) {
  const color = index % 2 === 0 ? '#b7d3dc' : '#3aa6d6';
  const emissive = index % 2 === 0 ? '#7fabbc' : '#168fbd';

  return (
    <group position={[0, 0, z]}>
      <mesh>
        <torusGeometry args={[13.64, index % 3 === 0 ? 0.13 : 0.09, 16, 160]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={index % 2 === 0 ? 0.7 : 2.2} metalness={0.2} roughness={0.22} />
      </mesh>
      <pointLight position={[0, 0, 0]} color={emissive} intensity={index % 2 === 0 ? 0.25 : 0.9} distance={7} />
    </group>
  );
}

function TunnelSeams() {
  const seamZPositions = useMemo(() => Array.from({ length: 66 }, (_, index) => -(index * 7.5) - 5.65), []);

  return (
    <group>
      {seamZPositions.map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[13.8, 0.055, 8, 96]} />
          <meshStandardMaterial color="#020b14" emissive="#031421" emissiveIntensity={0.18} metalness={0.9} roughness={0.76} />
        </mesh>
      ))}
    </group>
  );
}

function TunnelShell() {
  const tunnelTexture = useTexture(tunnelTextureUrl);
  const shellTexture = useMemo(() => {
    const texture = tunnelTexture.clone();
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 12);
    return texture;
  }, [tunnelTexture]);
  const ringZPositions = useMemo(() => Array.from({ length: 48 }, (_, index) => -(index * 10) - 2), []);
  const ribAngles = useMemo(() => Array.from({ length: 24 }, (_, index) => (index / 24) * Math.PI * 2), []);

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -235]}>
          <cylinderGeometry args={[14, 14, 500, 128, 1, true]} />
        <meshStandardMaterial
            map={shellTexture}
            color="#ffffff"
          emissive="#0d3047"
          emissiveIntensity={0.8}
          metalness={0.82}
          roughness={0.58}
          side={THREE.BackSide}
        />
      </mesh>

      {ribAngles.map((angle) => (
        <mesh key={angle} position={[Math.cos(angle) * 13.92, Math.sin(angle) * 13.92, -106]}>
          <boxGeometry args={[0.12, 0.12, 260]} />
          <meshStandardMaterial color="#071c2d" emissive="#0a3550" emissiveIntensity={0.25} metalness={0.8} roughness={0.35} />
        </mesh>
      ))}

      {ringZPositions.map((z, index) => <RingLight key={z} z={z} index={index} />)}

      <TunnelSeams />
      <TunnelPanels />
      <TunnelWindows />
      <TunnelDust />

      <mesh position={[0, 0, -480]}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshStandardMaterial color="#020910" emissive="#0d4064" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

function SectionMarkers() {
  return (
    <group>
      {Object.entries(SECTION_META)
        .filter(([key]) => key !== HOME_SECTION_ID)
        .map(([key, meta]) => (
          <Text
            key={key}
            position={[0, 1.2, meta.z]}
            color="#ebfcff"
            anchorX="center"
            anchorY="middle"
            fontSize={1.1}
            outlineWidth={0.04}
            outlineColor="#081c2d"
          >
            {meta.label}
          </Text>
        ))}
    </group>
  );
}

function TunnelExperience({ cameraController, transitionSystem, worldState, currentSection }) {
  const { camera } = useThree();

  useEffect(() => {
    cameraController.bind(camera);
  }, [camera, cameraController]);

  useFrame((_, delta) => {
    transitionSystem.update(delta);
  });

  return (
    <>
      <color attach="background" args={['#020912']} />
      <fog attach="fog" args={['#020912', 55, 560]} />
      <ambientLight intensity={0.68} color="#9ed9ee" />
      <directionalLight position={[6, 8, 10]} intensity={1.25} color="#b6eaff" />
      <pointLight position={[0, 0, 2]} intensity={11} color="#53cfff" distance={38} />
      <pointLight position={[0, 0, -235]} intensity={12} color="#2694d0" distance={110} />

      <TunnelShell />
      <SectionMarkers />

      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.72} intensity={0.62} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.62} />
      </EffectComposer>

      {currentSection !== HOME_SECTION_ID && (
        <Text
          position={[0, 2.2, SECTION_META[currentSection].z]}
          color="#dffbff"
          anchorX="center"
          anchorY="middle"
          fontSize={1.6}
          outlineWidth={0.05}
          outlineColor="#071925"
        >
          {currentSection}
        </Text>
      )}
    </>
  );
}

export default function App() {
  const worldStateRef = useRef(new WorldStateSystem());
  const cameraControllerRef = useRef(new CameraController());
  const transitionSystemRef = useRef(new TransitionSystem(cameraControllerRef.current));
  const navigationSystemRef = useRef(
    new NavigationSystem(worldStateRef.current, cameraControllerRef.current, transitionSystemRef.current),
  );
  const inputSystemRef = useRef(new InputSystem(navigationSystemRef.current));

  const [currentSection, setCurrentSection] = useState(worldStateRef.current.getCurrentSection());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const unsubscribe = worldStateRef.current.subscribe((section) => {
      setCurrentSection(section);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    inputSystemRef.current.bind();
    return () => inputSystemRef.current.unbind();
  }, []);

  const handleNavigate = (sectionId) => {
    navigationSystemRef.current.request(sectionId);
  };

  return (
    <div className="app-shell">
      <div className="scene-wrap">
        <Canvas camera={{ position: [0, 2, 12], fov: 58, near: 0.1, far: 500 }}>
          <TunnelExperience
            cameraController={cameraControllerRef.current}
            transitionSystem={transitionSystemRef.current}
            worldState={worldStateRef.current}
            currentSection={currentSection}
          />
        </Canvas>
      </div>

      <div className="hud-layer">
        <Navbar currentSection={currentSection} onNavigate={handleNavigate} />

        {currentSection === HOME_SECTION_ID ? (
          <HomePanel timeLeft={timeLeft} />
        ) : (
          <SectionDetail sectionId={currentSection} />
        )}
      </div>
    </div>
  );
}
