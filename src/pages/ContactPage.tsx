import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return <div className="page-shell">
    <header className="page-header">
      <h1 className="page-title">Contacto</h1>
      <p className="page-intro">Consulta con FENILEPO sobre afiliación, competencias y actividades de la federación.</p>
    </header>
    <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
      <section className="info-panel">
        <h2 className="section-title">Canales de atención</h2>
        <div className="divide-y divide-white/15">
          <div className="flex gap-3 pb-4">
            <Mail className="mt-1 shrink-0 text-brand-gold" size={20} aria-hidden />
            <div className="min-w-0">
              <h3 className="font-semibold">Correo electrónico</h3>
              <a className="text-link flex min-h-11 items-center break-all" href="mailto:info@felponic.org.ni">info@felponic.org.ni</a>
              <a className="text-link flex min-h-11 items-center break-all" href="mailto:contacto@felponic.org.ni">contacto@felponic.org.ni</a>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Phone className="mt-1 shrink-0 text-brand-gold" size={20} aria-hidden />
            <div>
              <h3 className="font-semibold">Teléfono</h3>
              <a className="text-link flex min-h-11 items-center" href="tel:+50522223333">+505 2222-3333</a>
              <p>WhatsApp: +505 8888-9999</p>
            </div>
          </div>
        </div>
      </section>
      <section className="info-panel">
        <h2 className="section-title">Dirección y horario</h2>
        <p className="flex items-start gap-2"><MapPin size={20} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden /> Av. Bolívar, Edificio Central Deportivo, Managua, Nicaragua</p>
        <dl className="mt-4 divide-y divide-white/15 text-sm">
          {[['Lunes a viernes', '8:00 a. m. a 5:00 p. m.'], ['Sábado', '9:00 a. m. a 1:00 p. m.'], ['Domingo', 'Cerrado']].map(([day, hours]) =>
            <div key={day} className="flex flex-wrap justify-between gap-x-3 gap-y-1 py-3"><dt className="font-semibold">{day}</dt><dd className="text-white/80">{hours}</dd></div>
          )}
        </dl>
      </section>
    </div>
  </div>;
}
