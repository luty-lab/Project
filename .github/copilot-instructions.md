## Copilot / AI agent instructions — Project

Purpose: give concise, runnable guidance to AI coding agents so they can be productive immediately in this Vue 3 + Vite project.

- Quick commands (use project root):
  - Install: `npm install`
  - Dev: `npm run dev` (vite)
  - Build: `npm run build` (runs `vue-tsc` type-check then `vite build`)
  - Preview: `npm run preview`
  - Type-check only: `npm run type-check` (uses `vue-tsc`)
  - Lint/format: `npm run lint`, `npm run format`

Big picture
- Framework: Vue 3 + TypeScript, built with Vite. See `vite.config.ts` for aliases and auto-import plugins.
- State: Pinia used for global state. `src/stores/index.ts` exports the Pinia instance; individual stores live under `src/stores/modules/`.
- Routing: `src/router/index.ts` defines routes (single-file Vue components from `src/views/`). Add new pages by adding a view and registering a route there.
- API: simple axios wrappers live in `src/api/` (example: `src/api/apiHome.js`). Some API code may be plain JS while app code is TS — preserve JS when present unless migrating intentionally.
- Styling: SCSS globals under `src/assets/` and `src/mixins/`; global import in `src/main.ts`.

Project-specific conventions & patterns
- Path alias: `@` -> `src` is configured in `vite.config.ts`. Use `@/components`, `@/views`, etc.
- Auto-imports: `unplugin-auto-import` + `unplugin-vue-components` configured with Vant resolver — Vant components may be auto-imported. Don't manually add Vant imports unless necessary.
- Entry: `src/main.ts` mounts the app, registers Pinia and router. Small boot logic (global styles, plugins) goes here.
- Event bus pattern: `utils/emitter.ts` is used (see `App.vue` usage of `emitter.on('changeTitle', ...)`). Follow that pattern for global, light-weight events.
- Title change helper: `utils/main/changeTitle.ts` is used from `App.vue` — prefer reusing it for consistent UI behavior.

How to make common changes (examples)
- Add a new page:
  1. Create `src/views/MyPage.vue` (single-file component).
  2. Add route in `src/router/index.ts`: { path: '/my-page', name: 'MyPage', component: MyPage }.

- Add a new Pinia store:
  1. Create a module file under `src/stores/modules/` and export a store created with `defineStore`.
  2. No global import wiring needed — `src/stores/index.ts` already sets up Pinia used in `src/main.ts`.

- Call an API:
  - Follow `src/api/apiHome.js` pattern: export named async functions that call `axios` and throw errors upward. Keep error logging minimal and rethrow for callers to handle.

Build and developer workflow notes
- Type-checking is enforced as part of `npm run build` using `vue-tsc` (so fixes may be required before builds succeed).
- ESLint and Prettier are configured; run `npm run lint` or `npm run format` as needed.
- Vite dev server runs with `npm run dev`; Vue devtools plugin is enabled in `vite.config.ts` — use browser Vue devtools for component/state inspection.

Files to reference when editing or extending behavior
- `src/main.ts` — app bootstrap
- `vite.config.ts` — aliases, auto-imports, plugins
- `src/router/index.ts` — routes
- `src/stores/index.ts` and `src/stores/modules/` — state
- `src/api/` — API wrappers
- `src/App.vue` — global layout (NavBar, TabBarT, title handling)

When not to change
- Avoid changing Vite alias `@` and auto-import plugin config without updating imports and build config.
- Be cautious converting small JS API files to TypeScript unless you update lint/tsconfig and test the type-check step.

If something is unclear or you need deeper context (e.g., CI, deployment, backend contract), ask for the specific file or the owner to provide missing details.

— End
