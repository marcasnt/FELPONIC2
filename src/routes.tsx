import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';

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
        </Route>
      </Routes>
    </HashRouter>
  );
}
