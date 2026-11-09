import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhoWeAreSection from '../components/WhoWeAreSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import HomeCTASection from '../components/HomeCTASection';
import GallerySection from '../components/GallerySection';

export default function HomePage() {
  return <div className="page-shell">
    <section className="grid items-center gap-8 border-b border-white/15 pb-12 md:grid-cols-[1fr_auto] md:gap-16 md:pb-16">
      <div>
        <h1 className="page-title max-w-[16ch]">Powerlifting en Nicaragua</h1>
        <p className="page-intro">Federación de Levantamiento de Potencia de Nicaragua. Consulta el calendario y encuentra cómo participar.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/eventos" className="action action-primary">Ver próximas competencias <ArrowRight size={18} aria-hidden /></Link>
          <Link to="/registro" className="action action-secondary">Registrarme como atleta</Link>
        </div>
      </div>
      <img src={`${import.meta.env.BASE_URL}logo2.png`} alt="Escudo de FELPONIC" className="row-start-1 w-28 md:col-start-2 md:row-start-auto md:w-56" fetchPriority="high" />
    </section>
    <UpcomingEventsSection />
    <WhoWeAreSection />
    <GallerySection />
    <HomeCTASection />
  </div>;
}
