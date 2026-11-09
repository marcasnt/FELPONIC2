import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [['/', 'Inicio'], ['/acerca-de', 'Acerca de'], ['/eventos', 'Eventos'], ['/galeria', 'Galería'], ['/contacto', 'Contacto']];
const navClass = ({ isActive }: { isActive: boolean }) => `inline-flex min-h-11 items-center rounded-md px-2 transition-colors duration-150 hover:text-brand-gold ${isActive ? 'font-semibold text-brand-gold' : 'text-white/[.85]'}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="border-b border-white/15 bg-[#090e1c]">
    <nav aria-label="Principal" className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 px-5 py-2 sm:px-8"
      onKeyDown={event => { if (open && event.key === 'Escape') { setOpen(false); event.currentTarget.querySelector('button')?.focus(); } }}>
      <Link to="/" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center gap-2 text-xl font-extrabold tracking-tight text-brand-gold">
        <img src={`${import.meta.env.BASE_URL}logo2.png`} width="34" height="34" className="size-[34px] object-contain" alt="" />
        FELPONIC
      </Link>
      <button type="button" className="grid size-11 place-items-center rounded-lg hover:bg-white/10 md:hidden" onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-controls="site-navigation" aria-expanded={open}>
        {open ? <X aria-hidden /> : <Menu aria-hidden />}
      </button>
      <div id="site-navigation" className={`${open ? 'is-open flex' : 'hidden'} basis-full flex-col gap-1 border-t border-white/15 pb-2 pt-2 md:flex md:basis-auto md:flex-row md:items-center md:border-0 md:p-0`}>
        {links.map(([path, label]) => <NavLink key={path} to={path} end className={navClass} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <NavLink to="/registro" className="action action-primary md:ml-2" onClick={() => setOpen(false)}>Registro</NavLink>
      </div>
    </nav>
  </header>;
}
