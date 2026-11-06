export type InvolvedTab = 'rsvp' | 'partner' | 'team' | 'contact';

const KEY = 'involved-tab';
const SCROLL_KEY = 'involved-scroll';
const EVENT = 'involved-tab';

export function openInvolvedTab(tab: InvolvedTab, options?: { scrollTo?: string }) {
  sessionStorage.setItem(KEY, tab);
  if (options?.scrollTo) sessionStorage.setItem(SCROLL_KEY, options.scrollTo);
  window.dispatchEvent(new Event(EVENT));
}

export function consumeInvolvedScroll(): string | null {
  const stored = sessionStorage.getItem(SCROLL_KEY);
  if (!stored) return null;
  window.setTimeout(() => {
    if (sessionStorage.getItem(SCROLL_KEY) === stored) sessionStorage.removeItem(SCROLL_KEY);
  }, 0);
  return stored;
}

export function consumeInvolvedTab(): InvolvedTab | null {
  const stored = sessionStorage.getItem(KEY);
  if (stored !== 'rsvp' && stored !== 'partner' && stored !== 'team' && stored !== 'contact') return null;
  window.setTimeout(() => {
    if (sessionStorage.getItem(KEY) === stored) sessionStorage.removeItem(KEY);
  }, 0);
  return stored;
}

export function onInvolvedTab(listener: () => void) {
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
