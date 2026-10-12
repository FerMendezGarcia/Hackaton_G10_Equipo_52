import { useEffect, useRef } from 'react';
import Boton from './Boton';

/**
 * Diálogo de confirmación accesible:
 * - role="alertdialog" y foco inicial en la opción segura (Cancelar)
 * - Esc cierra el diálogo
 */
export default function Dialogo({ titulo, texto, textoConfirmar, onConfirmar, onCancelar }) {
  const cancelarRef = useRef(null);

  useEffect(() => {
    cancelarRef.current?.focus();
    const alPresionar = (e) => e.key === 'Escape' && onCancelar();
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [onCancelar]);

  return (
    <div className="velo" onClick={onCancelar}>
      <div
        className="dialogo"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialogo-titulo"
        aria-describedby="dialogo-texto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialogo-titulo">{titulo}</h2>
        <p id="dialogo-texto" className="subtitulo">
          {texto}
        </p>
        <div className="dialogo__acciones">
          <Boton tipo="fantasma" ref={cancelarRef} onClick={onCancelar}>
            Cancelar
          </Boton>
          <Boton onClick={onConfirmar}>{textoConfirmar}</Boton>
        </div>
      </div>
    </div>
  );
}
