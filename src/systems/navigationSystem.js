import * as THREE from 'three';

export const HOME_SECTION_ID = 'HOME';

export const SECTION_ORDER = [
  'DESCRIPTION',
  'GALLERY',
  'TEASER',
  'SPEAKERS',
  'SPONSORS',
  'PROGRAM',
  'VENUE',
];

export const SECTION_META = {
  HOME: {
    id: 'HOME',
    label: 'HOME',
    z: 12,
    copy: 'Countdown and brand identity.',
  },
  DESCRIPTION: {
    id: 'DESCRIPTION',
    label: 'DESCRIPTION',
    z: -78,
    copy: "Here we're supposed to have the description.",
  },
  GALLERY: {
    id: 'GALLERY',
    label: 'GALLERY',
    z: -138,
    copy: "Here we're supposed to have the gallery.",
  },
  TEASER: {
    id: 'TEASER',
    label: 'TEASER',
    z: -198,
    copy: "Here we're supposed to have a teaser.",
  },
  SPEAKERS: {
    id: 'SPEAKERS',
    label: 'SPEAKERS',
    z: -258,
    copy: "Here we're supposed to have the speakers.",
  },
  SPONSORS: {
    id: 'SPONSORS',
    label: 'SPONSORS',
    z: -318,
    copy: "Here we're supposed to have the sponsors.",
  },
  PROGRAM: {
    id: 'PROGRAM',
    label: 'PROGRAM',
    z: -378,
    copy: "Here we're supposed to have the program.",
  },
  VENUE: {
    id: 'VENUE',
    label: 'VENUE',
    z: -438,
    copy: "Here we're supposed to have the venue.",
  },
};

export const HOME_POSITION = new THREE.Vector3(0, 0, 10);

export class WorldStateSystem {
  constructor() {
    this.currentSection = HOME_SECTION_ID;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  getCurrentSection() {
    return this.currentSection;
  }

  setCurrentSection(section) {
    if (!section) {
      return;
    }

    this.currentSection = section;
    this.listeners.forEach((listener) => listener(section));
  }

  getSectionPosition(sectionId) {
    if (sectionId === HOME_SECTION_ID) {
      return HOME_POSITION.clone();
    }

    return new THREE.Vector3(0, 0, SECTION_META[sectionId].z);
  }
}

export class CameraController {
  constructor() {
    this.camera = null;
    this.currentPosition = HOME_POSITION.clone();
    this.focusPoint = new THREE.Vector3(0, 0, -90);
  }

  bind(camera) {
    this.camera = camera;
    this.camera.position.copy(this.currentPosition);
    this.lookForward();
  }

  setPosition(position) {
    this.currentPosition.copy(position);
    if (this.camera) {
      this.camera.position.copy(position);
      this.lookForward();
    }
  }

  lookForward() {
    this.focusPoint.set(this.currentPosition.x, this.currentPosition.y, this.currentPosition.z - 100);
    this.camera.lookAt(this.focusPoint);
  }

  getPosition() {
    return this.currentPosition.clone();
  }
}

export class TransitionSystem {
  constructor(cameraController) {
    this.cameraController = cameraController;
    this.isActive = false;
    this.progress = 0;
    this.duration = 1.8;
    this.from = new THREE.Vector3();
    this.to = new THREE.Vector3();
    this.onComplete = null;
  }

  start(from, to, onComplete = null) {
    this.isActive = true;
    this.progress = 0;
    this.from.copy(from);
    this.to.copy(to);
    this.onComplete = onComplete;
  }

  update(deltaSeconds) {
    if (!this.isActive) {
      return;
    }

    this.progress += deltaSeconds / this.duration;
    const eased = 1 - Math.pow(1 - Math.min(this.progress, 1), 3);
    const nextPosition = this.from.clone().lerp(this.to, eased);
    this.cameraController.setPosition(nextPosition);

    if (this.progress >= 1) {
      this.isActive = false;
      this.cameraController.setPosition(this.to);
      if (this.onComplete) {
        const callback = this.onComplete;
        this.onComplete = null;
        callback();
      }
    }
  }
}

export class NavigationSystem {
  constructor(worldState, cameraController, transitionSystem) {
    this.worldState = worldState;
    this.cameraController = cameraController;
    this.transitionSystem = transitionSystem;
  }

  request(sectionId) {
    if (!sectionId) {
      return;
    }

    if (sectionId === HOME_SECTION_ID) {
      this.goHome();
      return;
    }

    const start = this.cameraController.getPosition();
    const target = this.worldState.getSectionPosition(sectionId);

    this.transitionSystem.start(start, target, () => {
      this.worldState.setCurrentSection(sectionId);
    });
  }

  goHome() {
    const start = this.cameraController.getPosition();
    const target = HOME_POSITION.clone();

    this.transitionSystem.start(start, target, () => {
      this.worldState.setCurrentSection(HOME_SECTION_ID);
    });
  }

  triggerNext() {
    const current = this.worldState.getCurrentSection();

    if (current === HOME_SECTION_ID) {
      this.request(SECTION_ORDER[0]);
      return;
    }

    const currentIndex = SECTION_ORDER.indexOf(current);
    const nextIndex = (currentIndex + 1) % SECTION_ORDER.length;
    this.request(SECTION_ORDER[nextIndex]);
  }

  triggerPrevious() {
    const current = this.worldState.getCurrentSection();

    if (current === HOME_SECTION_ID) {
      return;
    }

    const currentIndex = SECTION_ORDER.indexOf(current);
    if (currentIndex <= 0) {
      this.goHome();
      return;
    }

    this.request(SECTION_ORDER[currentIndex - 1]);
  }
}

export class InputSystem {
  constructor(navigationSystem) {
    this.navigationSystem = navigationSystem;
    this.listener = null;
  }

  bind() {
    if (this.listener) {
      return;
    }

    this.listener = (event) => {
      const key = event.code || event.key;
      if (!['Space', ' ', 'ArrowDown', 'ArrowUp'].includes(key)) {
        return;
      }

      event.preventDefault();
      if (key === 'ArrowUp') {
        this.navigationSystem.triggerPrevious();
        return;
      }

      this.navigationSystem.triggerNext();
    };

    window.addEventListener('keydown', this.listener, { capture: true });
  }

  unbind() {
    if (!this.listener) {
      return;
    }

    window.removeEventListener('keydown', this.listener, { capture: true });
    this.listener = null;
  }
}
