import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return <div className="page-shell">
    <header className="page-header">
      <h1 className="page-title">Registro de atletas</h1>
      <p className="page-intro">Consulta cómo afiliarte a la Federación de Levantamiento de Potencia de Nicaragua.</p>
    </header>
    <section className="info-panel max-w-2xl">
      <h2 className="section-title">Consulta los requisitos de afiliación</h2>
      <p>El registro en línea no está habilitado. Contacta a FELPONIC para confirmar los requisitos y los pasos de afiliación.</p>
      <Link to="/contacto" className="action action-primary mt-5">Ver canales de contacto</Link>
    </section>
  </div>;
}
