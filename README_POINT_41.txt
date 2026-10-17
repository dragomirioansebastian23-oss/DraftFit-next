DRAFTFIT — POINT 41
INTERNAL SEARCH

IMPLEMENTED

- Global DraftFit search available from every route.
- Floating Search launcher on desktop and mobile.
- Ctrl/Command + K keyboard shortcut.
- Instant ranked search over:
  * all calculators
  * all engineering guides
  * all standards pages
  * core DraftFit pages
- Category filters:
  * All
  * Calculators
  * Guides
  * Standards
  * Pages
- Keyboard navigation:
  * Arrow Up / Down
  * Enter
  * Escape
- Dedicated /search page with all matching results.
- Search page accepts URLs such as:
  /search?q=H7%2Fg6
- Search page is intentionally noindex because it is a utility results page.
- Search index is generated from the same calculator/content configuration already used by DraftFit.
- No backend, database or third-party search service required.
- No external runtime dependency added.

EXAMPLE SEARCHES

H7/g6
ISO 286
O-ring squeeze
M10 torque
bolt preload
DIN 6885
GD&T position
ASME Y14.5

INSTALL

1. Stop the server:
   Ctrl+C

2. Copy the complete ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next

3. Choose Replace.

4. Run separately:
   npm test
   npm run lint
   npm run build
   npm run dev

TEST

- Press Ctrl+K from the homepage.
- Search for "H7/g6".
- Use Arrow Down + Enter.
- Search "M10 torque" and filter to Guides.
- Search "ISO 3601" and filter to Standards.
- Open:
  http://localhost:3000/search?q=parallel%20key
- Test the floating search button at mobile width.
