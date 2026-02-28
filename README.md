# RanDOM Plouf

A website for conducting random draws and generating teams randomly.

## Development

```
npm run dev
```

## Deployment

The application is deployed at the following addresses:

- https://random-plouf.pages.dev (Cloudflare Pages - static version of RanDOM Plouf)
- https://random-plouf.vercel.app (Vercel)

A redirection from the Vercel deployment to the Cloudflare Pages deployment is implemented in `src/proxy.js`.
The redirection is only applied when the domain is `random-plouf.vercel.app`.

Production and previews deployments are automatically triggered.

Clouflare Pages deployments are triggered on pushes to branches matching the pattern `static-*`.

Vercel deployments are triggered on pushes to all branches except those matching the pattern `static-*`.

Clouflare Pages production branch is `static-main`.

Vercel production branch is `main`.
