# Tech Stack

## Core

- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **Language:** TypeScript (~5.9)
- **Build tool:** Vite 8
- **UI library:** Vuetify 4 (auto-imported, Material Design Icons via `@mdi/font`)
- **CSS:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin) + Sass for Vuetify settings
- **Fonts:** Roboto and Roboto Mono via `unplugin-fonts`

## Package Management

- **pnpm** (lockfile: `pnpm-lock.yaml`)
- Node engine: `^22.18.0 || >=24.12.0`

## Linting

- ESLint 10 with `eslint-config-vuetify`

## Testing

- Vitest (unit tests)

## Common Commands

```sh
pnpm install        # Install dependencies
pnpm dev            # Dev server on port 3000
pnpm build          # Type-check + production build
pnpm preview        # Preview production build locally
pnpm test:unit      # Run unit tests (Vitest)
```

## Path Aliases

- `@` → `src/` (configured in vite.config.ts)
