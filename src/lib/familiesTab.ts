export type FamiliesTab = 'interest' | 'visit';

const KEY = 'families-tab';
const SCROLL_KEY = 'families-scroll';
const EVENT = 'families-tab';

export function openFamiliesTab(tab: FamiliesTab, options?: { scrollTo?: string }) {
  sessionStorage.setItem(KEY, tab);
  if (options?.scrollTo) sessionStorage.setItem(SCROLL_KEY, options.scrollTo);
  window.dispatchEvent(new Event(EVENT));
}

export function consumeFamiliesScroll(): string | null {
  const stored = sessionStorage.getItem(SCROLL_KEY);
  if (!stored) return null;
  window.setTimeout(() => {
    if (sessionStorage.getItem(SCROLL_KEY) === stored) sessionStorage.removeItem(SCROLL_KEY);
  }, 0);
  return stored;
}

export function consumeFamiliesTab(): FamiliesTab | null {
  const stored = sessionStorage.getItem(KEY);
  if (stored !== 'interest' && stored !== 'visit') return null;
  window.setTimeout(() => {
    if (sessionStorage.getItem(KEY) === stored) sessionStorage.removeItem(KEY);
  }, 0);
  return stored;
}

export function onFamiliesTab(listener: () => void) {
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
