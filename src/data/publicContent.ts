export type Event = { id: string; title: string; date: string; location: string; description: string; registrationUrl?: string };
export type Photo = { name: string; url: string; album: string };

export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Managua', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export function isCalendarDate(date: string) {
  const parsed = new Date(date + 'T00:00:00Z');
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export const formatDate = (date: string) => isCalendarDate(date)
  ? new Intl.DateTimeFormat('es-NI', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date + 'T00:00:00Z'))
  : date;
