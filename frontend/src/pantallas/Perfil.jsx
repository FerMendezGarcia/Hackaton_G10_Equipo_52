import { useEffect, useRef, useState } from 'react';
import { useSesion } from '../context/SesionContext';
import { LETRAS, PREGUNTAS, opcionElegida } from '../data/preguntas';
import Plantilla from '../components/layout/Plantilla';
import OpcionPerfil from '../components/perfil/OpcionPerfil';
import Boton from '../components/ui/Boton';
import Icono from '../components/ui/Icono';
import Insignia from '../components/ui/Insignia';

// Pantalla de cierre: "¡Está listo!"
function Cierre() {
  const { respuestas, irA, irAPregunta } = useSesion();
  const [nivel, estilo, mundo, prof] = PREGUNTAS.map((p) => opcionElegida(p, respuestas));
  return (
    <Plantilla clase="cierre" consejo="Puedes cambiar cualquier respuesta después desde aquí.">
      <h1>
        ¡Está listo! <span aria-hidden="true">🎉</span>
      </h1>
      <p className="tarjeta">
        Vamos a preparar <strong>{estilo.corto.toLowerCase()}</strong> en modo <strong>{prof.corto.toLowerCase()}</strong>{' '}
        para alguien que <strong>{nivel.corto.toLowerCase()}</strong>, con ejemplos de <strong>{mundo.texto}</strong>.
      </p>
      <Boton tipo="fantasma" tamano="pequeno" iconoIzq="PenLine" onClick={() => irAPregunta(0)}>
        Editar respuestas
      </Boton>
      <Boton tamano="grande" iconoIzq="CloudUpload" onClick={() => irA('carga')}>
        Subir mi archivo
      </Boton>
      <span className="ayuda-tecla">PDF, Markdown o texto · hasta 20 MB</span>
    </Plantilla>
  );
}

export default function Perfil() {
  const { preguntaActual, respuestas, responder, irAPregunta, irA, editando, terminarEdicion } = useSesion();
  const [filtro, setFiltro] = useState('');
  const [aviso, setAviso] = useState('');

  const pregunta = PREGUNTAS[preguntaActual];

  // Modo edición (se llega desde "Cambiar" en Carga): guarda la respuesta
  // original para poder cancelar sin perderla.
  const original = useRef(null);
  useEffect(() => {
    if (editando && pregunta) original.current = respuestas[pregunta.id];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editando, preguntaActual]);

  const cancelarEdicion = () => {
    if (original.current) responder(pregunta.id, original.current);
    setAviso('');
    terminarEdicion();
  };

  // Solo marca la opción. Para avanzar hay que pulsar "Siguiente" (o Enter).
  const elegir = (opcion) => {
    responder(pregunta.id, opcion.valor);
    setAviso(editando ? 'Respuesta actualizada. Pulsa "Guardar y volver".' : '¡Buena elección! Pulsa "Siguiente" para continuar.');
  };

  const avanzar = () => {
    setAviso('');
    if (editando) terminarEdicion(); // vuelve a Carga con el cambio guardado
    else irAPregunta(preguntaActual + 1);
  };

  // Atajos de teclado: letras A–O para elegir, Enter para seguir
  useEffect(() => {
    if (!pregunta) return;
    const alPresionar = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
      const i = LETRAS.indexOf(e.key.toUpperCase());
      if (i >= 0 && i < pregunta.opciones.length) elegir(pregunta.opciones[i]);
      if (e.key === 'Enter' && respuestas[pregunta.id]) avanzar();
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  });

  if (preguntaActual >= PREGUNTAS.length) return <Cierre />;

  const opciones = pregunta.cuadricula
    ? pregunta.opciones.filter((o) => o.texto.toLowerCase().includes(filtro.toLowerCase()))
    : pregunta.opciones;

  return (
    <Plantilla consejo="Puedes cambiar cualquier respuesta después desde aquí.">
      {editando ? (
        <p className="aviso-edicion" role="status">
          <Icono nombre="PenLine" tamano={18} /> Estás cambiando esta respuesta. Al guardar vuelves a la carga de archivos.
        </p>
      ) : (
        <button
          className="enlace-volver"
          onClick={() => (preguntaActual === 0 ? irA('bienvenida') : irAPregunta(preguntaActual - 1))}
        >
          <Icono nombre="ArrowLeft" tamano={18} /> Volver
        </button>
      )}
      <Insignia>
        Tu perfil · Pregunta {preguntaActual + 1} de {PREGUNTAS.length}
      </Insignia>
      <div>
        <h1 id="titulo-pregunta">
          {pregunta.titulo} <span className="titulo-degradado">{pregunta.tituloDestacado}</span>
        </h1>
        <p className="subtitulo">{pregunta.subtitulo}</p>
      </div>

      <section className="tarjeta pregunta">
        <div className="pregunta__progreso">
          <strong>
            Pregunta {preguntaActual + 1} de {PREGUNTAS.length}
          </strong>
          <div className="segmentos" aria-hidden="true">
            {PREGUNTAS.map((p, i) => (
              <span key={p.id} className={i <= preguntaActual ? 'activo' : ''} />
            ))}
          </div>
        </div>

        {pregunta.cuadricula && (
          <input
            className="buscador"
            placeholder="Busca tu sector…"
            aria-label="Buscar sector"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        )}

        <div
          role="radiogroup"
          aria-labelledby="titulo-pregunta"
          className={pregunta.cuadricula ? 'cuadricula-sectores' : 'pregunta'}
          style={pregunta.cuadricula ? undefined : { gap: 12 }}
        >
          {opciones.map((o) => (
            <OpcionPerfil
              key={o.valor}
              letra={LETRAS[pregunta.opciones.indexOf(o)]}
              icono={o.icono}
              texto={o.texto}
              compacta={pregunta.cuadricula}
              seleccionada={respuestas[pregunta.id] === o.valor}
              onElegir={() => elegir(o)}
            />
          ))}
        </div>

        <p role="status" aria-live="polite" style={{ minHeight: 24, color: 'var(--turquesa-texto)', fontWeight: 600 }}>
          {aviso && `✓ ${aviso}`}
        </p>

        <div className="pregunta__pie">
          <span className="ayuda-tecla">
            Usa las teclas <kbd className="tecla">A</kbd> – <kbd className="tecla">{LETRAS[pregunta.opciones.length - 1]}</kbd>
          </span>
          <Boton
            tipo="fantasma"
            onClick={() => {
              setAviso('');
              if (editando) cancelarEdicion();
              else if (preguntaActual === 0) irA('bienvenida');
              else irAPregunta(preguntaActual - 1);
            }}
          >
            {editando ? 'Cancelar' : 'Anterior'}
          </Boton>
          <Boton
            iconoDer={editando ? 'Check' : 'ArrowRight'}
            disabled={!respuestas[pregunta.id]}
            onClick={avanzar}
          >
            {editando ? 'Guardar y volver' : 'Siguiente'}
          </Boton>
        </div>
      </section>
    </Plantilla>
  );
}
