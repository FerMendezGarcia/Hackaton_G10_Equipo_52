import { Fragment, useEffect, useState } from 'react';
import { useSesion } from '../context/SesionContext';
import { AGENTES } from '../data/contenidoDemo';
import { procesarDocumento } from '../services/api';
import { PREGUNTAS } from '../data/preguntas';
import Plantilla from '../components/layout/Plantilla';
import NodoAgente from '../components/procesamiento/NodoAgente';
import Icono from '../components/ui/Icono';
import Insignia from '../components/ui/Insignia';
import TituloDegradado from '../components/ui/TituloDegradado';

const QUE_HACE = [
  'Lee tu documento y entiende cómo está organizado.',
  'Adapta el contenido a tu nivel: simplifica conceptos complejos y conserva la información clave, con ejemplos de tu mundo.',
  'Crea tu resumen, tus flashcards y tus quizzes, y revisa que todo sea fiel al original.',
];

export default function Procesamiento() {
  const { archivos, respuestas, setResultado, irA } = useSesion();
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState('');

  // Llama al servicio y simula el avance de la barra
  useEffect(() => {
    let activo = true;
    const timer = setInterval(() => setProgreso((p) => Math.min(p + 4, 96)), 180);
    const perfil = Object.fromEntries(PREGUNTAS.map((p) => [p.campo, respuestas[p.id]]));
    procesarDocumento(archivos.map((a) => a.file), perfil)
      .then((res) => {
        if (!activo) return;
        setResultado(res);
        setTimeout(() => {
          if (!activo) return;
          setProgreso(100);
          setTimeout(() => activo && irA('diagnostico'), 700);
        }, 3800);
      })
      .catch((e) => activo && setError(e.message));
    return () => {
      activo = false;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agenteActual = progreso < 34 ? 0 : progreso < 70 ? 1 : progreso < 100 ? 2 : 3;
  const estadoDe = (i) => (i < agenteActual ? 'completado' : i === agenteActual ? 'en-proceso' : 'pendiente');

  return (
    <Plantilla
      consejo="Cuando termine, pasarás a un diagnóstico corto (puedes saltarlo)."
      extraPanel={
        agenteActual < 3 && (
          <div className="caja-agente">
            <strong>
              <Icono nombre="Sparkles" tamano={18} /> ¿Qué hace ahora el Agente {agenteActual + 1}?
            </strong>
            {QUE_HACE[agenteActual]}
          </div>
        )
      }
    >
      <TituloDegradado antes="Estamos procesando tu contenido con la ayuda de nuestros" destacado="agentes de IA" />
      <p className="subtitulo">
        Cada agente trabaja en una etapa clave para transformar tu documento en material de estudio hecho a tu medida.
      </p>

      <section className="tarjeta pipeline" aria-label="Pipeline de agentes">
        <div className="pipeline__encabezado">
          <div>
            <h3>Pipeline de agentes</h3>
            <p>
              Procesando{' '}
              {archivos.length > 1 ? `${archivos.length} documentos` : archivos[0]?.nombre || 'tu documento'}…
            </p>
          </div>
          <Insignia color={progreso === 100 ? 'turquesa' : 'indigo'}>
            {progreso === 100 ? 'Completado' : 'En progreso'}
          </Insignia>
        </div>

        <div className="agentes">
          {AGENTES.map((a, i) => (
            <Fragment key={a.nombre}>
              <NodoAgente numero={i + 1} {...a} estado={estadoDe(i)} />
              {i < AGENTES.length - 1 && (
                <div className={`agente__conector ${i < agenteActual ? 'agente__conector--hecho' : ''}`} aria-hidden="true">
                  <span />
                  {i < agenteActual ? <Icono nombre="Check" tamano={16} /> : '•'}
                  <span />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div>
          <div className="progreso-fila">
            <div
              className="barra"
              role="progressbar"
              aria-valuenow={progreso}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso del procesamiento"
            >
              <span style={{ width: `${progreso}%` }} />
            </div>
            {progreso}%
          </div>
          <p className="texto-tiempo" aria-live="polite">
            <Icono nombre="Clock" tamano={16} />
            {progreso === 100
              ? '¡Listo! Pasando al diagnóstico…'
              : `Etapa ${Math.min(agenteActual + 1, 3)} de 3 · Tiempo estimado: menos de 1 minuto`}
          </p>
          {error && (
            <p className="mensaje-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </section>
    </Plantilla>
  );
}
