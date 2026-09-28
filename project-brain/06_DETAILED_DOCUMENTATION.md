# 06_DETAILED_DOCUMENTATION

## Purpose

This file is the entry point for detailed project documentation.

AI agents should NOT automatically read every file inside the detailed documentation folders.

Read the detailed folders ONLY when the current task requires information that is not already covered by the main project-brain files.

## Available Detailed Documentation

### TUNNEL/

Contains detailed documentation about the native R3F tunnel.

Read this folder when working on:

- tunnel geometry
- tunnel structure
- tunnel modules
- repeated meshes
- instancing
- tunnel materials
- tunnel lighting
- tunnel effects
- tunnel performance
- tunnel spatial behavior
- elements created specifically for the tunnel

The TUNNEL folder is the detailed source of truth for the tunnel implementation.

Do not duplicate detailed tunnel information into the main project-brain files unless it represents a major architectural decision.

## Rule

Before reading a detailed documentation folder, determine whether the current task actually requires its information.

If it does not, do not load it.

If it does, enter the relevant folder and read only the files necessary for the task.
