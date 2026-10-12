import { useState } from 'react';
import { useSesion } from '../context/SesionContext';
import { DIAGNOSTICO } from '../data/contenidoDemo';
import Plantilla from '../components/layout/Plantilla';
import Boton from '../components/ui/Boton';
import Icono from '../components/ui/Icono';
import Insignia from '../components/ui/Insignia';
import TituloDegradado from '../components/ui/TituloDegradado';

export default function Diagnostico() {
  const { diagnostico, setDiagnostico, irA } = useSesion();
  const [elegida, setElegida] = useState(null);
  const n = diagnostico.actual;
  const q = DIAGNOSTICO[n];

  const siguiente = () => {
    const respuestas = [...diagnostico.respuestas, elegida];
    if (n + 1 >= DIAGNOSTICO.length) {
      setDiagnostico({ ...diagnostico, respuestas });
      irA('estudio');
    } else {
      setDiagnostico({ ...diagnostico, actual: n + 1, respuestas });
      setElegida(null);
    }
  };

  const saltar = () => {
    setDiagnostico({ ...diagnostico, saltado: true });
    irA('estudio');
  };

  return (
    <Plantilla consejo="Este paso nos permite afinar el contenido y maximizar tu aprendizaje.">
      <Insignia>Paso opcional · Diagnóstico</Insignia>
      <TituloDegradado antes="Diagnóstico de" destacado="conocimientos" />
      <p className="subtitulo">
        Responde unas preguntas rápidas sobre tu documento para que la IA alinee el contenido a lo que ya sabes.
      </p>

      <section className="tarjeta pregunta">
        <div className="pregunta__progreso">
          <span className="circulo-icono circulo-icono--sm">
            <Icono nombre="Brain" tamano={20} />
          </span>
          <strong>
            Pregunta {n + 1} de {DIAGNOSTICO.length}
          </strong>
          <div className="segmentos" aria-hidden="true">
            {DIAGNOSTICO.map((_, i) => (
              <span key={i} className={i <= n ? 'activo' : ''} />
            ))}
          </div>
        </div>
        <h3 id="pregunta-diag">{q.pregunta}</h3>
        <div role="radiogroup" aria-labelledby="pregunta-diag" className="pregunta" style={{ gap: 10 }}>
          {q.opciones.map((op, i) => (
            <button
              key={op}
              type="button"
              role="radio"
              aria-checked={elegida === i}
              className="opcion-quiz"
              onClick={() => setElegida(i)}
            >
              <span className="opcion-quiz__radio" aria-hidden="true" />
              {op}
            </button>
          ))}
        </div>
        <div className="pregunta__pie">
          <span className="texto-tiempo" style={{ flex: 1 }}>
            <Icono nombre="Clock" tamano={16} /> Unos 30 segundos por pregunta
          </span>
          <Boton iconoDer="ArrowRight" disabled={elegida === null} onClick={siguiente}>
            {n + 1 === DIAGNOSTICO.length ? 'Ver mi material' : 'Siguiente'}
          </Boton>
        </div>
      </section>

      <section className="tarjeta saltar-paso">
        <span className="circulo-icono circulo-icono--sm">
          <Icono nombre="SkipForward" tamano={18} />
        </span>
        <div>
          <strong>¿Prefieres saltar este paso?</strong>
          <p>Puedes omitir el diagnóstico y pasar directo a tu material de estudio.</p>
        </div>
        <Boton tipo="secundario" tamano="pequeno" onClick={saltar}>
          Saltar por ahora
        </Boton>
      </section>
    </Plantilla>
  );
}
