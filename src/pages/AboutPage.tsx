import { Award, Users, Calendar, Trophy } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFCC00] text-center">
          Acerca de FELPONIC
        </h1>
        
        <div className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl text-white mb-12">
          <p className="text-lg mb-6">
            La Federación de Levantamiento de Potencia de Nicaragua (FELPONIC) es la organización 
            deportiva dedicada a promover, desarrollar y regular el deporte de powerlifting en todo 
            el territorio nicaragüense.
          </p>
          <p className="text-lg mb-6">
            Fundada con la misión de elevar el nivel competitivo de nuestros atletas y fomentar 
            una cultura de fuerza, disciplina y superación personal, FELPONIC trabaja incansablemente 
            para posicionar a Nicaragua en el mapa mundial del powerlifting.
          </p>
          <p className="text-lg">
            Nuestra federación está afiliada a organizaciones internacionales de powerlifting, 
            lo que permite a nuestros atletas competir en torneos de clase mundial y representar 
            con orgullo a Nicaragua en el escenario internacional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <Award size={48} className="text-[#FFCC00] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nuestra Misión</h3>
            <p className="text-white/80">
              Promover el desarrollo del powerlifting en Nicaragua, fomentando la competencia 
              justa y el crecimiento personal de nuestros atletas.
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <Trophy size={48} className="text-[#FFCC00] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nuestra Visión</h3>
            <p className="text-white/80">
              Ser reconocidos internacionalmente por la excelencia de nuestros atletas y 
              la calidad de nuestras competencias.
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <Users size={48} className="text-[#FFCC00] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nuestro Equipo</h3>
            <p className="text-white/80">
              Formado por profesionales apasionados, entrenadores certificados y atletas experimentados 
              dedicados al crecimiento del deporte.
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <Calendar size={48} className="text-[#FFCC00] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Historia</h3>
            <p className="text-white/80">
              Desde nuestra fundación, hemos trabajado para elevar el estándar del powerlifting 
              nacional, creando oportunidades para atletas de todos los niveles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;