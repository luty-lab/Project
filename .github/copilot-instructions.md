## Copilot / AI agent instructions — Project

Purpose: concise, runnable guidance so an AI coding agent can be productive in this Vue 3 + Vite codebase.

Quick commands (run from repo root)

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build (includes type-check): `npm run build` # runs `vue-tsc` then `vite build`
- Preview a production build: `npm run preview`
- Type-check only: `npm run type-check` (uses `vue-tsc`)
- Lint & format: `npm run lint` and `npm run format`

Big picture (what matters)

- Framework: Vue 3 + TypeScript, built with Vite. Type-checking is enforced during `npm run build`.
- State: Pinia for global state. Stores live under `src/stores/modules/` (see `useCourseList.ts`, `useTabList.ts`).
- Routing & views: Routes are defined in `src/router/index.ts`; views live in `src/views/` (single-file components).
- APIs: lightweight axios wrappers under `src/api/` (e.g. `src/api/apiHome.js`). Some API files are plain JS — keep them JS unless you update tsconfig and tests.
- Styling: SCSS globals and mixins in `src/assets/` and `src/mixins/`. Global style imported in `src/main.ts`.

Project-specific patterns & integration points

- Path alias: `@` → `src` (configured in `vite.config.ts`). Use `@/components`, `@/views`, etc.
- Auto-imports: `unplugin-auto-import` and `unplugin-vue-components` are configured with a Vant resolver; many Vant components are auto-imported — you usually won't see explicit imports for Vant.
- Event bus: `utils/emitter.ts` (mitt) is used for lightweight cross-component events; example: `emitter.on('changeTitle', ...)` in `App.vue`.
- Title helper: `utils/main/changeTitle.ts` centralizes page title logic — prefer reusing it to keep UX consistent.
- UI layout: global NavBar/TabBar components live in `src/components` and are wired from `App.vue`.

Concrete examples

- Add a new page: create `src/views/MyPage.vue` and register in `src/router/index.ts`:
  - { path: '/my-page', name: 'MyPage', component: MyPage }
- Add a Pinia store: place a module under `src/stores/modules/`, export via `defineStore`, and consume via `useXStore()` in components.
- Call an API: follow `src/api/apiHome.js` — export async functions that use axios and rethrow errors. Keep logging minimal and let callers handle UI errors.

Developer workflow notes & gotchas

- Builds enforce types: fixes may be required before `npm run build` succeeds (run `npm run type-check` locally first).
- Scripts: build uses `npm-run-all2` to run type-check then build-only; be careful changing these scripts.
- Don't mass-convert JS API helpers to TS without updating tsconfig and running `vue-tsc`—build will fail if types are inconsistent.

Files to read first when making changes

- `src/main.ts` — bootstrap, Pinia, router, global styles
- `vite.config.ts` — path aliases and auto-import/plugin config
- `src/router/index.ts` — routes registration
- `src/stores/modules/` — example stores and patterns
- `src/api/` — API wrapper examples
- `src/App.vue` — top-level layout and emitter/title usage

If more context is needed (CI, backend contracts, deployment), request the specific config/CI file or the backend API spec. When updating behavior across many files (routes/stores/api), include a small test or manual validation steps (open dev server and exercise the route).

— End
