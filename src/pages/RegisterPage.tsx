import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return <div className="page-shell">
    <h1 className="page-title">Registro de atletas</h1>
    <p className="page-intro">El registro en línea no está habilitado. Contacta a FELPONIC para consultar los requisitos y los pasos de afiliación.</p>
    <Link to="/contacto" className="action action-primary mt-6">Contactar a FELPONIC</Link>
  </div>;
}
