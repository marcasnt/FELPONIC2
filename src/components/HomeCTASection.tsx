import { Link } from 'react-router-dom';

export default function HomeCTASection() {
  return (
    <section className="max-w-4xl mx-auto my-16 px-4 text-center animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-4">¡Forma parte de FELPONIC!</h2>
      <p className="text-white/90 text-lg mb-8">Únete a la comunidad más fuerte de Nicaragua. Regístrate o contáctanos para más información.</p>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link to="/registro" className="scroll-top-link bg-[#FF0000] hover:bg-[#FF3300] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300">Registrarme</Link>
        <Link to="/contacto" className="scroll-top-link border border-[#FFCC00] text-[#FFCC00] font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-[#FFCC00] hover:text-black transition-all duration-300">Contáctanos</Link>
      </div>
    </section>
  );
}
