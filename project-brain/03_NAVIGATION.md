# 03_NAVIGATION

## Purpose

Defines how the user moves through the 3D website.

## Core Principle

Navigation is spatial.

The user does not conventionally scroll through a 2D webpage.

The user requests movement toward another destination in the 3D world.

## Flow

User Input
→ Navigation System
→ Target Destination
→ Transition System
→ Camera Movement
→ Destination

## Responsibilities

### Input System

Interprets user interaction.

### Navigation System

Decides WHERE the user wants to go.

### Transition System

Decides HOW the user travels between destinations.

### Camera Controller

Owns the actual Three.js camera.

Navigation and transitions must not become competing camera controllers.

## Navigation State

The conceptual state flow is:

IDLE
→ NAVIGATING
→ ARRIVING
→ ACTIVE

The implementation may evolve, but navigation state must have one authoritative owner.

## Destinations

Examples:

- HERO
- ABOUT
- PROJECTS
- CONTACT

These represent spatial destinations rather than DOM scroll positions.

## Movement

Movement should feel like physical forward travel through the tunnel.

Conceptually:

Start
→ Acceleration
→ Forward Travel
→ Deceleration
→ Arrival

The movement must remain genuinely 3D.

## Rules

- Do not implement core navigation as normal 2D scrolling.
- Do not create separate competing navigation systems.
- Do not let navigation directly own the camera.
- Do not scatter navigation state across unrelated components.
- Shared input types should ultimately use the same navigation system.
