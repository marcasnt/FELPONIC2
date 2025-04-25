import { upcomingEvents } from '../data/eventsData';

export default function UpcomingEventsSection() {
  return (
    <section className="max-w-6xl mx-auto my-16 px-4 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-8 text-center">Próximos Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-lg transition-transform hover:scale-105 hover:ring-2 hover:ring-[#FFCC00]"
          >
            <h3 className="text-xl font-bold text-[#FFCC00] mb-2">{event.title}</h3>
            <div className="text-white/80 mb-1">{event.date} · {event.location}</div>
            <p className="text-white/70 text-sm mb-3">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
