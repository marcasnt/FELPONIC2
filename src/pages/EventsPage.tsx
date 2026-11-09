import { Link } from 'react-router-dom';
import EventList from '../components/EventList';
import { isCalendarDate, loadEvents, today, usePublicContent } from '../data/publicContent';

export default function EventsPage() {
  const { data, status } = usePublicContent(loadEvents);
  const date = today();
  const dated = data.filter(event => isCalendarDate(event.date));
  const upcoming = dated.filter(event => event.date >= date);
  const past = dated.filter(event => event.date < date).reverse();
  return <div className="page-shell">
    <h1 className="page-title">Competencias</h1>
    <p className="page-intro">Consulta el calendario y las convocatorias de FELPONIC.</p>
    <section className="mt-10">
      <h2 className="section-title">Próximas competencias</h2>
      {status === 'loading' && <p role="status">Cargando calendario…</p>}
      {status === 'error' && <p role="status">No pudimos cargar el calendario. <Link className="text-link" to="/contacto">Consulta con FELPONIC</Link>.</p>}
      {status === 'ready' && (upcoming.length ? <EventList events={upcoming} upcoming /> : <p className="text-white/80">Por ahora no hay próximas competencias confirmadas.</p>)}
    </section>
    {past.length > 0 && <section className="mt-14"><h2 className="section-title">Competencias anteriores</h2><EventList events={past} upcoming={false} /></section>}
    {data.some(event => !dated.includes(event)) && <section className="mt-14"><h2 className="section-title">Archivo de competencias</h2><ul className="divide-y divide-white/15">{data.filter(event => !dated.includes(event)).map(event => <li key={event.id} className="py-4"><h3 className="font-semibold">{event.title}</h3><p className="text-white/80">{event.date} · {event.location}</p><p className="mt-2 text-white/80">{event.description}</p></li>)}</ul></section>}
  </div>;
}
