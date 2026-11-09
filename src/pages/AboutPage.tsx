import { Link } from 'react-router-dom';
import { Award, Users, Calendar, Trophy } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">Acerca de FENILEPO</h1>
        <p className="page-intro">Federación Nicaragüense de Levantamiento de Potencia.</p>
      </header>
      <div className="max-w-4xl">
        <div className="max-w-prose text-white/[.85] mb-10">
          <p className="text-lg mb-6">
            La Federación Nicaragüense de Levantamiento de Potencia (FENILEPO) es la organización
            deportiva dedicada a promover, desarrollar y regular el deporte de powerlifting en todo
            el territorio nicaragüense.
          </p>
          <p className="text-lg mb-6">
            Fundada con la misión de elevar el nivel competitivo de nuestros atletas y fomentar
            una cultura de fuerza, disciplina y superación personal, FENILEPO trabaja incansablemente
            para posicionar a Nicaragua en el mapa mundial del powerlifting.
          </p>
          <p className="text-lg">
            Nuestra federación está afiliada a organizaciones internacionales de powerlifting,
            lo que permite a nuestros atletas competir en torneos de clase mundial y representar
            con orgullo a Nicaragua en el escenario internacional.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          <div className="border-t border-white/15 pt-4">
            <Award size={24} className="text-brand-gold mb-3" aria-hidden />
            <h2 className="text-xl font-bold text-white mb-2">Nuestra Misión</h2>
            <p className="text-white/80">
              Promover el desarrollo del powerlifting en Nicaragua, fomentando la competencia
              justa y el crecimiento personal de nuestros atletas.
            </p>
          </div>

          <div className="border-t border-white/15 pt-4">
            <Trophy size={24} className="text-brand-gold mb-3" aria-hidden />
            <h2 className="text-xl font-bold text-white mb-2">Nuestra Visión</h2>
            <p className="text-white/80">
              Ser reconocidos internacionalmente por la excelencia de nuestros atletas y
              la calidad de nuestras competencias.
            </p>
          </div>

          <div className="border-t border-white/15 pt-4">
            <Users size={24} className="text-brand-gold mb-3" aria-hidden />
            <h2 className="text-xl font-bold text-white mb-2">Nuestro Equipo</h2>
            <p className="text-white/80">
              Formado por profesionales apasionados, entrenadores certificados y atletas experimentados
              dedicados al crecimiento del deporte.
            </p>
          </div>

          <div className="border-t border-white/15 pt-4">
            <Calendar size={24} className="text-brand-gold mb-3" aria-hidden />
            <h2 className="text-xl font-bold text-white mb-2">Historia</h2>
            <p className="text-white/80">
              Desde nuestra fundación, hemos trabajado para elevar el estándar del powerlifting
              nacional, creando oportunidades para atletas de todos los niveles.
            </p>
          </div>
        </div>
        <section className="mt-12 border-t border-white/15 pt-8"><h2 className="section-title">Atletas y clubes</h2><p className="mb-4 max-w-prose text-white/80">Consulta con FENILEPO los requisitos de afiliación, el reglamento vigente y los pasos para participar.</p><Link to="/contacto" className="action action-secondary">Consultar con la federación</Link></section>
      </div>
    </div>
  );
};

export default AboutPage;
