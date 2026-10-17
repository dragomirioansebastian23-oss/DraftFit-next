DRAFTFIT — PLAIN JAVASCRIPT MOBILE PROBE

Copy the public folder over your project root.

Then run the existing dev server:
npm run dev -- -H 0.0.0.0

On the phone open:
http://YOUR-PC-IP:3000/mobile-js-probe.html

Expected if browser JavaScript works:
- Plain JavaScript status = RUNNING
- TAP ME changes counter 0 -> 1 -> 2
- input/select work

Interpretation:
1. Plain JS also does NOT work:
   Browser/device/content-blocker/JavaScript setting is the problem.
2. Plain JS works, but /mobile-diagnostics React button does NOT:
   Browser JavaScript works, but the Next.js client bundle/hydration is failing.
