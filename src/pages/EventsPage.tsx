import { Link } from 'react-router-dom';
import EventList from '../components/EventList';
import { isCalendarDate, today } from '../data/publicContent';
import { events } from '../data/eventsData';

export default function EventsPage() {
  const date = today();
  const dated = events.filter(event => isCalendarDate(event.date)).sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = dated.filter(event => event.date >= date);
  const past = dated.filter(event => event.date < date).reverse();
  const undated = events.filter(event => !isCalendarDate(event.date));

  return <div className="page-shell">
    <header className="page-header">
      <h1 className="page-title">Competencias</h1>
      <p className="page-intro">Consulta las convocatorias y el archivo de competencias de FENILEPO.</p>
    </header>
    <section>
      <h2 className="section-title">Próximas competencias</h2>
      {upcoming.length > 0 ? <EventList events={upcoming} upcoming /> : <div className="info-panel">
        <p>Por ahora no hay próximas competencias confirmadas.</p>
        <Link className="text-link mt-2 inline-flex min-h-11 items-center" to="/contacto">Consultar con FENILEPO</Link>
      </div>}
    </section>
    {past.length > 0 && <section className="mt-10">
      <h2 className="section-title">Competencias anteriores</h2>
      <EventList events={past} upcoming={false} />
    </section>}
    {undated.length > 0 && <section className="mt-10">
      <h2 className="section-title">Archivo de competencias</h2>
      <ul className="divide-y divide-white/15">
        {undated.map(event => <li key={event.id} className="py-4">
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-white/80">{event.date} · {event.location}</p>
          <p className="mt-2 text-white/80">{event.description}</p>
        </li>)}
      </ul>
    </section>}
  </div>;
}
