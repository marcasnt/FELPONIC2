import { useState } from 'react';
import { formsEnabled, useSubmission } from '../data/useSubmission';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const initialValues = { name: '', email: '', subject: '', message: '' };

const ContactPage = () => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Para CustomSelect
  const handleCustomSelect = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Opciones para el select profesional de asunto
  const subjectOptions = [
    { value: '', label: 'Selecciona un asunto', disabled: true },
    { value: 'Información General', label: 'Información General' },
    { value: 'Membresía', label: 'Membresía' },
    { value: 'Eventos', label: 'Eventos' },
    { value: 'Patrocinios', label: 'Patrocinios' },
    { value: 'Otro', label: 'Otro' }
  ];

  const { pending, feedback, submit } = useSubmission('contact');
  const available = formsEnabled;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (await submit(formData)) setFormData(initialValues);
  };

  return (
    <div className="page-shell">
      <h1 className="page-title mb-8">
        Contacto
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                  <p className="text-white/80">+505 2222-3333</p>
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
          
          {/* Contact Form */}
          <div className="bg-black/30 p-6 md:p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
            
            {available ? <form onSubmit={handleSubmit} aria-busy={pending} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                autoComplete="name"
                maxLength={120}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="field"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                autoComplete="email"
                maxLength={254}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="field"
                />
              </div>
              
              <div>
                <CustomSelect
                  label="Asunto"
                  name="subject"
                  value={formData.subject}
                  onChange={(value) => handleCustomSelect('subject', value)}
                  options={subjectOptions}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  maxLength={4000}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="field"
                ></textarea>
              </div>
              
              <button
                type="submit"
              disabled={pending}
                className="action action-primary"
              >
                {pending ? 'Enviando…' : 'Enviar mensaje'}
                <Send size={18} className="ml-2" />
              </button>
              <div role="status" aria-live="polite" className="text-white/90">{feedback?.message}</div>
        </form> : <p className="text-white/[.85]">El formulario en línea aún no está habilitado. <a className="text-link" href="mailto:info@felponic.org.ni">Escríbenos por correo</a>.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;