// ============================================================
// SERVICIO DE API
// Hoy simula la respuesta. Cuando tengas el backend (por ejemplo
// FastAPI en http://localhost:8000), cambia USAR_DEMO a false.
// ============================================================
import { RESULTADO_DEMO } from '../data/contenidoDemo';

const USAR_DEMO = true;
const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Envía los documentos y el perfil al backend para generar el material.
 * @param {File[]} archivos  Uno o varios documentos PDF, Markdown o texto
 * @param {object} perfil  { perfil_destinatario, formato_salida, nicho_sector, nivel_detalle }
 */
export async function procesarDocumento(archivos, perfil) {
  if (USAR_DEMO) {
    await new Promise((r) => setTimeout(r, 600));
    return RESULTADO_DEMO;
  }

  const datos = new FormData();
  archivos.forEach((archivo) => datos.append('archivos', archivo)); // varios archivos con la misma clave
  Object.entries(perfil).forEach(([clave, valor]) => datos.append(clave, valor));

  const respuesta = await fetch(`${URL_API}/adaptar`, { method: 'POST', body: datos });
  if (!respuesta.ok) throw new Error('No pudimos procesar tu documento. Intenta de nuevo.');
  return respuesta.json();
}
