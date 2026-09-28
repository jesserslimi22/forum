# 01_ARCHITECTURE

## Purpose

Defines the technical architecture and ownership boundaries of the 3D application.

## Stack

- React — application and UI layer
- React Three Fiber (R3F) — React renderer for the 3D scene
- Three.js — underlying 3D engine
- WebGL/WebGPU — rendering backend as determined by project requirements

## Core Model

React Application
→ Web UI
→ R3F 3D World
→ Three.js
→ GPU Renderer

The 3D world is the primary experience. DOM/UI may exist for conventional interface elements but must not replace the actual 3D world.

## Strict Ownership

ONE responsibility = ONE authoritative owner.

- Camera → Camera Controller
- Navigation → Navigation System
- Transitions → Transition System
- World State → World-State System
- Input → Input System
- Tunnel → Tunnel System
- Lighting → Lighting System

Never create competing systems for an existing responsibility.

## Relationships

Input
→ Navigation
→ Transition
→ Camera Controller
→ Three.js Camera

Navigation decides WHERE the user wants to go.

Transition decides HOW the user travels there.

Camera Controller owns the actual Three.js camera.

## React / Runtime

React state represents meaningful application state.

Continuous frame-by-frame 3D simulation must use the appropriate R3F/Three.js runtime mechanisms rather than forcing every frame through React state.

## New Systems

Before creating a new controller, manager, system, service, or hook:

1. Find the existing owner.
2. Extend the existing owner if possible.
3. Create a new system only if the responsibility is genuinely separate.
4. Define its ownership clearly.

Never create a new system merely because the existing one is inconvenient.

## Architectural Changes

Do not silently change ownership or replace established architecture.

If a task conflicts with the architecture, report the conflict before changing the fundamental design.
