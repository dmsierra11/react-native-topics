export const SCENARIOS = [
  {
    id: 'code-review',
    title: 'Code review exercise',
    subtitle: 'Daily goal screen — review this like a PR',
    enabled: true,
  },
  {
    id: 'unnecessary-renders',
    title: 'Unnecessary React renders',
    subtitle: 'Parent state re-renders children that do not use it',
    enabled: true,
  },
  {
    id: 'large-lists',
    title: 'Large lists',
    subtitle: 'Virtualization, extra data, and item cost',
    enabled: false,
  },
  {
    id: 'js-thread',
    title: 'JS thread blocking',
    subtitle: 'Synchronous work starving the bridge',
    enabled: false,
  },
  {
    id: 'animations',
    title: 'Animations',
    subtitle: 'JS-driven vs native / UI-thread motion',
    enabled: false,
  },
  {
    id: 'images',
    title: 'Images',
    subtitle: 'Decode size, caching, and overdraw',
    enabled: false,
  },
  {
    id: 'network',
    title: 'Network ≠ rendering',
    subtitle: 'Fetch time is not the same as frame time',
    enabled: false,
  },
  {
    id: 'memory',
    title: 'Memory',
    subtitle: 'Retained trees, images, and leaks',
    enabled: false,
  },
] as const;

export type ScenarioId = (typeof SCENARIOS)[number]['id'];
export type ScreenId = 'home' | ScenarioId;
