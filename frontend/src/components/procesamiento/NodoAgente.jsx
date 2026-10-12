import Icono from '../ui/Icono';
import Insignia from '../ui/Insignia';

const INSIGNIA = {
  completado: { color: 'turquesa', texto: 'Completado' },
  'en-proceso': { color: 'indigo', texto: 'En proceso…' },
  pendiente: { color: 'neutro', texto: 'Pendiente' },
};

// Nodo del pipeline de agentes (componente "Nodo de agente" en Figma)
export default function NodoAgente({ numero, nombre, descripcion, icono, estado }) {
  const ins = INSIGNIA[estado];
  return (
    <div className={`agente agente--${estado}`}>
      <div className="agente__nodo">
        <span className="agente__numero">{numero}</span>
        <Icono nombre={icono} tamano={30} />
      </div>
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <Insignia color={ins.color}>{ins.texto}</Insignia>
    </div>
  );
}
