# Repository Guidelines

## Project Structure & Module Organization

This repository is a static lab website for GitHub Pages. Top-level `index.html` is the homepage. Each section has its own folder with an `index.html`, including `people/`, `pi/`, `publication/`, `research/`, `resource/`, `service/`, and `member/` as a redirect to People. Shared styling and navigation live in `assets/site.css` and `assets/site-nav.js`. Images and fonts are under `assets/`; Research page media currently lives under `_assets/`. Keep `.nojekyll` at the repository root so GitHub Pages publishes `_assets/`.

## Build, Test, and Development Commands

There is no package manager or build pipeline. Edit files directly and preview with a local static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Before publishing, check status and diffs:

```bash
git status --short
git diff
```

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JavaScript. Keep HTML semantic and consistent with existing card/list patterns. Use lowercase folder names and kebab-case asset filenames, for example `assets/people/qi-wang.jpg`. Do not add commented-out sections, unused backup files, `.DS_Store`, or mirror metadata.

## Testing Guidelines

No automated tests are configured. Manually verify all changed pages in a browser. For content updates, confirm search metadata such as `data-publication` stays lowercase and matches visible publication text. For asset updates, verify each referenced local path exists and works after serving locally.

## Commit & Pull Request Guidelines

Use only the commit date in `YYYY-MM-DD` format as the commit message, for example `2026-08-19`. Do not add descriptions, notes, prefixes, or suffixes. Keep each commit focused. PRs should summarize changed pages, list manual checks, and include screenshots for visual/layout changes.

## Security & Public Repository Hygiene

Treat all committed content as public. Do not commit private funding drafts, hidden comments, credentials, local metadata, or unused source mirrors. This repository should use the local Git identity `MPIL Lab <mpil-lab@users.noreply.github.com>` for public commits. Pushes must authenticate as the `MPIL-lab` GitHub account; verify that `ssh -T git@github.com` reports `Hi MPIL-lab!` before pushing. Never commit or push to GitHub using the `zhuolingli` identity.
