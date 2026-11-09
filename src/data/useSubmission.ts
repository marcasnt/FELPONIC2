import { useRef, useState } from 'react';

const policyUrl = import.meta.env.VITE_REGISTRATION_POLICY_URL as string | undefined;
export const registrationPolicy = policyUrl?.startsWith('https://') ? policyUrl : undefined;
export const formsEnabled = import.meta.env.VITE_FORMS_ENABLED === 'true' && import.meta.env.BASE_URL === '/';

export function useSubmission(kind: 'contact' | 'registration') {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'error' | 'success'; message: string }>();
  const inFlight = useRef(false);
  const lastAttempt = useRef<{ data: string; id: string }>();

  async function submit(data: object) {
    if (inFlight.current || !formsEnabled || (kind === 'registration' && !registrationPolicy)) return false;
    inFlight.current = true;
    setPending(true);
    setFeedback(undefined);
    const snapshot = JSON.stringify(data);
    if (lastAttempt.current?.data !== snapshot) lastAttempt.current = { data: snapshot, id: crypto.randomUUID() };
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, data, requestId: lastAttempt.current.id }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok || (await response.json()).ok !== true) {
        setFeedback({ kind: 'error', message: response.status === 400
          ? 'Revisa los datos del formulario e inténtalo de nuevo.'
          : 'No pudimos confirmar el envío. Tus datos siguen aquí para que puedas reintentar.' });
        return false;
      }
      lastAttempt.current = undefined;
      setFeedback({ kind: 'success', message: kind === 'registration' ? 'Recibimos tu solicitud de registro.' : 'Recibimos tu mensaje.' });
      return true;
    } catch {
      setFeedback({ kind: 'error', message: 'No pudimos confirmar el envío. Revisa tu conexión e inténtalo de nuevo.' });
      return false;
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  return { pending, feedback, submit };
}
