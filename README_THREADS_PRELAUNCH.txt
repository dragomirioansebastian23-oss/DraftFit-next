DRAFTFIT — THREADS / BOLTS PRE-LAUNCH UX PASS

Replace:
src/components/calculators/ThreadsModule.jsx

Changes:
- Thread / Bolt Task Assistant: geometry, torque, preload, engagement, machining.
- Explicit separation of thread geometry and bolt/joint mechanics.
- Primary result summary: target preload, estimated torque, bolt utilisation, thread stripping status.
- Strong friction-sensitivity warning with displayed μG / μK assumptions.
- Torque is explicitly presented as an estimate tied to friction assumptions, not guaranteed achieved preload.
- Existing Quick/Advanced, Metric/Imperial, presets, calculation engines, sensitivity, ISO 273 data and checks are preserved.
- Mobile padding/result layout improved.
- No engineering equations were changed in this pass.

Engineering boundary:
This remains a preliminary calculator and not a complete VDI 2230 joint analysis.

After replace:
npm test
npm run lint
npm run build
npm run dev

Manual checks:
- M10x1.5 class 8.8 normal friction
- Change friction preset and confirm torque changes while target preload stays constant
- Change internal material/engagement and confirm stripping status reacts
- Compare Quick vs Advanced
- Test mobile around 390 px
