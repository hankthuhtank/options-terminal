# EE Field Guide — Prototype V1

A self-contained, offline-friendly front-end prototype for a visual industrial electrical engineering / manufacturing controls education site.

## Open it

Double-click `index.html`. No build step, package manager, server, API key, or external library is required.

## What is included

- Animated whole-machine overview: power, signals, control, motion, safety, network
- Interactive machine-layer explorer
- Visual Lab:
  - Ladder logic simulator
  - ControlLogix chassis/rack explorer
  - VFD / PowerFlex frequency concept
  - Servo closed-loop concept
  - 4–20 mA scaling visualizer
  - EtherNet/IP network concept
  - Safety chain concept
- Beginner / Field-detail toggle
- Rockwell / Allen-Bradley terminology decoder
- Electrical drawing + symbol workbench
- Searchable term library with 70+ industrial EE / controls terms
- Troubleshooting signal-path framework
- Mobile-responsive layout
- Primary-source reference list in the Sources modal

## Scope / accuracy philosophy

This site deliberately teaches the mental model first and then flags where the real system is more nuanced. Examples are labeled as training examples rather than wiring, rack-layout, commissioning, or safety-design instructions.

One important example: a classic PLC scan is often taught as “read all inputs → execute logic → update all outputs.” Logix 5000 I/O data can update asynchronously to logic execution at configured connection intervals, so the prototype explicitly calls that out rather than teaching the simplified model as literal architecture.

## Files

- `index.html` — page structure
- `styles.css` — all visual design / responsive styling / animations
- `app.js` — interactive labs, content, glossary, modals
- `SOURCES.md` — research / primary reference notes

## Next logical expansion

The prototype architecture is ready to become a larger course by splitting the glossary/lesson data into topic files and adding dedicated visual lessons for:

- motor starters and overload protection
- 3-phase / wye / delta intuition
- PLC task scheduling + periodic tasks
- timers, counters, latches, sequences, state machines
- AOIs / UDTs
- produced / consumed tags
- remote I/O connection faults
- device-level ring troubleshooting
- VFD command vs reference vs feedback
- drive DC bus / braking / regeneration
- servo homing, registration, gearing, camming
- safety gates, light curtains, dual-channel inputs, EDM concepts
- drawings: one-line, elementary, wiring, panel layout, I/O sheets
- common field troubleshooting case studies


## V2 readability pass
- Increased small UI/body copy throughout the site.
- Reworked Learning Path from 10 thin rows into 6 useful learning stages with a big idea, an outcome, and core terms.
- Added an "On the job" explanation directly to every term card.
- Enlarged and clarified the deeper term modal into: Why you care / Picture the connection / What not to learn wrong.
- Expanded the absolute-beginner quick-start explanation.
