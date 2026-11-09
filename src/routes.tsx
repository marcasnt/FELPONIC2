import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="acerca-de" element={<AboutPage />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="galeria" element={<GalleryPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="registro" element={<RegisterPage />} />
        <Route path="admin" element={<Suspense fallback={<p className="page-shell" role="status">Cargando panel…</p>}><AdminPage /></Suspense>} />
          <Route path="*" element={<div className="page-shell"><h1 className="page-title">Página no encontrada</h1><Link className="text-link mt-5 inline-block" to="/">Volver al inicio</Link></div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
