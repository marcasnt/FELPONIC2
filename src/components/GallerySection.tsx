const images = [
  {
    src: 'gallery1.jpg',
    alt: 'Competencia Nacional FELPONIC',
  },
  {
    src: 'gallery2.jpg',
    alt: 'Atletas en acción',
  },
  {
    src: 'gallery3.jpg',
    alt: 'Podio de ganadores',
  },
  {
    src: 'gallery4.jpg',
    alt: 'Entrenamiento en equipo',
  },
];

export default function GallerySection() {
  return (
    <section className="max-w-6xl mx-auto my-16 px-4 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-8 text-center">Galería Destacada</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-white/10 bg-black/30 shadow-md hover:scale-105 transition-transform">
            <img
              src={import.meta.env.BASE_URL + img.src}
              alt={img.alt}
              className="w-full h-40 object-cover object-center"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
