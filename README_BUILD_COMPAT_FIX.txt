DRAFTFIT — BUILD COMPATIBILITY FIX

Copy ZIP contents over the project root.

Files:
1) src/components/calculators/KeysModule.jsx
2) src/lib/internationalization.ts

Fixes:
- KeysModule accepts current wrapper props: unitSystem, experienceMode, isDark, lang, onPrint.
- No engineering equations changed.
- Restores src/lib/internationalization.ts required by EngineeringPreferences.tsx.
- Fixes KeysModule onValueChange warning and restores the intended custom-strength-preset state change.

Run:
Remove-Item -Recurse -Force .next
npm test
npm run lint
npm run build

If green:
npm run dev -- -H 0.0.0.0
