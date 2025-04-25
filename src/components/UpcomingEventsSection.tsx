const events = [
  {
    title: "Campeonato Nacional 2025",
    date: "15 Junio 2025",
    location: "Managua, Polideportivo",
    description: "El evento más esperado del año para los mejores atletas del país.",
    highlight: true
  },
  {
    title: "Seminario de Jueces",
    date: "28 Julio 2025",
    location: "Virtual / Zoom",
    description: "Capacitación oficial para nuevos jueces y entrenadores.",
    highlight: false
  },
  {
    title: "Copa Novatos",
    date: "10 Agosto 2025",
    location: "León, Gimnasio Central",
    description: "Competencia especial para atletas nuevos en la federación.",
    highlight: false
  }
];

export default function UpcomingEventsSection() {
  return (
    <section className="max-w-6xl mx-auto my-16 px-4 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-8 text-center">Próximos Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, i) => (
          <div key={i} className={`rounded-xl border border-white/10 bg-black/40 p-6 shadow-lg transition-transform hover:scale-105 ${event.highlight ? 'ring-2 ring-[#FFCC00]' : ''}`}>
            <h3 className="text-xl font-bold text-[#FFCC00] mb-2">{event.title}</h3>
            <div className="text-white/80 mb-1">{event.date} · {event.location}</div>
            <p className="text-white/70 text-sm mb-3">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
