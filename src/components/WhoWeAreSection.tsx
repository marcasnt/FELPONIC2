import { Link } from 'react-router-dom';

const principles = [
  ['Misión', 'Formar atletas íntegros, promover valores y elevar el nivel del powerlifting nacional.'],
  ['Visión', 'Ser la federación referente en Centroamérica, reconocida por su excelencia y compromiso con el deporte.'],
  ['Valores', 'Disciplina, respeto, inclusión, trabajo en equipo y pasión por el powerlifting.'],
];

export default function WhoWeAreSection() {
  return <section className="home-section grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-12">
    <div>
      <h2 className="section-title">Quiénes somos</h2>
      <p className="max-w-prose text-white/80">En FELPONIC promovemos el powerlifting y fortalecemos la comunidad del levantamiento de potencia en Nicaragua.</p>
      <Link to="/acerca-de" className="text-link mt-3 inline-flex min-h-11 items-center">Conocer la federación</Link>
    </div>
    <dl className="divide-y divide-white/15">
      {principles.map(([name, description]) => <div key={name} className="grid gap-1 py-3 first:pt-0 sm:grid-cols-[6rem_1fr]">
        <dt className="font-semibold text-brand-gold">{name}</dt>
        <dd className="max-w-prose text-white/80">{description}</dd>
      </div>)}
    </dl>
  </section>;
}
