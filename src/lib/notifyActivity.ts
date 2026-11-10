export interface ActivityNotice {
  table: string;
  email: string;
  name: string;
}

export function notifyActivity(activity: ActivityNotice) {
  if (typeof window === 'undefined') return;
  const body = JSON.stringify(activity);
  void fetch('/api/notify-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
