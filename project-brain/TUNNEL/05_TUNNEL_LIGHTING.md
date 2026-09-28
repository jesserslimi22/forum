# TUNNEL LIGHTING

## Purpose

Documents the lighting elements and lighting decisions belonging to the tunnel.

## Status

The tunnel relies on a small lighting stack that supports the 3D experience without overcomplicating the scene.

## Lights

- A soft ambient light establishes the overall blue-dark environment.
- A directional light gives the tunnel consistent side illumination and depth.
- Two point lights reinforce the ring and far-end glow at different parts of the tunnel volume.

## Ownership

- Lighting belongs to the Lighting System and is set in the 3D scene rather than via DOM/UI overlays.
- The tunnel uses emissive materials to reinforce the same blue-cyan visual language across ring lights and wall panels.
