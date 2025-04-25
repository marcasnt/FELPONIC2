import { useState } from 'react';
import { Check } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: '',
    weight: '',
    experience: '',
    gym: '',
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend
    console.log('Registration form submitted:', formData);
    // Show success message (would be implemented with a proper notification system)
    alert('Registro completado con éxito. Recibirás un correo de confirmación.');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFCC00] text-center">
        Registro
      </h1>
      
      <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl">
        <div className="text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Únete a FELPONIC</h2>
          <p className="text-white/80">
            Completa el siguiente formulario para registrarte como atleta en la Federación de Levantamiento
            de Potencia de Nicaragua. Una vez enviado, nuestro equipo revisará tu información y te contactará
            con los siguientes pasos.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-white mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-white mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
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
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="birthdate" className="block text-white mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-white mb-2">
                Género
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              >
                <option value="" disabled hidden>Selecciona una opción</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-white mb-2">
                Peso Actual (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                min="30"
                max="200"
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-white mb-2">
                Experiencia en Powerlifting
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              >
                <option value="" disabled hidden>Selecciona una opción</option>
                <option value="beginner">Principiante (0-1 año)</option>
                <option value="intermediate">Intermedio (1-3 años)</option>
                <option value="advanced">Avanzado (3-5 años)</option>
                <option value="expert">Experto (5+ años)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="gym" className="block text-white mb-2">
              Gimnasio donde entrenas
            </label>
            <input
              type="text"
              id="gym"
              name="gym"
              value={formData.gym}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-100 focus:outline-none focus:border-[#FFCC00] transition-colors"
              placeholder="Opcional"
            />
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 border border-white/20 rounded focus:ring-[#FFCC00] bg-transparent"
              />
            </div>
            <label htmlFor="acceptTerms" className="ml-3 text-sm text-white/80">
              Acepto los términos y condiciones de FELPONIC y autorizo el uso de mis datos personales de acuerdo con la política de privacidad.
            </label>
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF0000] to-[#FF3300] text-white text-lg font-bold py-3 px-8 rounded-full hover:from-[#FF3300] hover:to-[#FF0000] transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Completar Registro
              <Check size={20} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;