// ============================================================
// APP: decide qué pantalla mostrar según el paso actual.
// El flujo es: Bienvenida → Perfil (4 preguntas + cierre) → Carga
//              → Procesamiento → Diagnóstico → Estudio
// ============================================================
import { useEffect } from 'react';
import { useSesion } from './context/SesionContext';
import Encabezado from './components/layout/Encabezado';
import MigaDePan from './components/layout/MigaDePan';
import FondoDecorativo from './components/layout/FondoDecorativo';
import Bienvenida from './pantallas/Bienvenida';
import Perfil from './pantallas/Perfil';
import Carga from './pantallas/Carga';
import Procesamiento from './pantallas/Procesamiento';
import Diagnostico from './pantallas/Diagnostico';
import Estudio from './pantallas/Estudio';

const PANTALLAS = {
  bienvenida: Bienvenida,
  perfil: Perfil,
  carga: Carga,
  procesamiento: Procesamiento,
  diagnostico: Diagnostico,
  estudio: Estudio,
};

export default function App() {
  const { paso, preguntaActual, alternarPanel } = useSesion();
  const Pantalla = PANTALLAS[paso];

  // Atajo global: Alt + P oculta o muestra el panel "Tu sesión"
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        alternarPanel();
      }
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [alternarPanel]);

  // Al cambiar de pantalla, sube al inicio y lleva el foco al contenido (lectores de pantalla)
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.getElementById('contenido')?.focus({ preventScroll: true });
  }, [paso, preguntaActual]);

  return (
    <div className="app">
      <a href="#contenido" className="saltar-contenido">
        Saltar al contenido
      </a>
      <FondoDecorativo />
      <Encabezado />
      {paso !== 'estudio' && <MigaDePan />}
      <Pantalla />
    </div>
  );
}
