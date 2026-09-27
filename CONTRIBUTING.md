# Contributing

## Branches

`main` and `develop` are permanent. Everything else is short-lived.

1. Branch from `develop` (`feature/...`, `fix/...`).
2. Open a PR into `develop`.
3. To release, open a PR from `develop` into `main`.
4. If `main` gets anything `develop` doesn't have (e.g. a hotfix), back-merge `main` into `develop` with a PR.

## Deployments (Vercel)

| Branch    | Deploys to                                                     |
| --------- | -------------------------------------------------------------- |
| `main`    | Production                                                     |
| `develop` | Staging (its own stable domain, e.g. `dev.idontknowmoney.com`) |
| Any PR    | A preview URL, posted on the PR by the `Vercel` check          |

## Checks

Every PR into `main` or `develop` must pass:

- **`Check`**: the GitHub Actions workflow in `.github/workflows/ci.yml`. It runs `astro check` (type checking) and `prettier --check`.
- **`Vercel`**: Vercel's build and preview deployment.

## Merge rules

Both permanent branches are protected by two repository rulesets (Settings → Rules → Rulesets):

| Ruleset | Enforces                                                                                                                                      | Admins can bypass?                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| CI      | `Check` and `Vercel` must pass on an up-to-date branch; no force-pushes or deletion                                                           | No                                                 |
| Review  | Changes go through a PR with 1 approval from a code owner (`@idontknowmoney/reviewers`, see `.github/CODEOWNERS`); all conversations resolved | Yes, admins can merge their own PRs without review |

## Local setup

```sh
pnpm install
```

This also installs a git pre-commit hook ([lefthook](https://lefthook.dev), configured in `lefthook.yml`) that runs Prettier on your staged files. Run `pnpm check` for type checking and `pnpm format` to format everything.
