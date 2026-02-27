# Random Plouf

A website for conducting random draws and generating teams randomly.

## Development

```
npm run dev
```

## Deployment

The application is deployed at the following addresses:

- https://random-plouf.pages.dev (Cloudflare Pages)
- https://random-plouf.vercel.app (Vercel)

A redirection from the Vercel deployment to the Cloudflare Pages deployment is implemented in `src/proxy.js`.
The redirection is only applied in production.
