import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="page-shell">
      <h1 className="page-title mb-8">
        Contacto
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          {/* Contact Information */}
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="text-[#FF0000] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Dirección</h3>
                  <p className="text-white/80">
                    Av. Bolívar, Edificio Central Deportivo<br />
                    Managua, Nicaragua
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={24} className="text-[#FF0000] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Teléfono</h3>
                  <p className="text-white/80"><a className="text-link" href="tel:+50522223333">+505 2222-3333</a></p>
                  <p className="text-white/80">+505 8888-9999 (WhatsApp)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={24} className="text-[#FF0000] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-white/80"><a className="text-link" href="mailto:info@felponic.org.ni">info@felponic.org.ni</a></p>
                  <p className="text-white/80"><a className="text-link" href="mailto:contacto@felponic.org.ni">contacto@felponic.org.ni</a></p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
              <ul className="space-y-2 text-white/80">
                <li>Lunes a Viernes: 8:00 AM - 5:00 PM</li>
                <li>Sábados: 9:00 AM - 1:00 PM</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
