// Título con la parte destacada en degradado índigo → azul → turquesa (firma visual de Krystal)
export default function TituloDegradado({ antes, destacado, despues = '', nivel = 1, id }) {
  const Etiqueta = `h${nivel}`;
  return (
    <Etiqueta id={id}>
      {antes} <span className="titulo-degradado">{destacado}</span>
      {despues}
    </Etiqueta>
  );
}
