import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080b14] via-[#0d1528] to-[#080b14]">
      <a href="#main-content" onClick={event => { event.preventDefault(); main.current?.focus(); }} className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-black focus:p-3">Saltar al contenido</a>
      <Navbar />
      <main ref={main} id="main-content" tabIndex={-1} className="min-h-[55vh] focus:outline-none"><Outlet /></main>
      <Footer />
    </div>
  );
}
