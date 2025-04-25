import { useState } from 'react';
import { X } from 'lucide-react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Example gallery images - in a real implementation, these would be from your own server
  const galleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Powerlifter haciendo sentadillas"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Atleta levantando pesas"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/6456209/pexels-photo-6456209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Competición de powerlifting"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Entrenamiento con pesas"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Atleta de powerlifting"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/6550851/pexels-photo-6550851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Entrenamiento de fuerza"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Competición de levantamiento"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/949129/pexels-photo-949129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Entrenamiento de powerlifting"
    }
  ];

  const openImage = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFCC00] text-center">
        Galería de Fotos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div 
            key={image.id} 
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
            onClick={() => openImage(image.src)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center px-4">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <button 
            className="absolute top-4 right-4 bg-[#FF0000] rounded-full p-2 text-white hover:bg-[#FF3300] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeImage();
            }}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;