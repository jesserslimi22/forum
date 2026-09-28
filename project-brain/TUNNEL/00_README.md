# TUNNEL DOCUMENTATION

## Purpose

Detailed documentation for the native R3F tunnel.

This folder describes the actual tunnel elements, their structure, relationships, behavior, and important implementation decisions.

## Rule

The tunnel is built as a real 3D environment using native R3F/Three.js techniques.

This documentation must describe what the tunnel system actually contains.

## Documentation Rule

When the tunnel implementation introduces an important new element, structure, technique, or architectural decision, update the appropriate documentation file.

Do not document implementation details that are obvious from the code unless they are important for future AI agents to understand or preserve.

## Current Documentation

- `01_TUNNEL_STRUCTURE.md` → overall tunnel composition and spatial structure
- `02_TUNNEL_ELEMENTS.md` → individual 3D elements and their purpose
- `03_TUNNEL_INSTANCING.md` → repeated/instanced geometry
- `04_TUNNEL_MATERIALS.md` → materials, textures, and emissive surfaces
- `05_TUNNEL_LIGHTING.md` → tunnel lighting system and lighting elements
- `06_TUNNEL_PERFORMANCE.md` → performance decisions and constraints

## Initial Implementation Status

The first tunnel pass is a real 3D cylindrical environment built in native R3F/Three.js.
The geometry is organized around a Z-axis forward travel path, with one tunnel shell, repeated ring lights, and repeated panel elements placed along the tunnel depth.
The Tunnel System owns generation and placement; do not split the tunnel into separate camera- or page-scrolling systems.
