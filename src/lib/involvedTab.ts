export type InvolvedTab = 'rsvp' | 'partner' | 'team' | 'contact';

const KEY = 'involved-tab';
const EVENT = 'involved-tab';

export function openInvolvedTab(tab: InvolvedTab) {
  sessionStorage.setItem(KEY, tab);
  window.dispatchEvent(new Event(EVENT));
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
