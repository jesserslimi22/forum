# 05_AGENT_RULES

## Purpose

Rules for every AI agent working on the project.

## Before Coding

Every agent must:

1. Read `00_READ_FIRST.md`.
2. Read the relevant project-brain files.
3. Inspect the existing code.
4. Identify the existing owner of the responsibility being modified.
5. Preserve established architecture.

## Existing Architecture First

AI agents are contributors to an existing architecture.

Do not redesign the project from scratch for an individual task.

Prefer:

Existing System
→ Extend / Modify

over:

Existing System
→ New Competing System

## Strict Ownership

There must be one authoritative owner for each major responsibility.

Never create competing:

- Camera Controllers
- Navigation Systems
- Transition Systems
- World-State Systems
- Tunnel Systems
- Input Systems
- Lighting Systems

If an owner already exists, use it.

## Before Creating Anything New

Ask:

1. Does this responsibility already have an owner?
2. Can the existing system be extended?
3. Is this genuinely a separate responsibility?
4. Will the new system overlap with an existing one?
5. Is its ownership clear?

If unclear, do not create it yet.

## No Silent Architectural Changes

Do not silently:

- change system ownership
- replace the camera architecture
- replace the navigation architecture
- introduce a competing state system
- change the coordinate convention
- replace genuine 3D behavior with a 2D technique

If a task conflicts with the architecture:

STOP
→ REPORT THE CONFLICT
→ WAIT FOR A HUMAN DECISION

## Implementation Discipline

Do not add libraries, abstractions, managers, controllers, state systems, shaders, or effects without a real requirement.

Do not modify unrelated systems.

Do not rewrite working architecture unnecessarily.

Do not use a 2D technique to fake a required 3D behavior.

## Documentation

Update the relevant project-brain document when a significant decision changes:

- architecture
- world structure
- navigation
- visual direction
- system ownership
- major technology choices

Do not duplicate the same source of truth across multiple documents.

## After Coding

Verify:

- existing ownership is preserved
- no competing systems were introduced
- the 3D-first principle is preserved
- coordinate conventions remain consistent
- relevant documentation remains accurate

## Protected File

`00_READ_FIRST.md` is protected.

AI agents MUST NOT modify it.

If a foundational rule conflicts with a requested task:

STOP
→ REPORT
→ HUMAN DECISION
