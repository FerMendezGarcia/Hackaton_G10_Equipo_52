import { useEffect } from 'react';
import { useSesion } from '../context/SesionContext';
import Plantilla from '../components/layout/Plantilla';
import Boton from '../components/ui/Boton';
import Icono from '../components/ui/Icono';
import Insignia from '../components/ui/Insignia';

const BENEFICIOS = [
  { icono: 'User', titulo: 'A tu nivel', texto: 'Explicado como lo necesitas, sin jerga innecesaria.' },
  { icono: 'FileText', titulo: 'Fiel a tu documento', texto: 'Todo sale de tu fuente original: nada de inventos.' },
  { icono: 'Clock', titulo: 'De semanas a minutos', texto: 'Tu material listo en menos de lo que tomas un café.' },
];

export default function Bienvenida() {
  const { irAPregunta } = useSesion();

  // Atajo: Enter para empezar
  useEffect(() => {
    const alPresionar = (e) => e.key === 'Enter' && e.target === document.body && irAPregunta(0);
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [irAPregunta]);

  return (
    <Plantilla clase="bienvenida" consejo="Tus respuestas se van guardando aquí para que siempre sepas qué sabe Krystal de ti.">
      <Insignia>Aprendizaje personalizado con IA</Insignia>
      <h1>
        Aprende cualquier cosa,
        <br />
        <span className="titulo-degradado">a tu manera.</span>
      </h1>
      <p className="subtitulo">
        Sube un documento y Krystal lo convierte en material que de verdad disfrutes estudiar: resúmenes, flashcards y
        quizzes hechos a tu medida. Antes, cuéntanos un poco de ti.
      </p>

      <div className="beneficios">
        {BENEFICIOS.map((b) => (
          <article key={b.titulo} className="tarjeta beneficio">
            <span className="opcion__icono">
              <Icono nombre={b.icono} />
            </span>
            <h3>{b.titulo}</h3>
            <p>{b.texto}</p>
          </article>
        ))}
      </div>

      <div className="fila-accion">
        <Boton tamano="grande" iconoDer="ArrowRight" onClick={() => irAPregunta(0)}>
          Empecemos
        </Boton>
        <span className="ayuda-tecla">
          presiona <kbd className="tecla">Enter ↵</kbd>
        </span>
        <Insignia color="turquesa">4 preguntas · menos de 1 minuto</Insignia>
      </div>
    </Plantilla>
  );
}
