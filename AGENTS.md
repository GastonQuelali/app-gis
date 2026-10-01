# AGENTS.md

Expo SDK 54 + expo-router + TypeScript app. GIS/catastro viewer backed by an ArcGIS Server on the local network.

## Commands

```bash
npx tsc --noEmit     # typecheck
npx expo lint        # eslint (expo config)
npx expo run:ios     # dev build + Metro; long (~5-12 min first build, ~50 Pods)
```

There is **no test framework** (no jest/vitest, no `__tests__`). Verification is typecheck + lint + running it in the simulator.

## Must use a dev build, never Expo Go

Native modules are load-bearing: `expo-secure-store`, `expo-local-authentication`, `react-native-webview`. `README.md` suggests Expo Go and `npx expo start -c` — **that is wrong for this app**. Use `npx expo run:ios`.

`iOS Bundled ...` in the Metro log means it worked. Simulator-only noise that is safe to ignore: `hapticpatternlibrary.plist` not found, `Failed to resolve host network app id` (WebKit).

## `ios/` and `android/` are gitignored

They are generated, so `npx expo prebuild --clean` is safe and loses nothing.

**Gotcha that costs real time:** `bundleIdentifier` in `app.json` is *cosmetic until you prebuild*. The effective ID comes from `PRODUCT_BUNDLE_IDENTIFIER` in the generated `ios/appgis.xcodeproj/project.pbxproj`. After changing `app.json` you must run `npx expo prebuild --clean && npx expo run:ios`, otherwise the app silently keeps the old ID.

## `master` has 2 pre-existing typecheck errors

```
components/ui/collapsible.tsx(7,10): TS2305: Module '"@/constants/theme"' has no exported member 'Colors'
hooks/use-theme-color.ts(6,10):     TS2305: (same)
```

`constants/theme.ts` never exported `Colors`, though both files import it. `master` does not typecheck. **Do not assume you introduced them** — verify with `git stash` if unsure.

Fixed on `feature/GAM-014-version-santa-cruz` by adding the `Colors` export, and independently in PR #2 (`feature/DAGC-012-add-storybook`). The two fixes are identical, so expect at most a trivial conflict when both land.

These TS errors do **not** block runtime: Babel strips types without checking, so the app runs fine even when `tsc` fails.

## This repo is a per-municipality fork

The app is hardcoded to **Cochabamba (CBA)**. Branch `feature/GAM-014-version-santa-cruz` is the Santa Cruz version. `constants/` is the single configuration seam — server host, layers, basemaps, center. Nothing else in the code should need changing per municipality.

ArcGIS Server: `192.168.105.219:6080`, plain HTTP, no auth. Data lives in folders `catastro`, `imagenes`, `planificacion`.

`service names are not consistent` — the same server carries `CBA_1994_500`, `CBBA_2008_500`, `CBA_2018500` and `imagen2022` alongside `imagen1964_500`. Never assume a naming pattern; verify a path returns HTTP 200 before relying on it.

**Layers and map center must agree.** `MAP_CONFIG.INITIAL_REGION` sits at Cochabamba (`constants/arcgis.ts`). The CBA layers only cover Cochabamba (~-66.1, -17.4). Centering the map anywhere else yields a *blank map with no error* — tiles resolve, there is just nothing to draw. This is the failure mode when porting to another municipality: point `SERVER_HOST` at the new server *and* set the center to that city's coverage.

## Dead code — do not wire up without checking

- `services/api.ts` is imported nowhere. Its `getManzanaUrl` / `getPrediosCountUrl` aliases are now correct, but nothing calls it.
- `constants/auth.ts` (`AUTH_CONFIG`) is imported nowhere. Login is biometric-only and stores the email locally in SecureStore — **it never calls a server**. Any email/password gets in. The `/api/auth/*` endpoints 404 on the server.

## Conventions

- Default branch is **`master`**, not `main`.
- Branches: `<type>/<CLIENT>-<ticket>-<kebab-desc>`, e.g. `feature/DAGC-012-add-storybook`, `refactor/DAGC-010-...`, `feature/GAM-014-version-santa-cruz`. `GAMC` appears only in branch names, never in code.
- Conventional Commits (`feat:`, `refactor:`, `chore:`, `fix:`).
- Imports are inconsistent on purpose-by-accident: `@/` alias in `app/`, relative `../` in `components/` and `services/`. Both resolve. Match the file you are editing.
- No CI (`.github/` does not exist).
- `baseMapsOrder` in `components/ArcGISMap.tsx` is a hand-maintained array that must stay in sync with the `BASE_MAPS` keys in `constants/arcgis.ts`.