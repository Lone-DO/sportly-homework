# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```

# Design

Mobile First Design, with Minimalistic approach. Utilizing DaisyUI as a base, and Tailwindcss

Couldn't find a base design spec from pre-existing Sporty products, so went with a generic list

# AI Assistance

`...Loading Data Model...`
`...None Found...`
`...Fallback to Human...`

I'm very aware of AI's benefits and downsides, and only have utilized it up to this point for Code reviews, and part of our Product in my previous role at Virtual Peaker.
That said however, I believe its capabilities to help generate base testing could help accelerate TDD implementations, and insure that at least `Smoke testing` is integrated
More than happy to learn more about `Vibe Coding` among other things in the future.

# Timeline

`under 90 minutes` to resolve all feature request (LeagueList, Fetching Badge, Responsive Design)
`roughly 15 minutes` to integrate a base design
`30 minutes` to integrate `Smoke testing` and a bit more thorough checking for `LeagueStore`

Biggest bottleneck was mocking modules in testing as first time setup, the rest was fairly simple but a bit time consuming

# Dependencies

## Nuxt Plugins

### @nuxt/icon

Extensive Icon Library, referenced via `<Icon name='host:iconName'`

### @nuxtjs/color-mode

Used for Toggling Page Theme automatically based on toggle state. Modifies root `HTML` attribute `data-theme`

## Tailwind/UI Libraries

### tailwind

`@tailwindcss`, `@tailwindcss/vite` are used for registering Tailwind with vscode intellisense and vite compiler.

```
  // .vscode/settings.json for tailwindcss extension
  "tailwindCSS.experimental.configFile": "./app/assets/css/main.css",
```

### daisyui

Tailwind UI Theme based library (Class based dumb components)

## Utilities

### Eslint

`eslint`, `eslint-plugin-format`, `@antfu/eslint-config`, `@nuxt/eslint`

### Husky

Git Hooks for validating code before allowing user to commit/push changes to server
Currently validates Linting and Typecheck via Pre-commit

### lint-staged

Hook to validate **only modified files** for linting problems

### Testing

`@nuxt/test-utils`, `happy-dom`, `vitest`, `@pinia/testing`
