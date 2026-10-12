import Icono from './Icono';

/**
 * Botón de Krystal (componente "Botón" en Figma).
 * tipo: 'primario' | 'secundario' | 'fantasma'
 * tamano: 'normal' | 'grande' | 'pequeno'
 */
export default function Boton({
  tipo = 'primario',
  tamano = 'normal',
  iconoIzq,
  iconoDer,
  children,
  ...resto
}) {
  const clases = ['boton', `boton--${tipo}`, tamano !== 'normal' && `boton--${tamano}`]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={clases} {...resto}>
      {iconoIzq && <Icono nombre={iconoIzq} tamano={18} />}
      {children}
      {iconoDer && <Icono nombre={iconoDer} tamano={18} />}
    </button>
  );
}
