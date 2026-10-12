import { useRef, useState } from 'react';
import { useSesion } from '../context/SesionContext';
import { PREGUNTAS, opcionElegida } from '../data/preguntas';
import Plantilla from '../components/layout/Plantilla';
import Boton from '../components/ui/Boton';
import Icono from '../components/ui/Icono';
import TituloDegradado from '../components/ui/TituloDegradado';

const EXTENSIONES = ['.pdf', '.md', '.markdown', '.txt'];
const MAX_MB = 20; // tamaño máximo por archivo
const MAX_ARCHIVOS = 5; // cantidad máxima de archivos

function formatoTamano(bytes) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

export default function Carga() {
  const { archivos, agregarArchivos, quitarArchivo, respuestas, irA, editarRespuesta } = useSesion();
  const [arrastrando, setArrastrando] = useState(false);
  const [errores, setErrores] = useState([]);
  const input = useRef(null);

  // Revisa cada archivo elegido y agrega solo los válidos
  const validar = (lista) => {
    const nuevos = [];
    const problemas = [];
    for (const file of Array.from(lista || [])) {
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      const repetido = [...archivos, ...nuevos].some((a) => a.nombre === file.name && a.file.size === file.size);
      if (!EXTENSIONES.includes(ext)) problemas.push(`"${file.name}": formato no soportado (usa PDF, Markdown o texto).`);
      else if (file.size > MAX_MB * 1024 * 1024) problemas.push(`"${file.name}": supera los ${MAX_MB} MB.`);
      else if (repetido) problemas.push(`"${file.name}" ya está en la lista.`);
      else if (archivos.length + nuevos.length >= MAX_ARCHIVOS) problemas.push(`"${file.name}": máximo ${MAX_ARCHIVOS} archivos.`);
      else nuevos.push({ id: `${file.name}-${file.size}-${Date.now()}`, file, nombre: file.name, tamano: formatoTamano(file.size) });
    }
    setErrores(problemas);
    if (nuevos.length) agregarArchivos(nuevos);
    if (input.current) input.current.value = ''; // permite volver a elegir el mismo archivo
  };

  const totalBytes = archivos.reduce((s, a) => s + a.file.size, 0);

  return (
    <Plantilla consejo="Krystal solo usa el contenido de tus documentos: nada de inventos." iconoConsejo="Sparkles">
      <TituloDegradado antes="Sube tus documentos y empieza a" destacado="estudiar de forma inteligente" />
      <p className="subtitulo">
        Puedes subir varios archivos sobre el mismo tema: Krystal los analiza juntos y genera resúmenes, flashcards y
        quizzes a tu medida.
      </p>

      {/* Zona de carga: arrastrar y soltar o clic (acepta varios archivos) */}
      <div
        className={`zona-carga ${arrastrando ? 'zona-carga--arrastrando' : ''} ${errores.length ? 'zona-carga--error' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setArrastrando(true);
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastrando(false);
          validar(e.dataTransfer.files);
        }}
      >
        <Icono nombre="CloudUpload" tamano={56} grosor={1.5} />
        <h3>{arrastrando ? '¡Suéltalos! Los recibimos aquí' : 'Arrastra y suelta tus archivos aquí'}</h3>
        <p>o selecciónalos desde tu dispositivo</p>
        <small>
          PDF, Markdown (.md) o texto · Hasta {MAX_ARCHIVOS} archivos · Máx. {MAX_MB} MB cada uno
        </small>
        <Boton
          iconoIzq="FileText"
          onClick={() => input.current.click()}
          disabled={archivos.length >= MAX_ARCHIVOS}
        >
          {archivos.length ? 'Agregar más archivos' : 'Seleccionar archivos'}
        </Boton>
        <input
          ref={input}
          type="file"
          multiple
          accept={EXTENSIONES.join(',')}
          hidden
          onChange={(e) => validar(e.target.files)}
        />
        {errores.length > 0 && (
          <ul className="mensaje-error" role="alert" style={{ margin: 0, paddingLeft: 18, textAlign: 'left' }}>
            {errores.map((m) => (
              <li key={m}>⚠ {m}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista de archivos cargados */}
      {archivos.length > 0 && (
        <section className="lista-archivos" aria-label="Archivos cargados">
          <div className="lista-archivos__encabezado" role="status">
            <strong>
              {archivos.length} {archivos.length === 1 ? 'archivo listo' : 'archivos listos'}
            </strong>
            <span>
              {formatoTamano(totalBytes)} en total · {MAX_ARCHIVOS - archivos.length} disponibles
            </span>
          </div>
          {archivos.map((a) => (
            <div key={a.id} className="archivo-cargado">
              <span className="circulo-icono">
                <Icono nombre="FileText" />
              </span>
              <div>
                <strong>{a.nombre}</strong>
                <span>{a.tamano} · ✓ Listo para transformar</span>
              </div>
              <Boton tipo="fantasma" tamano="pequeno" onClick={() => quitarArchivo(a.id)} aria-label={`Quitar ${a.nombre}`}>
                Quitar
              </Boton>
            </div>
          ))}
        </section>
      )}

      {/* Resumen del perfil: cada respuesta se puede cambiar antes de procesar */}
      <section className="tarjeta resumen-perfil resumen-perfil--editable">
        <div className="resumen-perfil__titulo">
          <span className="circulo-icono circulo-icono--neutro">
            <Icono nombre="User" />
          </span>
          <div>
            <strong>Tu perfil de estudio</strong>
            <p className="fila-sesion__detalle">Puedes cambiar cualquier respuesta antes de iniciar.</p>
          </div>
        </div>
        <ul className="respuestas-editables">
          {PREGUNTAS.map((p, i) => {
            const o = opcionElegida(p, respuestas);
            return (
              <li key={p.id}>
                <span className="respuestas-editables__etiqueta">{p.etiquetaPanel}</span>
                <span className="respuestas-editables__valor">{o ? o.corto || o.texto : 'Sin responder'}</span>
                <Boton
                  tipo="secundario"
                  tamano="pequeno"
                  onClick={() => editarRespuesta(i)}
                  aria-label={`Cambiar ${p.etiquetaPanel.toLowerCase()}`}
                >
                  Cambiar
                </Boton>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="fila-accion">
        <Boton iconoDer="ArrowRight" disabled={!archivos.length} onClick={() => irA('procesamiento')}>
          Iniciar procesamiento
        </Boton>
        <span className="ayuda-tecla">
          {archivos.length
            ? 'Al iniciar, tus respuestas y archivos quedan fijos para esta sesión.'
            : 'Se activa cuando subas al menos un archivo'}
        </span>
      </div>
    </Plantilla>
  );
}
