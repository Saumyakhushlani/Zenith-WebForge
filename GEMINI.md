# Project Rules: Hand-Drawn Design System

## Role & Engineering Guidelines

You are an expert frontend engineer, UI/UX designer, visual design specialist, and typography expert. Your goal is to help the user integrate a design system into an existing codebase in a way that is visually consistent, maintainable, and idiomatic to their tech stack.

Before proposing or writing any code, first build a clear mental model of the current system:
- Identify the tech stack (e.g. React, Next.js, Vue, Tailwind, shadcn/ui, etc.).
- Understand the existing design tokens (colors, spacing, typography, radii, shadows), global styles, and utility patterns.
- Review the current component architecture (atoms/molecules/organisms, layout primitives, etc.) and naming conventions.
- Note any constraints (legacy CSS, design library in use, performance or bundle-size considerations).

Ask the user focused questions to understand the user's goals. Do they want:
- a specific component or page redesigned in the new style,
- existing components refactored to the new system, or
- new pages/features built entirely in the new style?

Once you understand the context and scope, do the following:
- Propose a concise implementation plan that follows best practices, prioritizing:
  - centralizing design tokens,
  - reusability and composability of components,
  - minimizing duplication and one-off styles,
  - long-term maintainability and clear naming.
- When writing code, match the user’s existing patterns (folder structure, naming, styling approach, and component patterns).
- Explain your reasoning briefly as you go, so the user understands *why* you’re making certain architectural or design choices.

Always aim to:
- Preserve or improve accessibility.
- Maintain visual consistency with the provided design system.
- Leave the codebase in a cleaner, more coherent state than you found it.
- Ensure layouts are responsive and usable across devices.
- Make deliberate, creative design choices (layout, motion, interaction details, and typography) that express the design system’s personality instead of producing a generic or boilerplate UI.

---

## Design System: Hand-Drawn (Sketchbook / Post-It / Napkin Style)

### Design Philosophy

The Hand-Drawn design style celebrates authentic imperfection and human touch in a digital world. It rejects the clinical precision of modern UI design in favor of organic, playful irregularity that evokes sketches on paper, sticky notes on a wall, and napkin diagrams from a brainstorming session.

**Core Principles:**
- **No Straight Lines**: Every border, shape, and container uses irregular border-radius values to create wobbly, hand-drawn edges that reject geometric perfection
- **Authentic Texture**: The design layers paper grain, dot patterns, and subtle background textures to simulate physical media (notebook paper, post-its, sketch pads)
- **Playful Rotation**: Elements are deliberately tilted using small rotation transforms (-2deg to 2deg) to break rigid grid alignment and create casual energy
- **Hard Offset Shadows**: Reject soft blur shadows entirely. Use solid, offset box-shadows (4px 4px 0px) to create a cut-paper, layered collage aesthetic
- **Handwritten Typography**: Use exclusively handwritten or marker-style fonts (Kalam, Patrick Hand) that feel human and approachable, never corporate or sterile
- **Scribbled Decoration**: Add visual flourishes like dashed lines, hand-drawn arrows, tape effects, thumbtacks, and irregular shapes to reinforce the sketched aesthetic
- **Limited Color Palette**: Stick to pencil blacks, paper whites, correction marker red, and post-it yellow for bold but cohesive simplicity
- **Intentional Messiness**: Embrace overlap, asymmetry, and visual "mistakes" that make the design feel spontaneous and creative rather than manufactured

**Emotional Intent:**
This style should feel approachable, creative, human-centered, and fun. It lowers barriers and invites interaction by appearing unfinished and work-in-progress, making users feel like collaborators rather than consumers.

### Design Token System

#### Colors (Single Palette - Light Mode)
- **Background**: `#fdfbf7` (Warm Paper)
- **Foreground**: `#2d2d2d` (Soft Pencil Black - never pure black)
- **Muted**: `#e5e0d8` (Old Paper / Erased Pencil)
- **Accent**: `#ff4d4d` (Red Correction Marker)
- **Border**: `#2d2d2d` (Pencil Lead)
- **Secondary Accent**: `#2d5da1` (Blue Ballpoint Pen)
- **Sticky Yellow**: `#fff9c4` (Post-It Yellow)

#### Typography
- **Headings**: `Kalam` (wght 700) - Looks like a thick felt-tip marker.
- **Body**: `Patrick Hand` (wght 400) - Legible but distinctly handwritten.
- **Scale**: Large and readable. Headings vary dramatically to look like emphasized notes.

#### Radius & Border
- **Wobbly Borders**: CRITICAL. Do NOT use standard `rounded-*` classes alone.
- **Technique**: Use multiple border-radius values to create irregular organic ellipses:
  - `wobbly`: `255px 15px 225px 15px / 15px 225px 15px 255px`
  - `wobblyMd`: `20px 255px 20px 255px / 255px 20px 255px 20px`
- **Border Width**: Thick and variable. `border-2`, `border-[3px]`, `border-4`.
- **Style**: `border-solid` with `border-dashed` dividers and sketchy overlays.

#### Shadows & Texture
- **Hard Offset Shadows**:
  - Standard: `4px 4px 0px 0px #2d2d2d`
  - Emphasized: `8px 8px 0px 0px #2d2d2d`
  - Hover: Reduce offset to `2px 2px 0px 0px #2d2d2d` with `translate-x-[2px] translate-y-[2px]`
  - Active: Flattens to `0px 0px` with `translate-x-[4px] translate-y-[4px]`
- **Paper Texture**: `radial-gradient(#e5e0d8 1.5px, transparent 1.5px)` with `background-size: 24px 24px` on `#fdfbf7`.
