import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message (would be implemented with a proper notification system)
    alert('Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFCC00] text-center">
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
                  <p className="text-white/80">info@felponic.org.ni</p>
                  <p className="text-white/80">contacto@felponic.org.ni</p>
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
          <div className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white mb-2">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFCC00] transition-colors"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="Información General">Información General</option>
                  <option value="Membresía">Membresía</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Patrocinios">Patrocinios</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFCC00] transition-colors resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF0000] to-[#FF3300] text-white font-bold py-3 px-6 rounded hover:from-[#FF3300] hover:to-[#FF0000] transition-all duration-300 flex items-center justify-center"
              >
                Enviar Mensaje
                <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;