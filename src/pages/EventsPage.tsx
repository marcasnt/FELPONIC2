import { Calendar, MapPin, Clock, Trophy } from 'lucide-react';

const EventsPage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Campeonato Nacional de Powerlifting 2025",
      date: "15 de Marzo, 2025",
      location: "Managua, Nicaragua",
      time: "9:00 AM - 6:00 PM",
      description: "El evento más importante del año que reúne a los mejores levantadores de potencia de Nicaragua. Categorías por peso y edad para todos los niveles."
    },
    {
      id: 2,
      title: "Copa Centroamericana de Powerlifting",
      date: "12 de Mayo, 2025",
      location: "León, Nicaragua",
      time: "10:00 AM - 5:00 PM",
      description: "Competencia internacional con participantes de toda Centroamérica. Una oportunidad única para representar a Nicaragua en el escenario regional."
    },
    {
      id: 3,
      title: "Clasificatorio Nacional Juvenil",
      date: "8 de Julio, 2025",
      location: "Granada, Nicaragua",
      time: "8:00 AM - 3:00 PM",
      description: "Evento diseñado para descubrir nuevos talentos en las categorías juveniles. Abierto a competidores entre 14 y 18 años."
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Campeonato Nacional 2024",
      date: "20 de Marzo, 2024",
      location: "Managua, Nicaragua",
      champions: "Categoría masculina: Carlos Mendoza, Categoría femenina: María Gómez"
    },
    {
      id: 5,
      title: "Torneo Invitacional 2024",
      date: "5 de Enero, 2024",
      location: "Estelí, Nicaragua",
      champions: "Categoría Open: Roberto Castillo, Categoría Junior: Ana López"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFCC00] text-center">
        Eventos
      </h1>
      
      {/* Upcoming Events */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-white">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden transform hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="bg-[#FF0000] p-3">
                <h3 className="text-xl font-bold text-white">{event.title}</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-white">
                  <Calendar size={18} className="text-[#FFCC00] mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-3 text-white">
                  <MapPin size={18} className="text-[#FFCC00] mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center mb-4 text-white">
                  <Clock size={18} className="text-[#FFCC00] mr-2" />
                  <span>{event.time}</span>
                </div>
                <p className="text-white/80 mb-4">{event.description}</p>
                <button className="w-full bg-gradient-to-r from-[#E50914] to-[#FF3300] text-white font-bold py-2 rounded hover:from-[#FF3300] hover:to-[#E50914] transition-all duration-300">
                  Inscribirse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Past Events */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-white">Eventos Anteriores</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl flex items-start"
            >
              <Trophy size={48} className="text-[#FFCC00] mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <div className="text-white/80 mb-1">
                  <Calendar size={16} className="inline mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="text-white/80 mb-3">
                  <MapPin size={16} className="inline mr-2" />
                  <span>{event.location}</span>
                </div>
                <p className="text-white/90">
                  <span className="font-semibold">Campeones:</span> {event.champions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;