# juancruz.elliff.ar

Sitio personal de Juan Cruz Elliff — Desarrollo de Software · Ingeniería de Datos.

Sitio estático de una sola página (`index.html`), sin build.

## Identidad visual

Sigue el Documento Maestro de Identidad Visual JCE v1.1:

- Paleta: Marino profundo `#13203A`, Marino medio `#2B3D5C`, Tinta `#3A465C`, Pizarra `#6B7486`, Línea `#B9C0CC`, Niebla `#D9DDE3`, Papel `#F6F5F2`.
- Tipografía: Jost (300/400/500) e IBM Plex Mono (400/500), alojadas en `/fonts`.
- Monograma: geometría exacta del SVG maestro, embebido en `index.html` como `<symbol id="jce">`.

## Archivos

| Archivo | Uso |
| --- | --- |
| `index.html` | Sitio completo |
| `favicon.svg`, `favicon-32.png` | Favicon (monograma Papel sobre Marino, 52 % del lado) |
| `apple-touch-icon.png` | Ícono iOS 180 × 180 |
| `og-cover.jpg` | Imagen para redes 1200 × 630 (contiene el descriptor anterior; ver pendientes) |
| `fonts/` | Jost y IBM Plex Mono (subset latin, woff2) |
| `robots.txt`, `sitemap.xml` | SEO |

## Pendientes antes de publicar

- `og-cover.jpg` muestra el descriptor "Automatización · Datos · IA": regenerar si se adopta el nuevo descriptor.
- Manual JCE v1.1 fija "Automatización · Datos · IA" como descriptor: registrar el cambio en una nueva versión del manual.
- **Analítica**: pegar el snippet de GA4 o Plausible en el `<head>` (los eventos ya se emiten).
- **Email**: migrar a casilla del dominio cuando corresponda.
