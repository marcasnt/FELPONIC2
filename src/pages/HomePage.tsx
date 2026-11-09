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
        <svg className="platform-bar" viewBox="0 0 460 230" fill="none" aria-hidden="true">
          <path d="M8 115h444" stroke="currentColor" strokeWidth="3" />
          <path d="M49 64v102m12-121v140m15-156v172m335-137v102m-12-121v140m-15-156v172" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M98 115h264" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
        </svg>
        <img src={`${import.meta.env.BASE_URL}logo2.png`} alt="Escudo de FELPONIC" className="relative w-[48%] max-w-60" fetchPriority="high" />
      </div>
    </section>
    <UpcomingEventsSection />
    <WhoWeAreSection />
    <GallerySection />
    <HomeCTASection />
  </div>;
}
