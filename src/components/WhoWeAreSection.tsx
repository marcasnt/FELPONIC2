export default function WhoWeAreSection() {
  return (
    <section className="max-w-5xl mx-auto my-16 px-4 text-center animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-4">¿Quiénes Somos?</h2>
      <p className="text-white/90 text-lg mb-2">
        En FELPONIC, promovemos el powerlifting y el desarrollo deportivo en Nicaragua. Nuestra misión es impulsar atletas, fomentar la inclusión y fortalecer la comunidad del levantamiento de potencia.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
        <div className="bg-black/30 border border-white/10 rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold text-[#FFCC00] mb-2">Misión</h3>
          <p className="text-white/80">Formar atletas íntegros, promover valores y elevar el nivel del powerlifting nacional.</p>
        </div>
        <div className="bg-black/30 border border-white/10 rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold text-[#FFCC00] mb-2">Visión</h3>
          <p className="text-white/80">Ser la federación referente en Centroamérica, reconocida por su excelencia y compromiso con el deporte.</p>
        </div>
        <div className="bg-black/30 border border-white/10 rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold text-[#FFCC00] mb-2">Valores</h3>
          <p className="text-white/80">Disciplina, respeto, inclusión, trabajo en equipo y pasión por el powerlifting.</p>
        </div>
      </div>
    </section>
  );
}
