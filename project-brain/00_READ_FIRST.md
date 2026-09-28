# PROJECT BRAIN — READ FIRST

> **STATUS: FOUNDATIONAL / PROTECTED**
>
> This document defines the fundamental identity, principles, and non-negotiable rules of the project.
>
> **AI agents MUST READ THIS DOCUMENT BEFORE WORKING ON THE PROJECT.**
>
> **AI agents MUST NOT MODIFY, REWRITE, DELETE, REPLACE, OR OTHERWISE ALTER THIS FILE.**
>
> If an AI agent believes that a rule in this document needs to change, it must **stop and report the conflict**. It must not change this document itself.
>
> Changes to this document are reserved for the human project owner through an explicit architectural decision.

---

# 1. WHAT THIS PROJECT IS

This project is a **3D-first interactive website**.

It is not a conventional 2D website with CSS animations or other 2D techniques used to create the illusion of a 3D experience.

The core experience is an actual **3D world** rendered through a real 3D rendering pipeline.

The user does not primarily navigate by conventional webpage scrolling.

Instead, the user experiences the website as a journey through a spatial environment.

The current visual concept is based around a **compass** and a **circular/cylindrical tunnel**.

The tunnel is an actual 3D environment.

The camera physically travels through that environment.

Different website sections are represented as destinations within the 3D world.

Conceptually:

```text
USER INPUT
    ↓
NAVIGATION
    ↓
3D TRANSITION
    ↓
CAMERA MOVEMENT
    ↓
PHYSICAL DESTINATION IN THE 3D WORLD
```

The website should feel like the user is **moving through a world**, not scrolling through a webpage.

---

# 2. THE CORE EXPERIENCE MUST REMAIN REAL 3D

The fundamental spatial experience must be implemented using actual 3D techniques.

This includes, where appropriate:

- 3D scenes
- cameras
- geometry
- meshes
- materials
- textures
- lights
- shadows
- transforms
- 3D coordinates
- spatial animation
- 3D paths
- GPU rendering
- Three.js
- React Three Fiber

Do **not** replace genuine 3D behavior with a 2D technique merely because it is easier.

Do not turn the tunnel into:

- a flat image
- a video
- a 2D background
- a CSS illusion
- a collection of DOM elements pretending to be a 3D world

The project may and should use normal web technologies where appropriate.

For example:

- React
- HTML
- CSS
- DOM elements
- accessible text
- navigation UI
- menus
- loading interfaces

These are allowed for the **web interface**.

However:

> **The fundamental spatial experience must belong to the actual 3D world.**

---

# 3. R3F IS THE CHOSEN 3D APPLICATION TECHNOLOGY

The project uses **React Three Fiber (R3F)**.

R3F is used as the React renderer/organizational layer for Three.js.

Conceptually:

```text
WEB APPLICATION
      │
      ├── React / DOM UI
      │
      └── React Three Fiber
                │
             Three.js
                │
          WebGL / WebGPU
                │
               GPU
```

R3F does not mean that the project is a collection of normal React components with decorative 3D effects.

The underlying 3D world remains a real Three.js scene.

AI agents must understand the distinction between:

```text
React application architecture
```

and:

```text
3D world / Three.js architecture
```

R3F should help organize the 3D application.

It must not be used as a reason to turn the 3D world into ordinary React UI.

---

# 4. REACT MUST NOT BECOME THE 3D SIMULATION LOOP

React is appropriate for application and interface state.

React must not be treated as the mechanism that drives every frame of the 3D simulation.

Do not design continuous movement like:

```text
EVERY FRAME
    ↓
React state update
    ↓
React re-render
    ↓
camera/object movement
```

Continuous 3D animation should use the appropriate R3F/Three.js rendering-loop mechanisms and manipulate Three.js objects appropriately.

The conceptual model is:

```text
USER INPUT
    ↓
APPLICATION / NAVIGATION DECISION
    ↓
3D TRANSITION / SIMULATION
    ↓
THREE.JS OBJECTS
    ↓
RENDERER
    ↓
GPU
```

React should represent meaningful application state.

It should not become a per-frame camera-position database.

---

# 5. FUNDAMENTAL ARCHITECTURAL PRINCIPLE

# ONE RESPONSIBILITY → ONE AUTHORITATIVE OWNER

This is one of the most important rules in the entire project.

Every major responsibility must have **one clearly defined authoritative owner**.

Examples:

```text
Camera          → ONE Camera Controller
Navigation      → ONE Navigation System
Transitions     → ONE Transition System
World State     → ONE World-State System
Input           → ONE Input System
Tunnel          → ONE Tunnel System
Lighting        → ONE Lighting System
```

The exact implementation names may change.

The ownership principle must not.

There must always be one clear answer to:

> **"Which system owns this responsibility?"**

If that answer is unclear, the architecture is becoming unsafe.

---

# 6. NEVER CREATE COMPETING SYSTEMS

AI agents must be especially careful not to create duplicate systems.

For example, an agent must not casually create:

```text
CameraManager
CameraController
NavigationCamera
TunnelCamera
SectionCamera
ExperienceCamera
CameraTransitionController
CameraMovementController
```

simply because each name appears convenient.

This creates a dangerous situation where nobody knows:

- which system actually controls the camera
- which system can modify its position
- which system controls its rotation
- which system controls camera transitions
- which system is authoritative
- which system should be changed when camera behavior needs modification

The same principle applies to every major responsibility.

Do not create:

```text
NavigationManager
NavigationController
SectionNavigator
TunnelNavigator
WorldNavigator
```

if they all overlap in responsibility.

Do not create:

```text
TransitionManager
TransitionController
CameraTransition
TunnelTransition
SectionTransition
```

if they all compete over the same transition behavior.

---

# 7. AN AI AGENT IS A CONTRIBUTOR, NOT A NEW ARCHITECT

Every AI agent enters an existing project.

It must assume:

> **The architecture already exists.**

The agent's job is to understand the existing architecture and work within it.

It must not approach every task as:

```text
"I need to solve this problem."
    ↓
"I will design my own architecture."
```

Instead:

```text
"I need to solve this problem."
    ↓
"What system already owns this responsibility?"
    ↓
"How should I extend or modify that system?"
```

Before creating a new manager, controller, system, service, hook, or abstraction, the agent must first determine whether an existing system already owns the responsibility.

---

# 8. EXISTING OWNERS MUST BE EXTENDED BEFORE NEW OWNERS ARE CREATED

If a system already owns a responsibility:

> **Modify or extend that system.**

Do not create another system simply because the existing implementation is inconvenient.

A new system may only be introduced when:

1. The responsibility is genuinely new.
2. No existing system owns it.
3. The responsibility is sufficiently distinct.
4. Its ownership can be clearly defined.
5. Its relationship with existing systems is documented.

Convenience is not sufficient justification for creating another owner.

---

# 9. DO NOT SILENTLY CHANGE ARCHITECTURAL OWNERSHIP

An AI agent must never silently change who owns a fundamental responsibility.

For example:

If:

```text
Camera → Camera Controller
```

is established, an agent must not later decide:

```text
Camera → Navigation Camera
```

because that seems cleaner.

Likewise, it must not move navigation responsibility into another system without explicitly identifying the architectural change.

If an implementation task conflicts with an existing architectural rule:

> **Stop and report the conflict instead of silently changing the architecture.**

---

# 10. NAVIGATION IS SPATIAL

Navigation is not merely changing a webpage or moving DOM content.

The user is navigating through a 3D world.

The conceptual flow is:

```text
USER INPUT
    ↓
NAVIGATION REQUEST
    ↓
TARGET 3D DESTINATION
    ↓
TRANSITION
    ↓
CAMERA TRAVEL
    ↓
DESTINATION
```

Different input methods may exist in the future:

- mouse
- keyboard
- touch
- buttons
- other appropriate controls

But they should ultimately drive the same underlying navigation system whenever the spatial behavior is shared.

Do not create separate "desktop fake transition", "mobile fake transition", etc. when the same 3D navigation behavior can be shared.

---

# 11. WEBSITE SECTIONS ARE SPATIAL DESTINATIONS

A website section is not merely a DOM position.

Conceptually, each major section has a location/state in the 3D world.

For example:

```text
HERO
  ↓
TUNNEL
  ↓
ABOUT
  ↓
TUNNEL
  ↓
PROJECTS
  ↓
TUNNEL
  ↓
CONTACT
```

The exact final structure and number of sections may change.

The important principle is:

> **Navigation should understand destinations as locations/states within the 3D experience.**

Do not scatter arbitrary camera coordinates throughout unrelated components.

Spatial destinations should have an authoritative representation.

---

# 12. THE TUNNEL IS REAL 3D ENVIRONMENT

The tunnel is not simply a transition effect.

It is part of the actual 3D world.

It may contain:

- geometry
- repeated structures
- materials
- lights
- shadows
- environmental effects
- particles
- spatial landmarks
- compass-related elements
- section destinations

The tunnel should feel continuous.

Avoid obvious seams or disconnected pieces that break the perception of traveling through one environment.

---

# 13. THE COMPASS IS PART OF THE 3D WORLD

The current design concept is based around a compass.

The compass should be treated as part of the spatial language of the experience.

It is not automatically just a flat UI graphic.

Its exact role must be defined by the appropriate design and world documentation.

It may contribute to:

- orientation
- navigation
- direction
- spatial identity
- section transitions
- visual storytelling

Do not invent additional behavior for the compass without documenting the decision.

---

# 14. USE ONE CONSISTENT COORDINATE SYSTEM

The project must use one consistent world coordinate convention.

The established conceptual convention is:

```text
Y = vertical
X = horizontal
Z = tunnel depth / forward direction
```

The exact sign of the forward Z direction must be explicitly established by the implementation and then kept consistent.

Different systems and components must not invent their own coordinate conventions.

If a coordinate convention changes, it is an architectural change and must not be silently introduced.

---

# 15. VISUAL IDENTITY MUST NOT DRIFT

The current visual direction is based around a:

- dark environment
- futuristic atmosphere
- circular/cylindrical tunnel
- blue/cyan illumination
- metallic/high-tech surfaces
- strong depth
- spatial lighting
- compass concept

The project should maintain a coherent visual language.

An AI agent must not introduce an unrelated visual style simply because it looks good in isolation.

New visual elements must belong to the established visual world.

---

# 16. PERFORMANCE IS PART OF THE ARCHITECTURE

The project is a real-time 3D website.

Performance must therefore be treated as an architectural concern.

Important considerations include:

- frame time
- FPS
- draw calls
- triangle count
- geometry
- textures
- GPU memory
- shader complexity
- lighting
- shadows
- post-processing
- object count
- instancing
- CPU workload
- mobile GPU limitations

Do not optimize randomly.

Do not sacrifice the core 3D experience merely because a simpler 2D implementation is faster.

Instead, identify the actual bottleneck and solve it using an appropriate 3D technique.

---

# 17. DO NOT ADD TECHNOLOGY JUST BECAUSE IT IS POPULAR

The project should use technologies because they solve an actual project requirement.

Do not introduce:

- libraries
- frameworks
- state managers
- animation systems
- physics engines
- shader systems
- post-processing systems
- abstractions

simply because they are popular or because an AI agent is familiar with them.

Every significant technology should have a clear purpose.

---

# 18. DO NOT REWRITE THE PROJECT'S FUNDAMENTAL DIRECTION

An AI agent must not decide that the project would be easier if it became:

- a normal scrolling website
- a 2D website with 3D-looking transitions
- a collection of CSS effects
- a video-based tunnel
- a flat canvas animation
- a different application architecture

unless the human project owner explicitly changes the project's direction.

The existing direction is:

> **A genuine 3D interactive website built around movement through a spatial world.**

---

# 19. DOCUMENTATION IS PART OF THE PROJECT

The `project-brain` directory is not optional documentation.

It is the shared architectural memory for the AI agents working on the project.

When a significant architectural decision is made, the relevant documentation must be updated.

However:

> **Do not duplicate the same architectural truth across multiple documents.**

There should be one authoritative location for each major decision.

For example:

```text
Camera ownership
→ defined in 01_ARCHITECTURE.md

Navigation behavior
→ defined in 03_NAVIGATION.md

World structure
→ defined in 02_WORLD.md

Visual identity
→ defined in 04_VISUAL_LANGUAGE.md

Agent behavior
→ defined in 05_AGENT_RULES.md
```

Other documents may reference these decisions but should not redefine them differently.

---

# 20. THIS FILE IS PROTECTED

## AI AGENTS MUST NOT MODIFY THIS FILE

`00_READ_FIRST.md` is the project's foundational constitution.

AI agents must:

- read it
- follow it
- preserve it
- respect its rules

AI agents must NOT:

- edit it
- rewrite it
- delete it
- rename it
- replace it
- append to it
- remove rules from it
- weaken its rules
- reinterpret its rules to justify a conflicting implementation

If an agent believes this document is incorrect or incomplete:

```text
IDENTIFY CONFLICT
        ↓
STOP
        ↓
REPORT THE ISSUE
        ↓
WAIT FOR HUMAN DECISION
```

The agent must **not solve the conflict by modifying this file**.

Only the human project owner may intentionally change this document.

---

# 21. WHEN A TASK CONFLICTS WITH THIS DOCUMENT

The agent must not choose the easiest implementation.

It must not silently alter the project's principles.

Instead:

```text
TASK
 ↓
CHECK READ_FIRST
 ↓
CHECK ARCHITECTURE
 ↓
IDENTIFY CONFLICT
 ↓
REPORT CONFLICT
 ↓
HUMAN DECISION
```

The agent may propose a solution.

The agent may explain why the existing architecture creates a technical problem.

The agent may suggest an architectural change.

But the agent must not independently change a foundational rule.

---

# 22. THE MOST IMPORTANT QUESTION

Before creating or modifying a major system, an AI agent must be able to answer:

> **WHO OWNS THIS?**

If the answer is unclear:

> **DO NOT CREATE ANOTHER SYSTEM.**

Find the existing owner.

If there is no owner, determine whether a new responsibility genuinely exists and document its ownership before implementing it.

The project must always move toward:

```text
ONE RESPONSIBILITY
        ↓
ONE AUTHORITATIVE OWNER
        ↓
CLEAR INTERFACE
        ↓
PREDICTABLE BEHAVIOR
```

Never toward:

```text
ONE RESPONSIBILITY
        ↓
FIVE MANAGERS
        ↓
THREE CONTROLLERS
        ↓
TWO HOOKS
        ↓
NOBODY KNOWS WHO IS IN CHARGE
```

---

# 23. FINAL NON-NEGOTIABLE PRINCIPLES

These principles define the project.

### 1. REAL 3D

The fundamental spatial experience must be actual 3D.

### 2. R3F + THREE.JS

R3F is the chosen 3D application technology and Three.js remains the underlying 3D system.

### 3. 3D FIRST

The 3D world is the primary experience, not a decorative section of a conventional webpage.

### 4. SPATIAL NAVIGATION

The user navigates through actual 3D space.

### 5. ONE OWNER

Every major responsibility has one authoritative owner.

### 6. NO DUPLICATE CONTROLLERS

Never create competing managers/controllers/systems for an existing responsibility.

### 7. REACT IS NOT THE FRAME LOOP

Do not use React state as the mechanism for continuous per-frame 3D simulation.

### 8. CONSISTENT WORLD

Use one coordinate system and one coherent spatial model.

### 9. PRESERVE THE VISUAL LANGUAGE

The circular tunnel, futuristic environment, lighting language, and compass concept form the current visual identity.

### 10. PERFORMANCE MATTERS

The project must remain a viable real-time 3D web experience.

### 11. AGENTS EXTEND THE ARCHITECTURE

AI agents modify an existing architecture. They do not independently redesign it.

### 12. THIS FILE IS PROTECTED

**No AI agent may modify `00_READ_FIRST.md`.**

If a foundational rule needs to change:

**STOP → REPORT → HUMAN DECISION.**

---

# THE PROJECT IN ONE SENTENCE

> **This is a genuine 3D interactive website built with R3F and Three.js, where the user navigates through a spatial circular tunnel and compass-based world, with strict architectural ownership ensuring that every major responsibility has one authoritative system and that AI agents extend the existing architecture rather than silently creating competing ones.**
