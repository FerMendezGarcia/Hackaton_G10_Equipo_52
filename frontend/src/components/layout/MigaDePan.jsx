import { Fragment } from 'react';
import { ESTACIONES, indiceEstacion, useSesion } from '../../context/SesionContext';
import Icono from '../ui/Icono';

const TEXTO_ESTADO = { completado: 'Listo', actual: 'En curso', pendiente: 'Pendiente' };

/**
 * Miga de pan con las 5 estaciones.
 * vertical = true la muestra en columna (pantalla Estudio).
 * Las estaciones completadas se pueden pulsar para volver, solo mientras
 * el procesamiento no haya iniciado (después quedan bloqueadas).
 */
export default function MigaDePan({ vertical = false }) {
  const { paso, irA, bloqueado } = useSesion();
  const actual = indiceEstacion(paso);

  return (
    <nav className={`miga ${vertical ? 'miga--vertical' : ''}`} aria-label="Progreso">
      <ol>
        {ESTACIONES.map((est, i) => {
          const estado = i < actual ? 'completado' : i === actual ? 'actual' : 'pendiente';
          return (
            <Fragment key={est.id}>
              <li>
                <button
                  className={`estacion estacion--${estado}`}
                  disabled={estado !== 'completado' || bloqueado}
                  onClick={() => irA(est.id)}
                  aria-current={estado === 'actual' ? 'step' : undefined}
                >
                  <span className="estacion__indicador">
                    {estado === 'completado' ? (
                      <span>
                        <Icono nombre="Check" tamano={14} grosor={3} />
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span>
                    <span className="estacion__nombre">{est.nombre}</span>
                    <span className="estacion__estado">{TEXTO_ESTADO[estado]}</span>
                  </span>
                  <span className="sr-only">
                    Paso {i + 1} de {ESTACIONES.length}
                  </span>
                </button>
              </li>
              {i < ESTACIONES.length - 1 && (
                <li aria-hidden="true" className={`miga__conector ${i < actual ? 'miga__conector--hecho' : ''}`} />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
