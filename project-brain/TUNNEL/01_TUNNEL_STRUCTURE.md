# TUNNEL STRUCTURE

## Purpose

Documents the overall 3D structure of the tunnel.

## Status

Implemented as a first-pass cylindrical tunnel in the 3D world.

## Structure

- Tunnel origin is centered at world origin with forward travel defined along the negative Z axis.
- The tunnel shell is a large open-ended cylinder with a dark metallic interior and glowing ring accents.
- Ring elements repeat along Z to create depth and forward motion.
- Panel elements are repeated in radial segments across the tunnel wall to approximate the supplied reference.
- The far end of the tunnel remains visually closed with a dark spherical volume to maintain spatial depth.

## Key Decisions

- The tunnel is not a 2D image or DOM backdrop. It is genuine geometry in the R3F scene.
- Tunnel placement is owned by the Tunnel System; the Camera Controller only moves the camera.
- Spatial destination markers follow the same Z-axis coordinate convention as the tunnel.
