import { CalendarDays, MapPin } from 'lucide-react';
import { formatDate, type Event } from '../data/publicContent';

export default function EventList({ events, upcoming }: { events: Event[]; upcoming: boolean }) {
  return <ul className="divide-y divide-white/15 border-y border-white/15">
    {events.map(event => <li key={event.id} className="grid gap-4 py-6 sm:grid-cols-[minmax(10rem,1fr)_3fr] sm:gap-8">
      <div className="space-y-2 text-sm text-white/80">
        <p className="flex items-start gap-2"><CalendarDays size={18} className="shrink-0 text-brand-gold" aria-hidden />{formatDate(event.date)}</p>
        <p className="flex items-start gap-2"><MapPin size={18} className="shrink-0 text-brand-gold" aria-hidden />{event.location}</p>
      </div>
      <div className="min-w-0 break-words">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="mt-2 max-w-prose text-white/80">{event.description}</p>
        <p className="mt-3 text-sm font-semibold text-brand-gold">{!upcoming ? 'Finalizado' : event.registrationUrl ? 'Inscripción abierta' : 'Inscripción no disponible'}</p>
        {upcoming && event.registrationUrl && <a className="action action-primary mt-3" href={event.registrationUrl}>Inscribirme en {event.title}</a>}
      </div>
    </li>)}
  </ul>;
}
