// ============================================================
// ESTADO GLOBAL DE LA SESIÓN
// Aquí vive todo lo que el usuario le ha entregado a Krystal:
// en qué paso va, sus respuestas, sus archivos y el resultado.
// Cualquier componente puede leerlo con: const s = useSesion();
// ============================================================
import { createContext, useContext, useState } from 'react';

const SesionContext = createContext(null);

// Las 5 estaciones de la miga de pan
export const ESTACIONES = [
  { id: 'perfil', nombre: 'Tu perfil' },
  { id: 'carga', nombre: 'Carga' },
  { id: 'procesamiento', nombre: 'Procesamiento' },
  { id: 'diagnostico', nombre: 'Diagnóstico' },
  { id: 'estudio', nombre: 'Estudio' },
];

// Pasos en los que el procesamiento ya arrancó: desde aquí las respuestas
// y los archivos quedan bloqueados (solo se puede reiniciar todo).
const PASOS_BLOQUEADOS = ['procesamiento', 'diagnostico', 'estudio'];

const ESTADO_INICIAL = {
  paso: 'bienvenida', // bienvenida | perfil | carga | procesamiento | diagnostico | estudio
  preguntaActual: 0, // 0 a 3 = preguntas, 4 = cierre "¡Está listo!"
  respuestas: {}, // { nivel, estilo, mundo, profundidad }
  archivos: [], // [{ id, file, nombre, tamano }] — se pueden cargar varios
  editando: false, // true = la persona volvió a cambiar una respuesta desde Carga
  resultado: null, // JSON que devuelve el backend
  diagnostico: { actual: 0, respuestas: [], saltado: false },
};

export function SesionProvider({ children }) {
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const [panelOculto, setPanelOculto] = useState(false);
  const [tema, setTema] = useState('claro');

  const actualizar = (cambios) => setEstado((e) => ({ ...e, ...cambios }));

  const valor = {
    ...estado,
    panelOculto,
    tema,
    irA: (paso) => actualizar({ paso }),
    bloqueado: PASOS_BLOQUEADOS.includes(estado.paso),
    irAPregunta: (n) => actualizar({ paso: 'perfil', preguntaActual: n, editando: false }),
    // Editar una sola respuesta y volver a Carga al guardar
    editarRespuesta: (n) => actualizar({ paso: 'perfil', preguntaActual: n, editando: true }),
    terminarEdicion: () => actualizar({ paso: 'carga', editando: false }),
    responder: (id, valorRespuesta) =>
      setEstado((e) => ({ ...e, respuestas: { ...e.respuestas, [id]: valorRespuesta } })),
    agregarArchivos: (nuevos) => setEstado((e) => ({ ...e, archivos: [...e.archivos, ...nuevos] })),
    quitarArchivo: (id) => setEstado((e) => ({ ...e, archivos: e.archivos.filter((a) => a.id !== id) })),
    setResultado: (resultado) => actualizar({ resultado }),
    setDiagnostico: (diagnostico) => actualizar({ diagnostico }),
    reiniciar: () => setEstado(ESTADO_INICIAL),
    alternarPanel: () => setPanelOculto((v) => !v),
    alternarTema: () => {
      const nuevo = tema === 'claro' ? 'oscuro' : 'claro';
      setTema(nuevo);
      document.documentElement.dataset.theme = nuevo;
    },
  };

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  return useContext(SesionContext);
}

// Índice de la estación activa en la miga de pan
export function indiceEstacion(paso) {
  if (paso === 'bienvenida') return 0;
  return ESTACIONES.findIndex((e) => e.id === paso);
}
