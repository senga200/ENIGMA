const rawBase = import.meta.env.VITE_API_URL || '';
// retire / final
const API_BASE = rawBase.replace(/\/$/, '') || (import.meta.env.MODE === 'development' ? 'http://localhost:3003' : '');

export function buildUrl(path) {
  if (!path.startsWith('/')) path = '/' + path;
  return API_BASE ? `${API_BASE}${path}` : path;
}

/**
 * apiFetch: wrapper autour de fetch qui ajoute credentials: include par défaut
 * et permet de centraliser l'URL de base.
 * Retourne l'objet Response (pour gérer nonJSON).
 */
export async function apiFetch(path, options = {}) {
  const url = buildUrl(path);
  const defaultOptions = {
    credentials: 'include'
  };
  const merged = {
    ...defaultOptions,
    ...options
  };
  return fetch(url, merged);
}

/**
 * apiFetchJson: wrapper qui parse le JSON et lève une erreur lisible si status non OK.
 * Retourne null si la réponse n'est pas JSON.
 */
export async function apiFetchJson(path, options = {}) {
  const res = await apiFetch(path, options);
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    let body = null;
    try {
      body = isJson ? await res.json() : await res.text();
    } catch (err) {
      body = null;
    }
    const message = (body && (body.message || body.error)) || `Erreur serveur ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }

  if (isJson) return await res.json();
  return null;
}