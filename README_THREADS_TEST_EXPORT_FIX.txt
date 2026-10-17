DRAFTFIT — THREADS TEST EXPORT FIX

Replace:
src/components/calculators/ThreadsModule.jsx

Fix:
- Restores named exports required by tests/engineering/threads.test.ts:
  calculateBasicThreadGeometry
  calculateTapDrillEstimate
  calculatePreload
  calculateTighteningTorque
  calculateBoltStress
  calculateThreadStripping

No engineering equations or numeric defaults were changed.
The pre-launch Threads UX changes are preserved.

Run:
npm test
npm run lint
npm run build
npm run dev
