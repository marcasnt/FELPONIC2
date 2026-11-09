import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/70 border-t border-white/10 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Logo y breve */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={import.meta.env.BASE_URL + 'fenilepo.png'} alt="Escudo de FENILEPO" width="1358" height="1233" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-[#FFCC00]">FELPONIC</span>
          </div>
          <p className="text-gray-400 text-sm">
            Federación de Levantamiento de Potencia de Nicaragua. Promoviendo el powerlifting y el desarrollo deportivo en el país.
          </p>
        </div>
        {/* Columna 2: Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFCC00]">Contacto</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><MapPin size={16} /> Managua, Nicaragua</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +505 2222-3333</li>
            <li className="flex items-center gap-2"><Mail size={16} /> info@felponic.org.ni</li>
          </ul>
        </div>
        {/* Columna 3: Enlaces rápidos y redes */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFCC00]">Enlaces Rápidos</h3>
          <ul className="text-sm space-y-2 mb-4">
            <li><Link to="/" className="inline-flex min-h-11 items-center hover:text-brand-gold">Inicio</Link></li>
            <li><Link to="/registro" className="inline-flex min-h-11 items-center hover:text-brand-gold">Registro</Link></li>
            <li><Link to="/contacto" className="inline-flex min-h-11 items-center hover:text-brand-gold">Contacto</Link></li>
            </ul>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/felponic/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-md hover:text-brand-gold"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/felponic/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-md hover:text-brand-gold"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@felponic" aria-label="Youtube" target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-md hover:text-brand-gold"><Youtube size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-white/70 py-4 border-t border-white/10">
        &copy; {new Date().getFullYear()} FELPONIC. Todos los derechos reservados.
      </div>
    </footer>
  );
}
