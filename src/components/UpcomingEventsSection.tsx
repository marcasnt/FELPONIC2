import { Link } from 'react-router-dom';
import EventList from './EventList';
import { isCalendarDate, loadEvents, today, usePublicContent } from '../data/publicContent';

export default function UpcomingEventsSection() {
  const { data, status } = usePublicContent(loadEvents);
  const date = today();
  const upcoming = data.filter(event => isCalendarDate(event.date) && event.date >= date).slice(0, 3);
  return <section className="mt-16">
    <h2 className="section-title">Próximas competencias</h2>
    {status === 'loading' && <p role="status">Cargando calendario…</p>}
    {status === 'error' && <p role="status">El calendario no está disponible en este momento.</p>}
    {status === 'ready' && (upcoming.length ? <EventList events={upcoming} upcoming /> : <p className="text-white/80">Por ahora no hay próximas competencias confirmadas.</p>)}
    <Link className="text-link mt-4 inline-flex min-h-11 items-center" to="/eventos">Ver calendario completo</Link>
  </section>;
}
