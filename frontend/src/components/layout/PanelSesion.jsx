import { useSesion } from '../../context/SesionContext';
import { PREGUNTAS, opcionElegida } from '../../data/preguntas';
import Icono from '../ui/Icono';

// Una fila del panel (componente "Panel / Fila de sesión" en Figma)
function FilaSesion({ estado, icono, titulo, valor, detalle }) {
  return (
    <li className={`fila-sesion fila-sesion--${estado}`} style={{ listStyle: 'none' }}>
      <span className="circulo-icono">
        <Icono nombre={icono} />
      </span>
      <div>
        <div className="fila-sesion__titulo">{titulo}</div>
        <div className="fila-sesion__valor">{valor}</div>
        {detalle && <div className="fila-sesion__detalle">{detalle}</div>}
      </div>
      {estado === 'completado' ? (
        <span className="check-listo" aria-label="Completado">
          <Icono nombre="Check" tamano={16} grosor={2.5} />
        </span>
      ) : (
        <span className="fila-sesion__estado">{estado === 'actual' ? 'En proceso…' : 'Pendiente'}</span>
      )}
    </li>
  );
}

/**
 * Panel derecho "Tu sesión": muestra lo que Krystal sabe del usuario.
 * Es retráctil (botón o atajo Alt + P desde App.jsx).
 */
export default function PanelSesion({ consejo, iconoConsejo = 'Lightbulb', children }) {
  const { paso, preguntaActual, respuestas, archivos, diagnostico, panelOculto, alternarPanel } = useSesion();

  if (panelOculto) {
    return (
      <aside className="panel panel--oculto" aria-label="Tu sesión (oculto)">
        <button className="boton-icono" onClick={alternarPanel} aria-label="Mostrar panel Tu sesión">
          <Icono nombre="PanelRightOpen" tamano={20} />
        </button>
      </aside>
    );
  }

  const [nivel, estilo, mundo, prof] = PREGUNTAS.map((p) => opcionElegida(p, respuestas));
  const perfilCompleto = nivel && estilo && mundo && prof;
  const orden = ['bienvenida', 'perfil', 'carga', 'procesamiento', 'diagnostico', 'estudio'];
  const pos = orden.indexOf(paso);

  const filas = [
    perfilCompleto && paso !== 'perfil'
      ? {
          estado: 'completado', icono: 'User', titulo: 'Tu perfil', valor: nivel.corto,
          detalle: [estilo.corto, mundo.texto, prof.corto].join(' · '),
        }
      : {
          estado: paso === 'perfil' ? 'actual' : 'pendiente', icono: 'User', titulo: 'Tu perfil',
          valor: paso === 'perfil' && preguntaActual < 4 ? `Pregunta ${preguntaActual + 1} de 4` : '4 preguntas rápidas',
          detalle: 'Nivel, estilo, mundo y profundidad',
        },
    archivos.length && pos > 2
      ? {
          estado: 'completado', icono: 'FileText',
          titulo: archivos.length === 1 ? 'Archivo cargado' : `${archivos.length} archivos cargados`,
          valor: archivos[0].nombre,
          detalle: archivos.length > 1 ? `y ${archivos.length - 1} más` : archivos[0].tamano,
        }
      : {
          estado: paso === 'carga' ? 'actual' : 'pendiente', icono: 'FileText', titulo: 'Tus documentos',
          valor: archivos.length
            ? `${archivos.length} ${archivos.length === 1 ? 'archivo listo' : 'archivos listos'}`
            : paso === 'carga' ? 'Esperando tus archivos' : 'Aún sin archivos',
          detalle: 'Hasta 5 archivos · PDF, Markdown o texto',
        },
    pos > 4
      ? {
          estado: 'completado', icono: 'Brain', titulo: 'Diagnóstico',
          valor: diagnostico.saltado ? 'Omitido' : 'Evaluación finalizada', detalle: null,
        }
      : {
          estado: paso === 'diagnostico' || paso === 'procesamiento' ? 'actual' : 'pendiente',
          icono: paso === 'procesamiento' ? 'Layers' : 'Brain',
          titulo: paso === 'procesamiento' ? 'Procesamiento' : 'Diagnóstico',
          valor: paso === 'procesamiento' ? '3 agentes de IA' : paso === 'diagnostico' ? `Pregunta ${diagnostico.actual + 1} de 5` : 'Opcional',
          detalle: paso === 'procesamiento' ? 'Análisis, adaptación y generación' : '5 preguntas sobre tu documento',
        },
    { estado: 'pendiente', icono: 'BookOpen', titulo: 'Tu material', valor: 'Por generar', detalle: 'Resumen, flashcards y quizzes' },
  ];

  return (
    <aside className="panel" aria-label="Tu sesión">
      <div className="panel__encabezado">
        <div>
          <h3>Tu sesión</h3>
          <p>Lo que Krystal sabe de ti</p>
        </div>
        <button className="boton-icono" onClick={alternarPanel} aria-label="Ocultar panel Tu sesión (Alt + P)">
          <Icono nombre="PanelRightClose" tamano={20} />
        </button>
      </div>
      <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {filas.map((f) => (
          <FilaSesion key={f.titulo} {...f} />
        ))}
      </ul>
      {children}
      {consejo && (
        <>
          <div className="panel__separador" />
          <p className="panel__consejo">
            <span className="circulo-icono circulo-icono--sm circulo-icono--neutro">
              <Icono nombre={iconoConsejo} tamano={20} />
            </span>
            <span>{consejo}</span>
          </p>
        </>
      )}
    </aside>
  );
}
