# TUNNEL INSTANCING

## Purpose

Documents repeated geometry and instancing decisions.

## Status

The repeated wall panels use instancing across 66 tunnel rings.

## Instancing

- The wall panel system uses 10 panels per ring, rendered as eight instanced meshes grouped by model and texture.
- This keeps the ring pattern reusable and avoids creating dozens of independent meshes.
- Instances are generated in a nested ring layout: 10 circular positions × 66 depth bands.
- The two UV-mapped GLB panel models are fitted to the panel footprint and alternated around the tunnel.
- Optimized panel GLBs preserve the source models and UVs while reducing geometry for repeated rendering.
- The first two tunnel textures cover most panels; tunnel 3 and tunnel 4 each appear on about 2.5% of panels.

## Non-instanced Geometry

- The shell cylinder remains a single mesh for the main tunnel volume.
- The glowing ring lights remain as regular meshes because they are a small number of distinct visual landmarks with clear placement along the tunnel.
