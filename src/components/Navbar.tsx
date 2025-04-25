import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Acerca de', path: '/acerca-de' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Galería de Fotos', path: '/galeria' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="relative z-50 py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-[#FF0000] font-extrabold text-3xl md:text-4xl tracking-wider leading-tight"
          style={{
            fontFamily: 'Arial Black, Impact, sans-serif',
            WebkitTextStroke: '1px #FF0000',
            textShadow: '3px 0 1px #FFCC00'
            // El stroke refuerza el peso visual, la sombra está más cerca

          }}
        >
          FELPONIC
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-white hover:text-[#FFCC00] transition-colors duration-300 ${
                isActive(link.path) ? 'text-[#FFCC00]' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/registro"
            className="bg-gradient-to-r from-[#FF0000] to-[#FF3300] text-white px-6 py-2 rounded-full hover:from-[#FF3300] hover:to-[#FF0000] transition-all duration-300 font-semibold"
            aria-label="Registro de atletas"
          >
            Registro
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm z-50">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white hover:text-[#FFCC00] transition-colors py-2 ${
                  isActive(link.path) ? 'text-[#FFCC00]' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/registro"
              className="bg-gradient-to-r from-[#FF0000] to-[#FF3300] text-white px-6 py-2 rounded-full text-center hover:from-[#FF3300] hover:to-[#FF0000] transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Registro de atletas"
            >
              Registro
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;