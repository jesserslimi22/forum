# TUNNEL PERFORMANCE

## Purpose

Documents performance-critical decisions specific to the tunnel.

## Status

The first implementation is intentionally lightweight and structured for future optimization.

## Performance Notes

- The repeated wall panels are instanced to minimize draw calls in a repetitive geometry system.
- The shell, rings, and lights remain a small number of large geometry blocks rather than many unique meshes.
- Materials are shared where practical so the scene stays efficient and easy to extend.

## Future Constraints

- Do not replace the tunnel with a single large image or a CSS-only illusion.
- Keep the geometry organized around a small number of reusable tunnel elements so later optimization can happen without a structural rewrite.
