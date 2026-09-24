# Component Playground

Vite + React + TypeScript playground with one page per component, HMR, and Jest + React Testing Library.

## Scripts

| Command              | What it does                          |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Dev server with HMR                   |
| `npm test`           | Run Jest once                         |
| `npm run test:watch` | Run Jest in watch mode                |
| `npm run build`      | Type-check and build for production   |
| `npm run lint`       | Lint with oxlint                      |

## Adding a component

Create a folder under `src/components/` with the component, a page, and a test:

```
src/components/Button/
  Button.tsx          # the component
  Button.page.tsx     # default-exported demo page -> served at /button
  Button.test.tsx     # Jest + React Testing Library tests
```

Any `src/components/<Name>/<Name>.page.tsx` is discovered automatically (see `src/registry.ts`), added to the sidebar, and served at `/<name>`. No routing changes needed.

Tests should import components directly, not `src/registry.ts` — Jest can't parse Vite's `import.meta.glob`.
