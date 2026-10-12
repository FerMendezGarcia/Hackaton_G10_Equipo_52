import { useSesion } from '../../context/SesionContext';
import Icono from '../ui/Icono';

export default function Encabezado() {
  const { tema, alternarTema, irA, bloqueado } = useSesion();
  return (
    <header className="encabezado">
      {/* Después de iniciar el procesamiento el logo ya no regresa al inicio: para eso está "Reiniciar proceso" */}
      <button
        className="logo"
        onClick={() => !bloqueado && irA('bienvenida')}
        aria-label={bloqueado ? 'Krystal' : 'Krystal, ir al inicio'}
        style={{ cursor: bloqueado ? 'default' : 'pointer' }}
      >
        <img src="/krystal.svg" alt="" width="40" height="40" />
        Krystal
      </button>
      <div className="encabezado__derecha">
        <span>
          Cualquier documento,
          <br />a tu propio nivel.
        </span>
        <button
          className="boton-icono boton-icono--redondo"
          onClick={alternarTema}
          aria-label={tema === 'claro' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          <Icono nombre={tema === 'claro' ? 'Sun' : 'Moon'} />
        </button>
      </div>
    </header>
  );
}
