// ============================================================
// LAS 4 PREGUNTAS DEL PERFIL
// Cada respuesta llena un campo del JSON que se envía al backend
// (perfil_destinatario, formato_salida, nicho_sector, nivel_detalle).
// "icono" es el nombre de un ícono de lucide-react.
// ============================================================
export const PREGUNTAS = [
  {
    id: 'nivel',
    campo: 'perfil_destinatario',
    etiquetaPanel: 'Tu nivel',
    titulo: '¿Qué tan cerca estás de',
    tituloDestacado: 'este tema?',
    subtitulo: 'Sin presión, aquí nadie juzga. Elige la opción que más se parezca a ti.',
    opciones: [
      { valor: 'Principiante', texto: 'Soy nuevo en esto: explícamelo como a un amigo', corto: 'Está empezando', icono: 'Sprout' },
      { valor: 'Intermedio', texto: 'Sé lo básico y quiero ir más allá', corto: 'Sabe lo básico', icono: 'TrendingUp' },
      { valor: 'Avanzado', texto: 'Me muevo bien y busco el detalle fino', corto: 'Se mueve bien', icono: 'Target' },
      { valor: 'Ejecutivo', texto: 'Lidero o decido: dame la visión general', corto: 'Lidera o decide', icono: 'Compass' },
    ],
  },
  {
    id: 'estilo',
    campo: 'formato_salida',
    etiquetaPanel: 'Tu estilo',
    titulo: '¿Cómo se te pega mejor',
    tituloDestacado: 'el conocimiento?',
    subtitulo: 'Todos aprendemos distinto. ¿Cuál es tu estilo?',
    opciones: [
      { valor: 'Flashcards', texto: 'Repasando con tarjetas', corto: 'Flashcards', icono: 'Layers' },
      { valor: 'Quiz', texto: 'Retándome con preguntas', corto: 'Quiz', icono: 'CircleHelp' },
      { valor: 'Tutorial', texto: 'Haciéndolo paso a paso', corto: 'Guía paso a paso', icono: 'Wrench' },
      { valor: 'Resumen', texto: 'Yendo directo al grano', corto: 'Resumen ejecutivo', icono: 'Zap' },
      { valor: 'Guion', texto: 'Como si fuera una clase', corto: 'Guion de clase', icono: 'Clapperboard' },
    ],
  },
  {
    id: 'mundo',
    campo: 'nicho_sector',
    etiquetaPanel: 'Tu mundo',
    titulo: '¿En qué mundo',
    tituloDestacado: 'te mueves?',
    subtitulo: 'Usaremos ejemplos de tu día a día para que todo tenga sentido.',
    cuadricula: true,
    opciones: [
      { valor: 'Educación', texto: 'Educación', icono: 'GraduationCap' },
      { valor: 'Salud', texto: 'Salud y bienestar', icono: 'HeartPulse' },
      { valor: 'Finanzas', texto: 'Finanzas y banca', icono: 'Landmark' },
      { valor: 'Comercio', texto: 'Comercio y ventas', icono: 'ShoppingBag' },
      { valor: 'Gastronomía', texto: 'Gastronomía y turismo', icono: 'UtensilsCrossed' },
      { valor: 'Agro', texto: 'Agro y alimentos', icono: 'Wheat' },
      { valor: 'Industria', texto: 'Industria y manufactura', icono: 'Factory' },
      { valor: 'Logística', texto: 'Logística y transporte', icono: 'Truck' },
      { valor: 'Gobierno', texto: 'Gobierno y sector público', icono: 'Building2' },
      { valor: 'Arte', texto: 'Arte, cultura y medios', icono: 'Palette' },
      { valor: 'Tecnología', texto: 'Tecnología', icono: 'Laptop' },
      { valor: 'Social', texto: 'Organizaciones sociales', icono: 'HandHeart' },
      { valor: 'Legal', texto: 'Legal', icono: 'Scale' },
      { valor: 'Construcción', texto: 'Construcción e inmobiliaria', icono: 'HardHat' },
      { valor: 'Otro', texto: 'Otro', icono: 'PenLine' },
    ],
  },
  {
    id: 'profundidad',
    campo: 'nivel_detalle',
    etiquetaPanel: 'Profundidad',
    titulo: '¿Cuánta profundidad',
    tituloDestacado: 'le ponemos?',
    subtitulo: 'Tranqui, lo puedes cambiar después.',
    opciones: [
      { valor: 'Didactico', texto: 'Ligero: lo esencial, con ejemplos y analogías', corto: 'Ligero', icono: 'Leaf' },
      { valor: 'Profundo', texto: 'A fondo: todos los detalles, sin rodeos', corto: 'A fondo', icono: 'Microscope' },
    ],
  },
];

export const LETRAS = 'ABCDEFGHIJKLMNO';

// Devuelve la opción elegida (objeto completo) para una pregunta
export function opcionElegida(pregunta, respuestas) {
  return pregunta.opciones.find((o) => o.valor === respuestas[pregunta.id]);
}
