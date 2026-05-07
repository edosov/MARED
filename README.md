# Reset Nervioso™ — Sistema MARED
### Landing page de venta · Archivo HTML estático

---

## Descripción

Landing page de alta conversión para el producto digital **Reset Nervioso™** del **Sistema MARED** — un protocolo de neurociencia aplicada de 21 días para la regulación del sistema nervioso autónomo.

El sitio está construido como un único archivo HTML autocontenido, sin dependencias externas de frameworks ni librerías locales. Todo el CSS y el JavaScript están embebidos directamente en el archivo.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 custom properties, Grid, Flexbox |
| Lógica | Vanilla JavaScript (ES6+) |
| Tipografías | Google Fonts — Cormorant Garamond, DM Sans, Montserrat |
| Imágenes | Unsplash CDN (con fallback doble en cada `img`) |
| Ilustración portada | SVG inline generativo (sin dependencias externas) |
| Animaciones | Canvas API (red neural animada), CSS keyframes |

---

## Estructura del archivo

```
index.html
│
├── <head>
│   ├── Meta tags + viewport
│   ├── Google Fonts (3 familias)
│   └── CSS embebido completo (~700 líneas)
│
├── <body>
│   ├── Top announcement banner (ticker scrolling)
│   ├── Nav fija con scroll behavior
│   ├── Hero — split layout con canvas neural
│   ├── Sección Dolor (light)
│   ├── Sección Transformación Antes/Después (dark)
│   ├── Producto + Mockup libro 3D (light)
│   ├── Stats bar (dark)
│   ├── Beneficios — 6 cards (dark)
│   ├── Método 3C — How it works (light)
│   ├── Testimonios con fotos reales (dark)
│   ├── Precio + urgencia + live counters (light)
│   ├── FAQ con acordeón (dark)
│   ├── CTA final (dark)
│   ├── Footer
│   └── Popup de notificaciones de compra (bottom-left)
│
└── <script>
    ├── Nav scroll behavior
    ├── Reveal on scroll (IntersectionObserver)
    ├── FAQ accordion
    ├── Neural canvas animation
    ├── Book 3D parallax (mousemove)
    ├── Purchase notifications (timer + pool de compradores)
    └── Live counters con fluctuación sutil
```

---

## Paleta de colores

```css
--bg:      #050F0C   /* Fondo oscuro principal */
--bg2:     #071A14   /* Fondo oscuro secundario */
--em:      #00C896   /* Verde esmeralda — acento principal */
--em-soft: #00856A   /* Esmeralda suave */
--fu:      #FF2680   /* Fuchsia neón — CTAs y urgencia */
--lt:      #F3EEE8   /* Crema claro — secciones light */
--lt2:     #ECE7DF   /* Crema medio */
--dk:      #0C1E18   /* Texto oscuro en secciones light */
```

---

## Features de conversión incluidas

- **Ticker banner superior** con precio limitado ($97 → $27) corriendo en loop
- **Contador live** de personas viendo la página (fluctuación aleatoria sutil)
- **Popup de notificaciones** de compra: 25 nombres reales con banderas de países hispanohablantes y comunidades latinas en USA, aparece a los 8s y luego cada 14–28s aleatorio
- **Red neural animada** en canvas en el hero (55 nodos, conexiones dinámicas en esmeralda y fuchsia)
- **Mockup 3D del libro** con parallax en mousemove, animación de flotación y sombras multicapa
- **Ilustración SVG artística** en la portada del libro (mujer en equilibrio, sin imágenes externas)
- **Badges flotantes** animados alrededor del mockup
- **Proof social** con avatares de testimonios y contador de compradoras
- **Garantía de 7 días** visible en el card de precio
- **FAQ accordion** con animación de altura
- **Reveal on scroll** con delays escalonados en todas las secciones

---

## Despliegue

### Vercel (recomendado)

1. Renombrar el archivo a `index.html`
2. Subir a un repositorio GitHub
3. Importar el repo en [vercel.com/new](https://vercel.com/new)
4. Vercel detecta automáticamente que es un proyecto estático y despliega sin configuración adicional
5. Conectar dominio personalizado desde el panel → **Domains**

### Hostinger / Hosting tradicional

1. Renombrar a `index.html`
2. Subir vía FTP o administrador de archivos al directorio `public_html`
3. El archivo debe estar en la raíz para que cargue como página principal

### Deploy directo sin GitHub

Ir a [vercel.com/new](https://vercel.com/new) → arrastrar la carpeta con `index.html` en la sección "Deploy without a Git provider"

---

## Actualización del contenido

Al ser un archivo único autocontenido, cualquier cambio de texto, precio o sección se hace directamente editando el HTML. Los bloques están comentados con etiquetas claras:

```html
<!-- ━━━━━━━━ HERO  dark ━━━━━━━━ -->
<!-- ━━━━━━━━ DOLOR  light ━━━━━━━━ -->
<!-- ━━━━━━━━ TRANSFORMACIÓN  dark ━━━━━━━━ -->
<!-- ━━━━━━━━ PRODUCTO + MEGA BOOK  light ━━━━━━━━ -->
<!-- ━━━━━━━━ PRECIO  light + urgency ━━━━━━━━ -->
<!-- ━━━━━━━━ FAQ  dark ━━━━━━━━ -->
<!-- ━━━━━━━━ CTA FINAL  dark ━━━━━━━━ -->
```

---

## Imágenes — política de fallback

Todas las etiquetas `<img>` tienen un atributo `onerror` con URL alternativa de Unsplash y, si esta también falla, un degradado de color como fondo. El sitio nunca muestra imágenes rotas.

```html
<img
  src="URL_PRIMARIA"
  onerror="this.src='URL_SECUNDARIA'; this.onerror=function(){ /* fondo de color */ }">
```

---

## Personalización rápida

| Qué cambiar | Dónde encontrarlo |
|---|---|
| Precio | Buscar `$27` y `$97` en el HTML |
| Texto del banner | Sección `TOP ANNOUNCEMENT BANNER` |
| Testimonios | Sección `TESTIMONIOS` |
| Compradores del popup | Array `buyers` en el `<script>` final |
| Colores | Variables CSS en `:root {}` |
| Tipografías | `@import` en `<head>` + variables de font-family |

---

## Créditos

- Diseño y desarrollo: **Sistema MARED**
- Tipografías: Google Fonts
- Fotografías: Unsplash (licencia libre para uso comercial)
- Ilustración portada: SVG generativo original

---

© 2026 Sistema MARED™ · Todos los derechos reservados
