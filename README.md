# I Don't Know Money (Yet)

A minimalist developer blog about learning finance by building things, built with [Astro](https://astro.build) and styled with the _I Don't Know Money (Yet)_ design system (a white façade, mounted panels, one teal accent).

Three tabs: **Home**, **Posts** (every episode, filterable by topic) and **Social** (X and LinkedIn posts that link out).

## Project structure

```text
├── public/                 favicons, og-image
├── templates/              episode.md, social.md (copy into src/content/)
├── src/
│   ├── components/         SiteHeader, PostCard, SocialCard, FilterBar, ...
│   ├── content/
│   │   ├── blog/           episodes (Markdown/MDX), CC BY 4.0
│   │   └── social/         X and LinkedIn posts (Markdown, body = post text)
│   ├── layouts/            BaseLayout, EpisodeLayout
│   ├── lib/content.ts      collection helpers, date and episode formatting
│   ├── pages/              /, /posts, /posts/<episode>, /social, /rss.xml
│   └── styles/             tokens.css, ik.css (design system), global.css
└── astro.config.mjs        fonts (Instrument Sans, JetBrains Mono)
```

### Writing content

- An episode is `src/content/blog/ep-NN-slug.md` with `title`, `description`, `pubDate`, `episode`, `season`, `topic` and optional `code`, `takeaway`, `minutes`, `draft`.
- A social post is `src/content/social/<date>-<platform>-<slug>.md` with `platform`, `url`, `date` and optionally `episode`; the body is the post text, exactly as published.
- Start from the templates in [`templates/`](templates/): `episode.md` and `social.md` (each field is explained in comments). They live outside `src/content/` so they are never published.
- Entries with `draft: true` show in `pnpm dev` and are left out of production builds. The seed content is all drafts: replace it with real episodes.

## Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm dev`     | Starts local dev server at `localhost:4321` |
| `pnpm build`   | Builds the production site to `./dist/`     |
| `pnpm preview` | Previews the build locally                  |
| `pnpm check`   | Type-checks Astro files                     |
| `pnpm format`  | Formats with Prettier                       |

## License

This project follows the [REUSE specification](https://reuse.software) — run `reuse lint` to verify compliance, and see `REUSE.toml` and `LICENSES/` for the full picture.

- **Content** — posts and their assets in [`src/content/blog/`](src/content/blog/) — is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), © Àlex Rodríguez.
- **Everything else**, including code snippets within posts, is licensed under [MIT](LICENSE), © Àlex Rodríguez.

Instrument Sans and JetBrains Mono are fetched from Google Fonts at build time and self-hosted. Both are licensed under the SIL Open Font License 1.1 and are not stored in this repository.
