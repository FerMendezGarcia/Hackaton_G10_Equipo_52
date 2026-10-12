// ============================================================
// CONTENIDO DE DEMOSTRACIÓN
// Mientras el backend (RAG + agentes) no esté listo, la app usa
// estos datos. Tienen la misma forma que el JSON de salida del reto.
// ============================================================

export const DIAGNOSTICO = [
  {
    pregunta: '¿Qué describe mejor la "estructura" de un documento XML?',
    opciones: [
      'La forma en que se organizan y jerarquizan los datos dentro del archivo.',
      'El lenguaje de programación usado para crear aplicaciones web.',
      'Un tipo de base de datos relacional.',
      'Un formato de compresión de archivos.',
    ],
    correcta: 0,
  },
  {
    pregunta: '¿Qué elemento contiene a todos los demás en un XML?',
    opciones: ['El elemento raíz', 'Un atributo', 'La declaración de versión', 'Un comentario'],
    correcta: 0,
  },
  {
    pregunta: '¿Para qué sirve un esquema XSD?',
    opciones: ['Para dar estilo visual', 'Para validar la estructura del documento', 'Para comprimir el archivo', 'Para traducirlo'],
    correcta: 1,
  },
  {
    pregunta: '¿Qué es un atributo en XML?',
    opciones: ['Un dato extra dentro de la etiqueta de apertura', 'Un archivo adjunto', 'Una base de datos', 'Un error de sintaxis'],
    correcta: 0,
  },
  {
    pregunta: '¿Cuál es una buena práctica al nombrar elementos?',
    opciones: ['Usar nombres aleatorios', 'Usar nombres descriptivos', 'Usar solo números', 'Repetir el mismo nombre siempre'],
    correcta: 1,
  },
];

// Respuesta simulada del backend (misma forma del JSON del reto)
export const RESULTADO_DEMO = {
  status: 'exito',
  metadatos: {
    tiempo_estimado_estudio_minutos: 8,
    conceptos_clave: ['XML', 'Elemento raíz', 'Atributos', 'XSD'],
  },
  evaluacion_calidad: {
    anclaje_fuente_score: 0.98,
    claridad_pedagogica: 'Alta',
  },
  resumen: [
    {
      titulo: 'Conceptos clave',
      puntos: [
        'XML es un estándar para intercambiar datos entre sistemas.',
        'Organiza la información en una estructura jerárquica de elementos.',
        'Permite validar el documento mediante esquemas (XSD).',
      ],
    },
    {
      titulo: 'Estructura del documento',
      puntos: [
        'Declaración de versión y codificación.',
        'Un elemento raíz que contiene a todos los demás.',
        'Elementos hijos y atributos que describen los datos.',
      ],
    },
    {
      titulo: 'Buenas prácticas',
      puntos: [
        'Usa nombres descriptivos para los elementos.',
        'Mantén una estructura simple y coherente.',
        'Valida el documento antes de usarlo en producción.',
      ],
    },
  ],
  recuerda:
    'una buena estructura XML no solo facilita la lectura, también el mantenimiento y la escalabilidad del proyecto.',
  flashcards: [
    {
      frente: '¿Qué es XML?',
      dorso: 'Un formato estándar para guardar e intercambiar datos de forma ordenada entre sistemas.',
      pista: 'Piensa en una lista de mercado con categorías y subcategorías.',
    },
    {
      frente: '¿Qué es el elemento raíz?',
      dorso: 'La etiqueta principal que envuelve a todas las demás del documento.',
      pista: 'Es como la caja grande donde guardas todas las cajitas.',
    },
    {
      frente: '¿Para qué sirve un esquema XSD?',
      dorso: 'Define las reglas que debe cumplir el XML para considerarse válido.',
      pista: 'Funciona como el reglamento de un juego.',
    },
  ],
  almacenamiento_oci: {
    bucket: 'krystal-contenidos-educativos',
    status_upload: 'completado',
  },
};

export const AGENTES = [
  { nombre: 'Agente de análisis', descripcion: 'Lee y comprende la estructura del documento.', icono: 'FileSearch' },
  { nombre: 'Agente de adaptación', descripcion: 'Ajusta el contenido a tu nivel y a tu mundo.', icono: 'Brain' },
  { nombre: 'Agente de generación', descripcion: 'Crea resúmenes, flashcards y quizzes.', icono: 'Layers' },
];
