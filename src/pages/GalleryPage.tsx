import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import { type Photo } from '../data/publicContent';
import { photos as data } from '../data/galleryData';

export default function GalleryPage() {
  const [selected, setSelected] = useState<Photo | null>(null);
  const albums = [...new Set(data.map(photo => photo.album))];
  return <div className="page-shell">
    <h1 className="page-title">Galería de fotos</h1>
    <p className="page-intro">Imágenes publicadas por FELPONIC.</p>
    {!data.length && <p className="mt-10 text-white/80">Aún no hay álbumes publicados.</p>}
    {albums.map(album => <section className="mt-10" key={album}>
      <h2 className="section-title">{album}</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.filter(photo => photo.album === album).map(photo => <li key={photo.url}>
        <button className="block w-full overflow-hidden rounded-lg text-left" onClick={() => setSelected(photo)} aria-label={`Ampliar foto: ${photo.name}`}>
          <img src={photo.url} alt={photo.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        </button>
      </li>)}</ul>
    </section>)}
    <Dialog open={selected !== null} onClose={() => setSelected(null)} className="relative z-[60]">
      <div className="fixed inset-0 bg-black/90" aria-hidden />
      <div className="fixed inset-0 grid place-items-center overflow-auto p-4">
        <DialogPanel className="w-full max-w-4xl rounded-xl bg-[#101629] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <DialogTitle className="break-all text-white">{selected?.name}</DialogTitle>
            <button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Cerrar foto" className="grid size-11 shrink-0 place-items-center rounded-full text-white hover:bg-white/15"><X aria-hidden /></button>
          </div>
          {selected && <img src={selected.url} alt={selected.name} className="max-h-[72dvh] w-full object-contain" />}
        </DialogPanel>
      </div>
    </Dialog>
  </div>;
}
