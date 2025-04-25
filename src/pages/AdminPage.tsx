import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { app } from '../firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from 'firebase/storage';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function AdminPage() {
  type Event = { id: string; title: string; date: string; location: string; description: string };
type GalleryImage = { name: string; url: string };


  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch events
  useEffect(() => {
    if (user) {
      getDocs(collection(db, 'events')).then(snapshot => {
        setEvents(snapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    date: data.date || '',
    location: data.location || '',
    description: data.description || ''
  };
}));
      });
      listAll(ref(storage, 'gallery')).then(res => {
        Promise.all(res.items.map(itemRef =>
          getDownloadURL(itemRef).then(url => ({ name: itemRef.name, url }))
        )).then(setGallery);
      });
    }
  }, [user]);

  // Login
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Error al iniciar sesión');
    }
    setLoading(false);
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Add Event
  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(db, 'events'), eventForm);
    setEventForm({ title: '', date: '', location: '', description: '' });
    // Refresh events
    const snapshot = await getDocs(collection(db, 'events'));
    setEvents(snapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    date: data.date || '',
    location: data.location || '',
    description: data.description || ''
  };
}));
  };

  // Delete Event
  const handleDeleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
    setEvents(events.filter(ev => ev.id !== id));
  };

  // Upload Image
  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) return;
    const storageRef = ref(storage, `gallery/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(storageRef);
    setGallery([...gallery, { name: imageFile.name, url }]);
    setImageFile(null);
  };

  // Delete Image
  const handleDeleteImage = async (name: string) => {
    const imageRef = ref(storage, `gallery/${name}`);
    await deleteObject(imageRef);
    setGallery(gallery.filter(img => img.name !== name));
  };

  if (!user) {
    // Simple login form
    return (
      <div className="max-w-md mx-auto mt-24 bg-black/90 rounded-lg shadow-xl p-8 z-50 relative">
        <h2 className="text-2xl font-bold mb-4">Panel Admin FELPONIC</h2>
        <button onClick={loginWithGoogle} className="bg-blue-600 rounded px-4 py-2 mb-4 w-full">Entrar con Google</button>
        <form onSubmit={e => {
  e.preventDefault();
  const target = e.target as typeof e.target & { email: { value: string }; password: { value: string } };
  loginWithEmail(target.email.value, target.password.value);
}} className="space-y-3">
          <input name="email" type="email" placeholder="Correo" className="w-full px-3 py-2 rounded" required />
          <input name="password" type="password" placeholder="Contraseña" className="w-full px-3 py-2 rounded" required />
          <button type="submit" className="bg-yellow-500 rounded px-4 py-2 w-full" disabled={loading}>Entrar</button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Panel de Administración FELPONIC</h2>
      <button onClick={handleLogout} className="mb-6 bg-red-700 px-4 py-2 rounded">Cerrar sesión</button>
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-2">Eventos</h3>
        <form onSubmit={handleAddEvent} className="flex flex-col md:flex-row gap-2 mb-4">
          <input value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Título" className="px-2 py-1 rounded text-black" required />
          <input value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} placeholder="Fecha" className="px-2 py-1 rounded text-black" required />
          <input value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} placeholder="Lugar" className="px-2 py-1 rounded text-black" required />
          <input value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} placeholder="Descripción" className="px-2 py-1 rounded text-black" required />
          <button type="submit" className="bg-green-700 px-4 py-2 rounded">Agregar</button>
        </form>
        <ul className="space-y-2">
          {events.map(ev => (
            <li key={ev.id} className="flex justify-between items-center bg-black/40 px-3 py-2 rounded">
              <span>{ev.title} - {ev.date} - {ev.location}</span>
              <button onClick={() => handleDeleteEvent(ev.id)} className="bg-red-600 px-2 py-1 rounded">Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Galería</h3>
        <form onSubmit={handleUploadImage} className="flex gap-2 mb-4">
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} className="text-black" required />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Subir Imagen</button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map(img => (
            <div key={img.name} className="relative">
              <img src={img.url} alt={img.name} className="w-full h-32 object-cover rounded" />
              <button onClick={() => handleDeleteImage(img.name)} className="absolute top-1 right-1 bg-black/70 text-xs px-2 py-1 rounded">Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
