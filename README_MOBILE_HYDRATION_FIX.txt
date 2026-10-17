DRAFTFIT — MOBILE HYDRATION / STATE FIX

This package changes only shared browser-state / mobile interaction infrastructure.
It does NOT replace calculator engine files and does NOT alter engineering formulas.

Changes:
- safe localStorage reads/writes (try/catch) so blocked/private storage cannot crash client state
- removes delayed setTimeout(0) restoration from Quick/Advanced and Metric/Imperial hooks
- restores saved preferences synchronously inside the mount effect
- input/select/textarea use native touch-action:auto
- button/link keep touch-action:manipulation
- 44px mobile touch targets retained

Files included:
src/lib/browserStorage.ts
src/components/calculators/CalculatorModeSwitch.tsx
src/components/calculators/UnitSystemSwitch.tsx
src/components/calculators/*CalculatorClient.tsx (5 wrappers)
src/components/DraftFitShell.tsx
src/components/EngineeringPreferences.tsx
src/app/globals.css

Install over project root, then:
Ctrl+C
Remove-Item -Recurse -Force .next
npm test
npm run lint
npm run build
npm run dev -- -H 0.0.0.0

On phone use http://<PC-IP>:3000 and hard refresh / close-reopen the browser tab.
