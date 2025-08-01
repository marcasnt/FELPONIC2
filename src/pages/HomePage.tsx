import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhoWeAreSection from '../components/WhoWeAreSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import HomeCTASection from '../components/HomeCTASection';
import { useEffect } from 'react';
import GallerySection from '../components/GallerySection';

const scrollToTopOnNavigate = () => {
  useEffect(() => {
    const handleClick = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    };
    const btns = document.querySelectorAll('.scroll-top-link');
    btns.forEach(btn => btn.addEventListener('click', handleClick));
    return () => btns.forEach(btn => btn.removeEventListener('click', handleClick));
  }, []);
};

const HomePage = () => {
  scrollToTopOnNavigate();
  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Logo Hero */}
        <div className="w-64 md:w-96 mb-12 animate-fadeIn">
          <img
            src={`${import.meta.env.BASE_URL}logo2.png`}
            alt="FELPONIC - Federación de Levantamiento de Potencia de Nicaragua"
            className="w-full h-auto animate-slideUp"
            style={{maxWidth: '320px', margin: '0 auto'}}
          />
        </div>

        {/* Welcome Text */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#FFCC00] animate-slideUp">
          ¡Bienvenido a FELPONIC!
        </h1>
        
        {/* Federation Name */}
        <p className="text-white text-xl md:text-2xl mb-12 max-w-3xl animate-slideUp animation-delay-200">
          Federación de Levantamiento de Potencia de Nicaragua
        </p>
        
        {/* Call to Action Button */}
        <Link 
          to="/registro" 
          className="scroll-top-link group bg-[#FF0000] hover:bg-[#FF3300] text-white text-xl font-bold py-4 px-16 rounded-full transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-400 flex items-center"
        >
          Únete Ahora
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      {/* Secciones adicionales */}
      <div className="mt-64 md:mt-80">
        <WhoWeAreSection />
        <UpcomingEventsSection />
        <HomeCTASection />
        <GallerySection />
      </div>
    </div>
  );
};

export default HomePage;
