# TUNNEL MATERIALS

## Purpose

Documents the materials and surface treatment used by the tunnel.

## Status

Material decisions are intentionally simple and reusable.

## Materials

- The tunnel shell uses `assets/textures/tunnel.jpg`; wall panels draw from all four images in `assets/textures`, with tunnel 3 and tunnel 4 kept rare. Materials retain a subtle emissive tint and metallic response.
- Ring lights use bright cyan emissive materials to create high-contrast tunnel boundaries.
- The far-end volume uses a dark material with a reduced blue glow to preserve depth and avoid a flat horizon.

## Constraints

- Keep lighting and surface response consistent because the tunnel is a single environment, not a collection of unrelated decorative surfaces.
- Keep the texture legible under the tunnel lighting; emissive and metallic values should support, not obscure, the image.
