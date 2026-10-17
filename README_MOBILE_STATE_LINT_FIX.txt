DRAFTFIT — MOBILE STATE / ESLINT FIX

Replace these files:
- src/components/calculators/CalculatorModeSwitch.tsx
- src/components/calculators/UnitSystemSwitch.tsx

What changed:
- Removed setState() calls from useEffect().
- Quick/Advanced and Metric/Imperial now use useSyncExternalStore.
- localStorage remains wrapped by the existing safeStorage helpers.
- Same-tab changes notify React immediately.
- Cross-tab storage changes remain supported.
- Share-link values remain supported; once the user manually changes a switch, that share override is removed from the current URL so the control can change normally.

No engineering calculator formulas were changed.

Run:
Remove-Item -Recurse -Force .next
npm test
npm run lint
npm run build
npm run dev -- -H 0.0.0.0
