import { useSesion } from '../../context/SesionContext';
import PanelSesion from './PanelSesion';

/**
 * Plantilla de pantalla: contenido principal (izquierda) + panel "Tu sesión" (derecha).
 * El panel se oculta / muestra con el botón del panel o Alt + P.
 */
export default function Plantilla({ children, consejo, iconoConsejo, extraPanel, clase = '' }) {
  const { panelOculto } = useSesion();
  return (
    <div className={`contenedor ${panelOculto ? 'contenedor--sin-panel' : ''}`}>
      <main id="contenido" className={`principal ${clase}`} tabIndex={-1}>
        {children}
      </main>
      <PanelSesion consejo={consejo} iconoConsejo={iconoConsejo}>
        {extraPanel}
      </PanelSesion>
    </div>
  );
}
