# Contributing

## Branches

`main` and `develop` are permanent. Everything else is short-lived.

1. Branch from `develop` (`feature/...`, `fix/...`).
2. Open a PR into `develop`.
3. To release, open a PR from `develop` into `main`.
4. If `main` gets anything `develop` doesn't have (e.g. a hotfix), back-merge `main` into `develop` with a PR.

## Merge rules

Both permanent branches are protected by repository rulesets (source in `.github/rulesets/`):

| Ruleset | Applies to | Admins can bypass? |
| --- | --- | --- |
| `<branch>: CI required`: the `Build` check (`.github/workflows/ci.yml`) must pass on an up-to-date branch; no force-pushes or deletion | everyone | No |
| `<branch>: Code review`: changes go through a PR with 1 approval from a code owner (`@idontknowmoney/reviewers`, see `.github/CODEOWNERS`); all threads resolved | everyone except admins | Yes, admins can merge their own PRs without review |

## Applying the rulesets

1. Create the `reviewers` team in the org, add members, and give it **Write** access to this repo (CODEOWNERS ignores teams without write access).
2. Go to **Settings → Rules → Rulesets → New ruleset → Import a ruleset** and import each JSON file in `.github/rulesets/`.
