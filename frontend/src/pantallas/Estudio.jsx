import { useState } from 'react';
import { useSesion } from '../context/SesionContext';
import { PREGUNTAS, opcionElegida } from '../data/preguntas';
import { DIAGNOSTICO, RESULTADO_DEMO } from '../data/contenidoDemo';
import MigaDePan from '../components/layout/MigaDePan';
import Boton from '../components/ui/Boton';
import Dialogo from '../components/ui/Dialogo';
import Icono from '../components/ui/Icono';
import Insignia from '../components/ui/Insignia';

// ---------- Contenido de cada pestaña ----------
function ResumenEjecutivo({ datos }) {
  return (
    <section className="tarjeta resumen-ejecutivo">
      <div className="resumen-ejecutivo__encabezado">
        <span className="circulo-icono">
          <Icono nombre="FileText" />
        </span>
        <div>
          <h3>Resumen ejecutivo</h3>
          <p>Lo más importante, en minutos.</p>
        </div>
        <Insignia>{datos.metadatos.tiempo_estimado_estudio_minutos} min de lectura</Insignia>
      </div>
      {datos.resumen.map((s, i) => (
        <div key={s.titulo} className="seccion-resumen">
          <span className="numero">{i + 1}</span>
          <div>
            <strong>{s.titulo}</strong>
            <ul>
              {s.puntos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <p className="recuerda">
        <Icono nombre="Lightbulb" />
        <span>
          <strong>Recuerda:</strong> {datos.recuerda}
        </span>
      </p>
    </section>
  );
}

function Flashcards({ tarjetas }) {
  const [i, setI] = useState(0);
  const [volteada, setVolteada] = useState(false);
  const t = tarjetas[i];
  const mover = (d) => {
    setVolteada(false);
    setI((i + d + tarjetas.length) % tarjetas.length);
  };
  return (
    <section className="pregunta">
      <button
        className={`flashcard ${volteada ? 'flashcard--dorso' : ''}`}
        onClick={() => setVolteada(!volteada)}
        aria-label={volteada ? 'Ver la pregunta' : 'Ver la respuesta'}
      >
        <small>
          {volteada ? 'Respuesta' : 'Pregunta'} {i + 1} de {tarjetas.length}
        </small>
        <h2>{volteada ? t.dorso : t.frente}</h2>
        {volteada ? (
          <span className="flashcard__pista">💡 {t.pista}</span>
        ) : (
          <span className="ayuda-tecla" style={{ marginTop: 'auto' }}>
            Toca la tarjeta para ver la respuesta
          </span>
        )}
      </button>
      <div className="controles-flashcards">
        <Boton tipo="fantasma" iconoIzq="ArrowLeft" onClick={() => mover(-1)}>
          Anterior
        </Boton>
        <Boton iconoDer="ArrowRight" onClick={() => mover(1)}>
          Siguiente
        </Boton>
      </div>
    </section>
  );
}

function Quiz() {
  const [n, setN] = useState(0);
  const [elegida, setElegida] = useState(null);
  const q = DIAGNOSTICO[n];
  const claseDe = (i) => {
    if (elegida === null) return '';
    if (i === q.correcta) return 'opcion-quiz--correcta';
    if (i === elegida) return 'opcion-quiz--incorrecta';
    return '';
  };
  return (
    <section className="tarjeta pregunta">
      <strong>
        Pregunta {n + 1} de {DIAGNOSTICO.length}
      </strong>
      <h3>{q.pregunta}</h3>
      {q.opciones.map((op, i) => (
        <button
          key={op}
          className={`opcion-quiz ${claseDe(i)}`}
          disabled={elegida !== null}
          onClick={() => setElegida(i)}
        >
          <span className="opcion-quiz__radio" aria-hidden="true" />
          {op}
          {elegida !== null && i === q.correcta && <span className="opcion-quiz__resultado">✓ Correcta</span>}
          {elegida === i && i !== q.correcta && <span className="opcion-quiz__resultado">✕ Incorrecta</span>}
        </button>
      ))}
      <div className="pregunta__pie">
        <span style={{ flex: 1 }} />
        <Boton
          iconoDer="ArrowRight"
          disabled={elegida === null}
          onClick={() => {
            setN((n + 1) % DIAGNOSTICO.length);
            setElegida(null);
          }}
        >
          Siguiente pregunta
        </Boton>
      </div>
    </section>
  );
}

// ---------- Pantalla ----------
export default function Estudio() {
  const { resultado, archivos, respuestas, reiniciar } = useSesion();
  const datos = resultado || RESULTADO_DEMO;
  const [nivel, estilo, mundo, prof] = PREGUNTAS.map((p) => opcionElegida(p, respuestas));
  const [pestana, setPestana] = useState(estilo?.valor === 'Flashcards' ? 'flashcards' : 'resumen');
  const [confirmar, setConfirmar] = useState(false);
  const [aviso, setAviso] = useState('');
  const fidelidad = Math.round(datos.evaluacion_calidad.anclaje_fuente_score * 100);

  const descargar = () => {
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'krystal-material.json';
    a.click();
  };
  const compartir = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setAviso('Enlace copiado al portapapeles');
    setTimeout(() => setAviso(''), 2500);
  };

  const PESTANAS = [
    { id: 'flashcards', texto: estilo?.valor === 'Flashcards' ? '★ Flashcards' : 'Flashcards', icono: 'Layers' },
    { id: 'resumen', texto: 'Resumen ejecutivo', icono: 'FileText' },
    { id: 'quiz', texto: 'Quizzes', icono: 'CircleHelp' },
  ];

  return (
    <div className="contenedor contenedor--estudio">
      <div>
        <button className="enlace-volver" style={{ marginBottom: 28 }} onClick={() => setConfirmar(true)}>
          <Icono nombre="RotateCcw" tamano={16} /> Empezar de nuevo
        </button>
        <MigaDePan vertical />
      </div>

      <main id="contenido" className="principal" tabIndex={-1}>
        <Insignia color="turquesa">Listo para estudiar</Insignia>
        <h1>
          ¡Aquí tienes tu material de estudio <span className="titulo-degradado">personalizado!</span>
        </h1>
        <p className="subtitulo">
          Adaptamos el contenido a tu nivel y lo convertimos en resúmenes, flashcards y quizzes para que aprendas de forma
          clara, práctica y efectiva.
        </p>

        <div className="pestanas" role="tablist" aria-label="Formatos de estudio">
          {PESTANAS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={pestana === p.id}
              className="pestana"
              onClick={() => setPestana(p.id)}
            >
              <Icono nombre={p.icono} tamano={20} /> {p.texto}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          {pestana === 'resumen' && <ResumenEjecutivo datos={datos} />}
          {pestana === 'flashcards' && <Flashcards tarjetas={datos.flashcards} />}
          {pestana === 'quiz' && <Quiz />}
        </div>

        {/* Al terminar, la única forma de cambiar respuestas o archivos es reiniciar */}
        <section className="tarjeta tarjeta-reinicio">
          <span className="circulo-icono">
            <Icono nombre="RotateCcw" />
          </span>
          <div>
            <h3>¿Quieres estudiar otro tema o cambiar tu perfil?</h3>
            <p>Tus respuestas y archivos quedaron fijos para este material. Reinicia para empezar un proceso nuevo.</p>
          </div>
          <Boton iconoIzq="RotateCcw" onClick={() => setConfirmar(true)}>
            Reiniciar proceso
          </Boton>
        </section>
      </main>

      <aside className="columna-derecha" aria-label="Tu sesión y acciones">
        <section className="tarjeta" style={{ padding: 16 }}>
          <ul style={{ margin: 0, padding: 0 }}>
            <li className="fila-sesion" style={{ listStyle: 'none' }}>
              <span className="circulo-icono">
                <Icono nombre="FileText" />
              </span>
              <div>
                <div className="fila-sesion__titulo">
                  {archivos.length > 1 ? `${archivos.length} documentos` : 'Documento'}
                </div>
                {archivos.length ? (
                  archivos.map((a) => (
                    <div key={a.id} className="fila-sesion__detalle" style={{ color: 'var(--texto)', fontSize: 14 }}>
                      {a.nombre} <span style={{ color: 'var(--texto-2)' }}>· {a.tamano}</span>
                    </div>
                  ))
                ) : (
                  <div>Manual_Tecnico.pdf</div>
                )}
              </div>
            </li>
            <li className="fila-sesion" style={{ listStyle: 'none' }}>
              <span className="circulo-icono">
                <Icono nombre="User" />
              </span>
              <div>
                <div className="fila-sesion__titulo">Tu perfil</div>
                <div>{nivel?.corto || 'Está empezando'}</div>
                <div className="fila-sesion__detalle">
                  {[estilo?.corto, mundo?.texto, prof?.corto].filter(Boolean).join(' · ')}
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className="tarjeta" style={{ padding: 22 }}>
          <div className="anillo">
            <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
              <circle cx="38" cy="38" r="33" fill="none" stroke="var(--turquesa-suave)" strokeWidth="7" />
              <circle
                cx="38" cy="38" r="33" fill="none" stroke="var(--turquesa)" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${(2 * Math.PI * 33 * fidelidad) / 100} 999`} transform="rotate(-90 38 38)"
              />
            </svg>
            <div>
              <strong>Fidelidad a la fuente</strong>
              <div className="anillo__valor">{fidelidad}%</div>
              <div className="fila-sesion__detalle">
                Claridad pedagógica: {datos.evaluacion_calidad.claridad_pedagogica.toLowerCase()}
              </div>
            </div>
          </div>
        </section>

        <section className="tarjeta" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icono nombre="Zap" tamano={20} color="var(--indigo)" /> Acciones rápidas
          </h3>
          {[
            { icono: 'Download', titulo: 'Descargar todo el material', detalle: 'Archivo JSON (PDF y Anki próximamente)', accion: descargar },
            { icono: 'Share2', titulo: 'Compartir con alguien', detalle: 'Copia el enlace de tu material', accion: compartir },
            { icono: 'RotateCcw', titulo: 'Reiniciar proceso', detalle: 'Nuevo perfil y nuevos documentos, desde cero', accion: () => setConfirmar(true) },
          ].map((a) => (
            <button key={a.titulo} className="accion" onClick={a.accion}>
              <Icono nombre={a.icono} />
              <div>
                <strong>{a.titulo}</strong>
                <span>{a.detalle}</span>
              </div>
              <Icono nombre="ChevronRight" tamano={18} />
            </button>
          ))}
          <p role="status" aria-live="polite" className="fila-sesion__detalle">
            {aviso}
          </p>
        </section>
      </aside>

      {confirmar && (
        <Dialogo
          titulo="¿Seguro que quieres reiniciar el proceso?"
          texto="Se borrarán tus respuestas, tus archivos y el material generado en esta sesión. Volverás a la bienvenida para empezar de cero."
          textoConfirmar="Sí, reiniciar"
          onCancelar={() => setConfirmar(false)}
          onConfirmar={reiniciar}
        />
      )}
    </div>
  );
}
