import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getMetadata, getStorage, listAll, ref } from 'firebase/storage';
import { app } from '../firebaseConfig';

export type Event = { id: string; title: string; date: string; location: string; description: string; registrationUrl?: string };
export type Photo = { name: string; url: string; album: string; path: string };

export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Managua', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export function isCalendarDate(date: string) {
  const parsed = new Date(date + 'T00:00:00Z');
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export const formatDate = (date: string) => isCalendarDate(date)
  ? new Intl.DateTimeFormat('es-NI', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date + 'T00:00:00Z'))
  : date;

export async function loadEvents(): Promise<Event[]> {
  const snapshot = await getDocs(collection(getFirestore(app), 'events'));
  return snapshot.docs.flatMap(doc => {
    const { title, date, location, description, registrationUrl } = doc.data();
    if (![title, date, location, description].every(value => typeof value === 'string')) return [];
    return [{ id: doc.id, title, date, location, description,
      registrationUrl: typeof registrationUrl === 'string' && /^https:\/\/[^\s]+$/i.test(registrationUrl) ? registrationUrl : undefined }];
  }).sort((a, b) => a.date.localeCompare(b.date));
}

export async function loadPhotos(): Promise<Photo[]> {
  const root = await listAll(ref(getStorage(app), 'gallery'));
  const albums = await Promise.all(root.prefixes.map(async folder => ({ name: folder.name, items: (await listAll(folder)).items })));
  return Promise.all([...albums, { name: 'Fotos de FELPONIC', items: root.items }].flatMap(album =>
    album.items.map(async item => {
      const [url, metadata] = await Promise.all([getDownloadURL(item), getMetadata(item).catch(() => null)]);
      return { name: metadata?.customMetadata?.caption || item.name, url, album: album.name, path: item.fullPath };
    })
  ));
}

export function usePublicContent<T>(load: () => Promise<T[]>) {
  const [state, setState] = useState<{ data: T[]; status: 'loading' | 'ready' | 'error' }>({ data: [], status: 'loading' });
  useEffect(() => {
    let active = true;
    load().then(data => { if (active) setState({ data, status: 'ready' }); })
      .catch(() => { if (active) setState({ data: [], status: 'error' }); });
    return () => { active = false; };
  }, [load]);
  return state;
}
