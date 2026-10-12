# Krystal

Convierte cualquier documento en material de estudio a tu medida (resúmenes, flashcards y quizzes) con IA.
Interfaz en **React + Vite**, basada en el archivo de Figma **"Krystal – Maqueta UI"**.

## Requisitos

- Node.js 20.19 o superior (recomendado 22 o 24 LTS)
- npm (viene con Node)

## Arrancar en tu computador

```bash
cd krystal
npm install      # solo la primera vez: descarga las dependencias
npm run dev      # inicia el servidor local
```

Se abre solo en **http://localhost:5173**. Cada vez que guardas un archivo, la página se actualiza sola.
Para detenerlo: `Ctrl + C` en la terminal.

Otros comandos:

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Genera la versión final optimizada en la carpeta `dist/` |
| `npm run preview` | Sirve esa versión final para probarla |

## Estructura del proyecto

```
krystal/
├── index.html                  # Página base (carga las fuentes y la app)
├── public/krystal.svg          # Isotipo / favicon
└── src/
    ├── main.jsx                # Punto de entrada
    ├── App.jsx                 # Decide qué pantalla mostrar
    ├── context/
    │   └── SesionContext.jsx   # Estado global: paso, respuestas, archivo, resultado
    ├── data/
    │   ├── preguntas.js        # Las 4 preguntas del perfil (edítalas aquí)
    │   └── contenidoDemo.js    # Datos de ejemplo mientras no hay backend
    ├── services/
    │   └── api.js              # Conexión con el backend (hoy simulada)
    ├── components/
    │   ├── ui/                 # Piezas básicas: Boton, Insignia, Icono, Dialogo…
    │   ├── layout/             # Encabezado, MigaDePan, PanelSesion, Plantilla…
    │   ├── perfil/             # OpcionPerfil (estilo Typeform)
    │   └── procesamiento/      # NodoAgente
    ├── pantallas/              # Una pantalla por paso del flujo
    │   ├── Bienvenida.jsx
    │   ├── Perfil.jsx          # 4 preguntas + cierre "¡Está listo!"
    │   ├── Carga.jsx
    │   ├── Procesamiento.jsx
    │   ├── Diagnostico.jsx
    │   └── Estudio.jsx
    └── styles/
        ├── tokens.css          # Colores, espaciados y sombras (= variables de Figma)
        ├── componentes.css
        ├── pantallas.css
        └── global.css
```

## Conectar el backend (RAG + agentes)

1. Levanta tu API (por ejemplo FastAPI) con un endpoint `POST /adaptar` que reciba el archivo y los campos
   `perfil_destinatario`, `formato_salida`, `nicho_sector`, `nivel_detalle`.
2. En `src/services/api.js` cambia `USAR_DEMO` a `false`.
3. Si tu API no está en `http://localhost:8000`, crea un archivo `.env` con `VITE_API_URL=http://tu-servidor`.

La respuesta debe tener la forma de `RESULTADO_DEMO` en `src/data/contenidoDemo.js`.

## Accesibilidad incluida

- Enlace "Saltar al contenido", foco visible en todos los controles y navegación por teclado
- Atajos: letras **A–O** para responder, **Enter** para avanzar, **Alt + P** para ocultar el panel
- Estados con ícono + texto (no solo color), avisos para lectores de pantalla y modo oscuro
- Respeta la preferencia del sistema de "reducir movimiento"
