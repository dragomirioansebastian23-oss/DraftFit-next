# DraftFit Points 26–28 QA Checklist

## Responsive
- [ ] Homepage at 390 px
- [ ] /calculators at 390 px
- [ ] ISO calculator at 390 px
- [ ] O-ring calculator at 390 px
- [ ] GD&T calculator at 390 px
- [ ] Threads calculator at 390 px
- [ ] Keys calculator at 390 px
- [ ] /methodology, /about and /contact at 390 px
- [ ] No horizontal page scroll

## Accessibility
- [ ] Tab reveals Skip to main content
- [ ] Visible focus ring on links/buttons/inputs
- [ ] EN/RO operable by keyboard
- [ ] Dark/Light operable by keyboard
- [ ] Quick/Advanced operable by keyboard
- [ ] Metric/Imperial operable by keyboard
- [ ] Project input labels announce correctly
- [ ] Explain this result exposes expanded/collapsed state
- [ ] Contact Copy Report status is announced

## Performance
- [ ] No DraftFit hydration warning in Incognito
- [ ] Calculator loads without layout-breaking shifts
- [ ] Engineering documentation appears normally when scrolled into view
- [ ] Print preview still includes Full Engineering Report
- [ ] npm test passes
- [ ] npm run lint passes
- [ ] npm run build passes

## Later, after public deployment
Run Lighthouse / PageSpeed Insights on the production URL for:
- Home
- /calculators
- one representative calculator
- /methodology

Core Web Vitals should be evaluated on the deployed production site, not only localhost.
