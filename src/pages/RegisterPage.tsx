import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formsEnabled, registrationPolicy, useSubmission } from '../data/useSubmission';
import { Check } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const initialValues = { firstName: '', lastName: '', email: '', phone: '', birthdate: '', gender: '', weight: '', experience: '', gym: '', acceptTerms: false };

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Para CustomSelect
  const handleCustomSelect = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Opciones para los selects profesionales
  const genderOptions = [
    { value: '', label: 'Selecciona una opción', disabled: true },
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' }
  ];
  const experienceOptions = [
    { value: '', label: 'Selecciona una opción', disabled: true },
    { value: 'beginner', label: 'Principiante (0-1 año)' },
    { value: 'intermediate', label: 'Intermedio (1-3 años)' },
    { value: 'advanced', label: 'Avanzado (3-5 años)' },
    { value: 'expert', label: 'Experto (5+ años)' }
  ];

  const { pending, feedback, submit } = useSubmission('registration');
  const available = formsEnabled && Boolean(registrationPolicy);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (await submit(formData)) setFormData(initialValues);
  };

  return (
    <div className="page-shell">
      <h1 className="page-title mb-8">
        Registro
      </h1>
      
      <div className="max-w-4xl mx-auto bg-black/30 p-6 md:p-8 rounded-xl">
        <div className="text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Únete a FELPONIC</h2>
          <p className="text-white/80">
            Completa el siguiente formulario para registrarte como atleta en la Federación de Levantamiento
            de Potencia de Nicaragua. La solicitud se enviará a la federación para su revisión.
          </p>
        </div>
        
        {available ? <form onSubmit={handleSubmit} aria-busy={pending} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-white mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                autoComplete="given-name"
                maxLength={80}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="field"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-white mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                autoComplete="family-name"
                maxLength={80}
                name="lastName"
                value={formData.lastName}
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
              <label htmlFor="phone" className="block text-white mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                autoComplete="tel"
                maxLength={40}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="field"
              />
            </div>
            
            <div>
              <label htmlFor="birthdate" className="block text-white mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="birthdate"
                autoComplete="bday"
                min="1900-01-01"
                max={new Date().toISOString().slice(0, 10)}
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                className="field"
              />
            </div>
            
            <div>
              <CustomSelect
                label="Género"
                name="gender"
                value={formData.gender}
                onChange={(value) => handleCustomSelect('gender', value)}
                options={genderOptions}
                required
              />
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
                min="0.01"
                max="500"
                step="0.01"
                className="field"
              />
            </div>
            
            <div>
              <CustomSelect
                label="Experiencia en Powerlifting"
                name="experience"
                value={formData.experience}
                onChange={(value) => handleCustomSelect('experience', value)}
                options={experienceOptions}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="gym" className="block text-white mb-2">
              Gimnasio donde entrenas
            </label>
            <input
              type="text"
              id="gym"
                autoComplete="organization"
                maxLength={120}
              name="gym"
              value={formData.gym}
              onChange={handleChange}
              className="field"
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
              He leído las <a className="text-link" href={registrationPolicy}>condiciones y el aviso de privacidad</a> y acepto el tratamiento de mis datos para esta solicitud.
            </label>
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={pending}
              className="action action-primary"
            >
              {pending ? 'Enviando…' : 'Enviar solicitud'}
              <Check size={20} className="ml-2" />
            </button>
          </div>
          <div role="status" aria-live="polite" className="text-white/90">{feedback?.message}</div>
        </form> : <p className="text-white/[.85]">El registro en línea aún no está habilitado. <Link to="/contacto" className="text-link">Consulta los pasos con FELPONIC</Link>.</p>}
      </div>
    </div>
  );
};

export default RegisterPage;