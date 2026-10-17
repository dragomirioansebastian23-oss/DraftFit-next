# DraftFit Launch Blocker Pass

This package is based on the current merged source used for the prelaunch audit.

## Included

- Production URL/indexing safety:
  - robots noindex/disallow unless `NEXT_PUBLIC_SITE_URL` is explicitly configured.
  - empty sitemap when no production URL is configured.
  - root metadata follows the same indexing rule.
- Engineering regression suite:
  - ISO 286 reference cases.
  - O-ring geometry reference cases.
  - Metric thread / bolt reference cases.
  - Parallel key reference cases.
- Contact environment example with `NEXT_PUBLIC_CONTACT_EMAIL`.
- Privacy Policy page.
- Terms & Engineering Disclaimer page.
- Footer links to Privacy and Terms.
- Branded dynamic Open Graph image route.
- Manifest favicon entry.

## Production environment

Set before launch:

```env
NEXT_PUBLIC_SITE_URL=https://YOUR-FINAL-DOMAIN
NEXT_PUBLIC_CONTACT_EMAIL=YOUR-CONTACT-EMAIL
```

Without `NEXT_PUBLIC_SITE_URL`, DraftFit intentionally prevents search indexing.

## Local validation

```powershell
npm run lint
npm test
npm run build
npm start -- -H 0.0.0.0
```
