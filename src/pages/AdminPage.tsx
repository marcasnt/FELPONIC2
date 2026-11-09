import { useEffect, useState, type FormEvent } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../firebaseConfig';
import { formatDate, loadEvents, loadPhotos, type Event, type Photo } from '../data/publicContent';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const emptyEvent = { title: '', date: '', location: '', description: '', registrationUrl: '' };

export default function AdminPage() {
  const [user, setUser] = useState<User | null>();
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [draft, setDraft] = useState(emptyEvent);
  const [editing, setEditing] = useState<string>();
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState('');
  const [remove, setRemove] = useState<{ label: string; run: () => Promise<void> }>();

  useEffect(() => onAuthStateChanged(auth, setUser), []);
  useEffect(() => {
    if (!user) return;
    let active = true;
    loadEvents().then(items => { if (active) setEvents(items); }).catch(() => { if (active) setNotice('No pudimos cargar las competencias.'); });
    loadPhotos().then(items => { if (active) setPhotos(items); }).catch(() => { if (active) setNotice('No pudimos cargar las fotos.'); });
    return () => { active = false; };
  }, [user]);

  async function run(action: () => Promise<void>, message = '') {
    if (pending) return;
    setPending(true);
    setNotice('');
    try {
      await action();
      setNotice(message);
    } catch {
      setNotice('La operación no se pudo completar. Revisa tu conexión y tus permisos antes de reintentar.');
    } finally {
      setPending(false);
    }
  }

  function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.registrationUrl && !/^https:\/\/\S+$/i.test(draft.registrationUrl)) {
      setNotice('El enlace de inscripción debe comenzar con https://.');
      return;
    }
    void run(async () => {
      const data = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])) as typeof draft;
      const id = editing ?? (await addDoc(collection(db, 'events'), data)).id;
      if (editing) await updateDoc(doc(db, 'events', editing), data);
      setEvents(items => [...items.filter(item => item.id !== id), { ...data, id }].sort((a, b) => a.date.localeCompare(b.date)));
      setEditing(undefined);
      setDraft(emptyEvent);
    }, 'Competencia guardada.');
  }

  function uploadPhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get('photo');
    const album = String(data.get('album')).trim();
    const caption = String(data.get('caption')).trim();
    if (!(file instanceof File) || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
        file.size > 8 * 1024 * 1024 || !album || !caption || /[/\\]/.test(album) || /^\.+$/.test(album)) {
      setNotice('Indica un álbum y una descripción. Usa una foto JPG, PNG o WebP de hasta 8 MB.');
      return;
    }
    void run(async () => {
      const extension = file.type.split('/')[1];
      await uploadBytes(ref(storage, `gallery/${album}/${crypto.randomUUID()}.${extension}`), file, {
        contentType: file.type, customMetadata: { caption },
      });
      form.reset();
      try { setPhotos(await loadPhotos()); } catch { setNotice('La foto se publicó. Recarga para ver la lista actualizada.'); }
    });
  }

  const feedback = <p role="status" className="my-4 text-white/[.85]">{notice}</p>;
  if (user === undefined) return <p className="page-shell" role="status">Comprobando sesión…</p>;
  if (!user) return <div className="page-shell">
    <h1 className="page-title">Administración</h1>
    <p className="page-intro">Acceso para el equipo de FELPONIC.</p>
    <div className="mt-8 max-w-md space-y-5">
      <button type="button" className="action action-secondary" disabled={pending} onClick={() => void run(() => signInWithPopup(auth, new GoogleAuthProvider()).then(() => undefined))}>Entrar con Google</button>
      <form className="space-y-4" onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        void run(() => signInWithEmailAndPassword(auth, String(data.get('email')), String(data.get('password'))).then(() => undefined));
      }}>
        <label className="block space-y-2"><span>Correo electrónico</span><input name="email" type="email" autoComplete="username" required className="field" /></label>
        <label className="block space-y-2"><span>Contraseña</span><input name="password" type="password" autoComplete="current-password" required className="field" /></label>
        <button className="action action-primary" disabled={pending}>Entrar</button>
      </form>
      {feedback}
    </div>
  </div>;

  return <div className="page-shell">
    <div className="flex flex-wrap items-start justify-between gap-4"><h1 className="page-title">Administración</h1>
      <button type="button" className="action action-secondary" disabled={pending} onClick={() => void run(async () => { await signOut(auth); setEvents([]); setPhotos([]); setRemove(undefined); setEditing(undefined); setDraft(emptyEvent); })}>Cerrar sesión</button>
    </div>
    {feedback}
    {remove && <div role="group" aria-label="Confirmar eliminación" className="my-5 flex flex-wrap items-center gap-3 rounded-lg border border-white/25 p-4">
      <p>¿Eliminar {remove.label}?</p>
      <button type="button" className="action action-primary" disabled={pending} onClick={() => void run(async () => { await remove.run(); setRemove(undefined); }, 'Elemento eliminado.')}>Eliminar</button>
      <button type="button" className="action action-secondary" disabled={pending} onClick={() => setRemove(undefined)}>Cancelar</button>
    </div>}
    <section className="mt-8">
      <h2 className="section-title">Competencias</h2>
      <form onSubmit={saveEvent} className="grid max-w-3xl gap-4 sm:grid-cols-2">
        {([['title', 'Nombre de la competencia', 'text'], ['date', 'Fecha', 'date'], ['location', 'Lugar', 'text'], ['registrationUrl', 'Enlace de inscripción (opcional)', 'url']] as const).map(([key, label, type]) =>
          <label key={key} className="block space-y-2"><span>{label}</span><input type={type} value={draft[key]} onChange={event => setDraft({ ...draft, [key]: event.target.value })} className="field" required={key !== 'registrationUrl'} /></label>)}
        <label className="block space-y-2 sm:col-span-2"><span>Descripción</span><textarea className="field" value={draft.description} required onChange={event => setDraft({ ...draft, description: event.target.value })} /></label>
        <div className="flex flex-wrap gap-2"><button className="action action-primary" disabled={pending}>{editing ? 'Guardar cambios' : 'Publicar competencia'}</button>
          {editing && <button type="button" className="action action-secondary" onClick={() => { setEditing(undefined); setDraft(emptyEvent); }}>Cancelar</button>}
        </div>
      </form>
      <ul className="mt-5 divide-y divide-white/15">{events.map(item => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
        <span className="break-words">{item.title} · {formatDate(item.date)}</span>
        <div className="flex gap-2"><button type="button" className="action action-secondary" onClick={() => {
          setEditing(item.id);
          setDraft({ title: item.title, date: /^\d{4}-\d{2}-\d{2}$/.test(item.date) ? item.date : '', location: item.location, description: item.description, registrationUrl: item.registrationUrl ?? '' });
        }}>Editar</button>
        <button type="button" className="action" onClick={() => setRemove({ label: item.title, run: async () => {
          await deleteDoc(doc(db, 'events', item.id)); setEvents(items => items.filter(event => event.id !== item.id));
        } })}>Eliminar</button></div>
      </li>)}</ul>
    </section>
    <section className="mt-12 border-t border-white/15 pt-8">
      <h2 className="section-title">Galería</h2>
      <form onSubmit={uploadPhoto} className="grid max-w-3xl gap-4 sm:grid-cols-2">
        <label className="block space-y-2"><span>Álbum</span><input className="field" name="album" maxLength={100} required placeholder="Nombre de la competencia" /></label>
        <label className="block space-y-2"><span>Descripción de la foto</span><input className="field" name="caption" maxLength={180} required /></label>
        <label className="block space-y-2"><span>Foto (JPG, PNG o WebP)</span><input className="field" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
        <div className="self-end"><button className="action action-primary" disabled={pending}>Publicar foto</button></div>
      </form>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{photos.map(photo => <li key={photo.path} className="min-w-0">
        <img src={photo.url} alt={photo.name} loading="lazy" className="aspect-video w-full rounded-lg object-cover" />
        <p className="mt-2 break-words">{photo.album} · {photo.name}</p>
        <button type="button" className="action" onClick={() => setRemove({ label: photo.name, run: async () => {
          await deleteObject(ref(storage, photo.path)); setPhotos(items => items.filter(item => item.path !== photo.path));
        } })}>Eliminar foto</button>
      </li>)}</ul>
    </section>
  </div>;
}
