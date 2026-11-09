import { Link } from 'react-router-dom';
import EventList from './EventList';
import { isCalendarDate, today } from '../data/publicContent';
import { events as data } from '../data/eventsData';

export default function UpcomingEventsSection() {
  const date = today();
  const upcoming = data.filter(event => isCalendarDate(event.date) && event.date >= date)
    .sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return <section className="mt-8 md:mt-10">
    <h2 className="section-title">Próximas competencias</h2>
    {(upcoming.length ? <EventList events={upcoming} upcoming /> : <p className="text-white/80">Por ahora no hay próximas competencias confirmadas.</p>)}
    <Link className="text-link mt-4 inline-flex min-h-11 items-center" to="/eventos">Ver calendario completo</Link>
  </section>;
}
