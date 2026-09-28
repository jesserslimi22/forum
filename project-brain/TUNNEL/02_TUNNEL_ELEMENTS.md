# TUNNEL ELEMENTS

## Purpose

Documents the individual 3D elements that make up the tunnel.

## Status

Initial tunnel elements are implemented and intentionally minimal.

## Elements

### Tunnel Shell

- Purpose: establishes the cylindrical wall and spatial envelope.
- Geometry: cylinder with open ends and double-sided material.
- Placement: centered at origin, large radius, extended along the tunnel depth.
- Relationship: sets the core tunnel volume that all other elements sit within.

### Ring Lights

- Purpose: define continuous forward structure and act as tunnel landmarks.
- Geometry: torus rings with bright cyan emissive material.
- Placement: repeated along Z at regular intervals.
- Relationship: reinforces the sense of motion and spatial depth.

### Wall Panels

- Purpose: break up the tunnel wall and echo the reference image’s segmented industrial surfaces.
- Geometry: two UV-mapped GLB panel models placed around the circumference, using optimized copies for instanced rendering.
- Placement: repeated in radial bands along Z.
- Relationship: they sit on the tunnel shell, retain the existing per-panel tunnel texture selection, and visually enrich the tunnel without creating a second independent structure.

### Destination Depth Marker

- Purpose: closes the far end of the tunnel visually.
- Geometry: sphere with dark material and low emissive glow.
- Placement: at the far end of the tunnel, along the negative Z axis.
- Relationship: improves depth perception and prevents an unfinished look at the tunnel terminus.
