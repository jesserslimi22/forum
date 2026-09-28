# 02_WORLD

## Purpose

Defines the physical 3D world of the website.

## World Concept

The website is experienced as one continuous spatial environment.

Conceptually:

Hero
→ Tunnel
→ About
→ Tunnel
→ Projects
→ Tunnel
→ Contact

These are spatial destinations, not ordinary 2D webpage sections.

## Tunnel

The tunnel is real 3D geometry.

It is not:

- a 2D background
- a video
- a CSS illusion
- a flat image
- a fake transition

The tunnel may contain:

- cylindrical geometry
- repeated meshes
- instanced meshes
- rings
- panels
- materials
- lighting
- atmospheric effects
- particles
- spatial landmarks

The tunnel should feel continuous and physically traversable.

## Compass

The current visual concept is based around a compass.

The compass belongs to the 3D world and contributes to the spatial identity of the experience.

Its exact behavior must be defined before implementation.

## Coordinate System

Use one consistent world coordinate system:

- X → horizontal
- Y → vertical
- Z → tunnel depth / forward direction

The chosen forward direction must remain consistent throughout the project.

## Spatial Destinations

Major sections must have defined spatial destinations.

Do not scatter arbitrary destination coordinates throughout unrelated components.

## World Changes

Changes to the fundamental world structure, tunnel model, coordinate system, or spatial destinations must be documented.
