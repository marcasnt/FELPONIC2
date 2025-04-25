import { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { app } from '../firebaseConfig';

export default function GallerySection() {
  const [gallery, setGallery] = useState<{ name: string; url: string }[]>([]);
  useEffect(() => {
    const fetchGallery = async () => {
      const storage = getStorage(app);
      const galleryRef = ref(storage, 'gallery');
      const res = await listAll(galleryRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => ({
          name: itemRef.name,
          url: await getDownloadURL(itemRef)
        }))
      );
      setGallery(urls);
    };
    fetchGallery();
  }, []);
  return (
    <section className="max-w-6xl mx-auto my-16 px-4 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-8 text-center">Galería Destacada</h2>
      {gallery.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gallery.map((img: { name: string; url: string }) => (
            <div key={img.name} className="rounded-lg overflow-hidden border border-white/10 bg-black/30 shadow-md hover:scale-105 transition-transform">
              <img
                src={img.url}
                alt={img.name}
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
