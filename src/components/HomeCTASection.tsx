import { Link } from 'react-router-dom';

export default function HomeCTASection() {
  return (
    <section className="home-section">
      <h2 className="section-title">¡Forma parte de FENILEPO!</h2>
      <p className="text-white/90 text-lg mb-8">Consulta los pasos para registrarte como atleta o comunícate con la federación.</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/registro" className="action action-primary">Registrarme</Link>
        <Link to="/contacto" className="action action-secondary">Contáctanos</Link>
      </div>
    </section>
  );
}
