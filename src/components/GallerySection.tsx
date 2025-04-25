import { galleryImages } from '../data/galleryData';

export default function GallerySection() {
  return (
    <section className="max-w-6xl mx-auto my-16 px-4 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-8 text-center">Galería Destacada</h2>
      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryImages.map((img) => (
            <div key={img.id} className="rounded-lg overflow-hidden border border-white/10 bg-black/30 shadow-md hover:scale-105 transition-transform">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-40 object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white/60 text-center">No hay imágenes para mostrar.</div>
      )}
    </section>
  );
}
