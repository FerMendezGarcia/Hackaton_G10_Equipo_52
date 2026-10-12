import Icono from '../ui/Icono';

/**
 * Opción estilo Typeform (componente "Opción de perfil" en Figma).
 * Usa role="radio" para que el lector de pantalla la anuncie como opción.
 */
export default function OpcionPerfil({ letra, icono, texto, seleccionada, onElegir, compacta = false }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={seleccionada}
      className={`opcion ${compacta ? 'opcion--compacta' : ''}`}
      onClick={onElegir}
    >
      <span className="opcion__tecla" aria-hidden="true">
        {letra}
      </span>
      <span className="opcion__icono">
        <Icono nombre={icono} tamano={compacta ? 18 : 22} />
      </span>
      <span className="opcion__texto">{texto}</span>
      {seleccionada && !compacta && (
        <span className="opcion__marca">
          <Icono nombre="Check" tamano={14} grosor={3} /> Seleccionada
        </span>
      )}
    </button>
  );
}
