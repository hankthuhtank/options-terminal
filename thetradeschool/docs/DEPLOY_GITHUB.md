# Deploy to GitHub Pages

TradeSchool V7 is a static site and can be deployed directly from a repository.

## Repository root

Put the contents of `tradeschool-v7/` at the repository root (or publish that folder through your preferred Pages workflow). Keep the relative directory structure intact.

## GitHub Pages settings

1. Push the files to GitHub.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose the branch you use for production (commonly `main`) and `/ (root)`.
5. Save.

The included `.nojekyll` file prevents Jekyll processing from changing static asset behavior.

## Why routing works

TradeSchool uses URL hashes such as `#/world/hvac/unit/hvac-airflow`. The server only needs to serve `index.html`; client-side routing happens after the `#`, so refreshing a lesson does not require custom server rewrites.

## Before pushing

Run:

```bash
python -m http.server 8080
```

Check the homepage, every trade, at least one unit, the reference index, the curated labs, and phone-width responsive behavior in browser developer tools.

No `.env`, API key, backend URL or secret is required for V7.
