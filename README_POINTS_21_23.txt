DRAFTFIT — BLOCK A — POINTS 21–23

POINT 21 — /methodology
- central methodology page
- calculation philosophy
- standards/reference approach
- unit handling
- Quick/Advanced behavior
- result classification
- verification/change-control explanation
- Romanian summary

POINT 22 — /about
- product purpose
- target users
- design principles
- limitations
- Romanian summary

POINT 23 — /contact + engineering issue feedback
- structured feedback form
- calculation / bug / feature / calculator-request categories
- calculator selector
- expected result and reference fields
- copy structured report to clipboard
- optional mailto workflow via NEXT_PUBLIC_CONTACT_EMAIL
- direct "Report calculation issue" link from calculator documentation
- no fake backend and no hard-coded email address before a real domain exists

SEO / NAVIGATION
- methodology, about and contact added to sitemap
- common footer links added
- canonical metadata on all three pages

INSTALL
1. Stop the server with Ctrl+C.
2. Copy the whole ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace.
4. Run:
   npm run lint
   npm run build
   npm run dev

CHECK
http://localhost:3000/methodology
http://localhost:3000/about
http://localhost:3000/contact

OPTIONAL LATER
When a real email address exists, configure:
NEXT_PUBLIC_CONTACT_EMAIL=your-real-address@your-domain.com
