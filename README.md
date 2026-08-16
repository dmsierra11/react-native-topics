# React Native performance lab

Interactive Expo app of live demos for common React Native performance pitfalls. Each scenario is a screen you can tap through — start with unnecessary renders; the rest unlock as they are built.

## Prerequisites

- Node.js 20+
- [Expo Go](https://expo.dev/go) on a device, or an iOS Simulator / Android emulator

## Run

```bash
npm install
npm start
```

Then press `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

```bash
npm run ios
npm run android
npm run web
```

## Scenarios

| #   | Topic                                                                           | Status |
| --- | ------------------------------------------------------------------------------- | ------ |
| 01  | Unnecessary React renders — parent state re-renders children that do not use it | Live   |
| 02  | Large lists — virtualization, extra data, and item cost                         | Soon   |
| 03  | JS thread blocking — synchronous work starving the bridge                       | Soon   |
| 04  | Animations — JS-driven vs native / UI-thread motion                             | Soon   |
| 05  | Images — decode size, caching, and overdraw                                     | Soon   |
| 06  | Network ≠ rendering — fetch time is not the same as frame time                  | Soon   |
| 07  | Memory — retained trees, images, and leaks                                      | Soon   |

Enable a scenario in `src/scenarios.ts` (`enabled: true`) and wire its screen in `App.tsx`.

## Project layout

```
App.tsx                          # Screen switcher
src/
  scenarios.ts                   # Catalog of demos
  theme.ts                       # Shared colors
  components/RenderCountBadge.tsx
  screens/
    HomeScreen.tsx
    UnnecessaryRendersScreen.tsx # Scenario 01
    ReanimatedSmokeScreen.tsx    # Reanimated timing/spring check (not in nav yet)
```

## Stack

Expo SDK 54, React Native 0.81, React Native Reanimated 4, Gesture Handler.
