import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { createHash } from 'node:crypto';

const fields = {
  contact: { name: 120, email: 254, subject: 80, message: 4000 },
  registration: { firstName: 80, lastName: 80, email: 254, phone: 40, birthdate: 10, gender: 12, weight: 6, experience: 20, gym: 120 },
};
const collections = { contact: 'privateContactMessages', registration: 'privateAthleteApplications' };
const subjects = ['Información General', 'Membresía', 'Eventos', 'Patrocinios', 'Otro'];

function parseData(kind, data) {
  if (!data || typeof data !== 'object') return null;
  const clean = {};
  for (const [key, max] of Object.entries(fields[kind])) {
    if (typeof data[key] !== 'string') return null;
    clean[key] = data[key].trim();
    if (clean[key].length > max || (!clean[key] && key !== 'gym')) return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return null;
  if (kind === 'contact') return subjects.includes(clean.subject) ? clean : null;

  const birthday = new Date(clean.birthdate + 'T00:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.birthdate) || !Number.isFinite(birthday.getTime()) ||
      birthday.toISOString().slice(0, 10) !== clean.birthdate || birthday > new Date() || clean.birthdate < '1900-01-01' ||
      !['male', 'female', 'other'].includes(clean.gender) ||
      !['beginner', 'intermediate', 'advanced', 'expert'].includes(clean.experience) ||
      !/^\d+(\.\d{1,2})?$/.test(clean.weight) || Number(clean.weight) <= 0 || Number(clean.weight) > 500 ||
      data.acceptTerms !== true) return null;
  return { ...clean, weight: Number(clean.weight), acceptTerms: true };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ ok: false });
  const { kind, data, requestId } = req.body ?? {};
  if (typeof kind !== 'string' || !Object.hasOwn(fields, kind) || typeof requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId)) {
    return res.status(400).json({ ok: false });
  }
  const clean = parseData(kind, data);
  if (!clean) return res.status(400).json({ ok: false });
  const credentials = process.env.FELPONIC_FIREBASE_SERVICE_ACCOUNT;
  if (!credentials || process.env.VITE_FORMS_ENABLED !== 'true' ||
      (kind === 'registration' && !process.env.VITE_REGISTRATION_POLICY_URL?.startsWith('https://'))) {
    return res.status(503).json({ ok: false });
  }
  try {
    const app = getApps()[0] ?? initializeApp({ credential: cert(JSON.parse(credentials)) });
    const document = getFirestore(app).collection(collections[kind]).doc(requestId);
    const fingerprint = createHash('sha256').update(JSON.stringify(clean)).digest('hex');
    try {
      await document.create({ ...clean, fingerprint, createdAt: FieldValue.serverTimestamp() });
      return res.status(201).json({ ok: true });
    } catch (error) {
      if (error?.code !== 6) throw error;
      const existing = await document.get();
      const matches = existing.get('fingerprint') === fingerprint;
      return res.status(matches ? 200 : 409).json({ ok: matches });
    }
  } catch {
    return res.status(503).json({ ok: false });
  }
}
