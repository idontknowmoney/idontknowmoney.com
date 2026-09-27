# Astro Starter Kit: Blog

```sh
pnpm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/), via the [Astro blog template](https://github.com/withastro/astro/tree/main/examples/blog) (MIT, © 2021 Fred K. Schott).

## License

This project follows the [REUSE specification](https://reuse.software) — run `reuse lint` to verify compliance, and see `REUSE.toml` and `LICENSES/` for the full picture.

- **Content** — posts and their assets in [`src/content/blog/`](src/content/blog/) — is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), © Alex Rodríguez.
- **Everything else**, including code snippets within posts, is licensed under [MIT](LICENSE), © Alex Rodríguez.
- A few third-party assets keep their original licenses, as recorded in `REUSE.toml`:
  - The Atkinson Hyperlegible fonts (`src/assets/fonts/`) are © Braille Institute of America, Inc., under [OFL-1.1](LICENSES/OFL-1.1.txt).
  - The placeholder images (`src/assets/blog-placeholder-*.jpg`) and favicon (`public/favicon.ico`, `public/favicon.svg`) come from the Astro blog template and are © Fred K. Schott, under MIT.
