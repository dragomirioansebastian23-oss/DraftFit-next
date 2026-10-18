DraftFit desktop Search overlap fix

Replace:
src/components/GlobalSearch.tsx

Change:
- Removed duplicate standalone desktop search launcher from GlobalSearch.
- ResponsiveSiteHeader remains the single visible Search control.
- Search modal and Ctrl/Cmd + K remain unchanged.
- Mobile header search remains unchanged.

After replacing:
npm run lint
npm run build

Then:
git add .
git commit -m "Fix duplicate desktop search launcher"
git push
