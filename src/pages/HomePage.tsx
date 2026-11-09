import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhoWeAreSection from '../components/WhoWeAreSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import HomeCTASection from '../components/HomeCTASection';
import GallerySection from '../components/GallerySection';

export default function HomePage() {
  return <div className="page-shell">
    <section className="home-platform">
      <div className="relative z-10">
        <h1 className="home-headline">Powerlifting<br />en Nicaragua</h1>
        <p className="page-intro max-w-[40ch]">Federación de Levantamiento de Potencia de Nicaragua. Consulta las competencias y descubre cómo participar.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/eventos" className="action action-primary"><CalendarDays size={19} aria-hidden /> Ver calendario</Link>
          <Link to="/registro" className="action action-secondary">Registro de atletas</Link>
        </div>
      </div>
      <div className="platform-emblem">
        <img src={`${import.meta.env.BASE_URL}fenilepo.png`} alt="Escudo de FENILEPO" width="1358" height="1233" className="hero-crest h-auto w-44 md:w-64 lg:w-72" fetchPriority="high" />
      </div>
    </section>
    <UpcomingEventsSection />
    <WhoWeAreSection />
    <GallerySection />
    <HomeCTASection />
  </div>;
}
