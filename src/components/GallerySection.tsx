import { Link } from 'react-router-dom';
import { loadPhotos, usePublicContent } from '../data/publicContent';

export default function GallerySection() {
  const { data, status } = usePublicContent(loadPhotos);
  return <section className="mt-16">
    <h2 className="section-title">FELPONIC en fotos</h2>
    {status === 'loading' && <p role="status">Cargando fotos…</p>}
    {status === 'error' && <p role="status">La galería no está disponible en este momento.</p>}
    {status === 'ready' && !data.length && <p className="text-white/80">Aún no hay fotos publicadas.</p>}
    {data.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{data.slice(0, 4).map(photo => <img key={photo.url} src={photo.url} alt={photo.name} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />)}</div>}
    <Link className="text-link mt-4 inline-flex min-h-11 items-center" to="/galeria">Ver galería</Link>
  </section>;
}
