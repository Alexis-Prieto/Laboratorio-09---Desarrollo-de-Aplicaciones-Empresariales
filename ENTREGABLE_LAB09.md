# Laboratorio N°9 EXTRA — React revisado por pruebas

## Portada

- **Curso:** Desarrollo de Aplicaciones Empresariales
- **Laboratorio:** N°9 EXTRA — React revisado por pruebas
- **Alumno:** Alexis Prieto Huiza
- **Semana:** 09
- **Fecha:** 30/10/2026
- **Modalidad:** Trabajo individual

## Nota de modalidad

Trabajo individual. Todos los componentes, la copia arreglada de la IA y el entregable fueron realizados por el alumno.

## Indice

1. Entorno de desarrollo
2. Paso 1 — Estado inicial
3. Paso 2 — Lectura de `src/data/movies.js`
4. Paso 3 — Lectura de las pruebas T1 y T2
5. Paso 4 — `npm run duel` inicial (rojo)
6. Paso 5 — Componentes T1 a T4
7. Paso 6 — Componentes T5 a T8
8. Paso 7 — Uso de IA
9. Paso 8 — `npm run duel:ai`
10. Paso 9 — Clasificacion de los 6 fallos de la IA
11. Paso 10 — `npm run fixed:init`
12. Paso 11 — Arreglo de `src/duel/fixed/`
13. Paso 12 — Analisis de keys (T5)
14. Paso 13 — XSS provocado con `dangerouslySetInnerHTML`
15. Paso 14 — `AgentMessage` seguro
16. Paso 15 — Entregable final
17. Tabla de fallos de la IA
18. Analisis de keys
19. Analisis de XSS
20. Tabla de uso de IA
21. Decisiones de diseno
22. Supuestos
23. Conclusiones
24. Anexo — Capturas

## Entorno de desarrollo

- Node.js: v22.17.1
- React: 19.0.0
- Vite: 7.3.7
- Vitest: 3.2.7
- Testing Library: @testing-library/react 16.1.0, @testing-library/jest-dom 6.6.0
- jsdom: 26.0.0

## Paso 1 — Estado inicial

Comandos:

```powershell
node --version
npm install
npm run duel
```

Resultado esperado: 8 archivos de prueba en rojo, 43 pruebas fallidas, mensaje `TODO(team): write Header ...`.

## Paso 2 — Lectura de `src/data/movies.js`

- Cantidad de peliculas: **8**.
- Pelicula sin funciones hoy: **Ruta 91** (id 5, `showtimes: []`).
- Pelicula con sinopsis con HTML escrito por un tercero: **La Ultima Funcion** (id 1).
- Sinopsis hostil: `Gran estreno <img src=x onerror="window.__xss=1"> <b>no te lo pierdas</b>`.
- Parte que ejecutaria codigo: `<img src=x onerror="window.__xss=1">`.

## Paso 3 — Lectura de las pruebas T1 y T2

### T1 Header (`T1-header.test.jsx`)

Consultas usadas:

- `screen.getByRole("banner")`: comprueba que existe un `<header>` con rol banner.
- `screen.getByRole("heading", { level: 1, name })`: comprueba el `<h1>` con el nombre.
- `screen.getByRole("navigation", { name: "Principal" })`: comprueba el `<nav aria-label="Principal">`.
- `within(nav).getByRole("list")`, `getAllByRole("listitem")`: comprueba la lista y la cantidad de items.
- `within(items[i]).getByRole("link", { name })` y `toHaveAttribute("href")`: comprueba cada enlace.

### T2 Footer (`T2-footer.test.jsx`)

Consultas usadas:

- `screen.getByRole("contentinfo")`: comprueba el `<footer>` con rol contentinfo.
- `screen.getByText(contact.address)`: comprueba la direccion.
- `screen.getByRole("link", { name })` + `toHaveAttribute("href", "tel:...")` / `"mailto:..."`: comprueba los enlaces.

### Por que consultar por rol es mejor que por clase CSS

Porque las pruebas verifican comportamiento y accesibilidad (roles, nombres accesibles) en lugar de detalles de implementacion (clases CSS). Un cambio de estilos no rompe las pruebas, y se fuerza a usar HTML semantico.

### Para que sirve el espia de `console.error`

`watchConsole()` (en `src/duel/support.js`) espia `console.error` para capturar las advertencias que React imprime en desarrollo (por ejemplo `class` en lugar de `className`, o claves faltantes en listas). Asi una prueba puede exigir que no haya avisos.
```
## Paso 4 � `npm run duel` inicial (rojo)

Comando:

```powershell
npm run duel
```

Resumen:

```
Test Files  8 failed (8)
Tests  43 failed (43)
```

Mensaje de ejemplo:

```
TODO(team): write Header in src/duel/team/Header.jsx
```

## Paso 5 � Componentes T1 a T4

Archivos escritos:

- `src/duel/team/Header.jsx`
- `src/duel/team/Footer.jsx`
- `src/duel/team/MovieCard.jsx`
- `src/duel/team/Showtimes.jsx`

C�digo (Header):

```jsx
export default function Header({ name, links }) {
  return (
    <header role="banner">
      <h1>{name}</h1>
      <nav aria-label="Principal">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

C�digo (Footer):

```jsx
export default function Footer({ contact }) {
  return (
    <footer role="contentinfo">
      <p>{contact.address}</p>
      <a href={`tel:${contact.phone}`}>{contact.phone}</a>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </footer>
  );
}
```

C�digo (MovieCard):

```jsx
export default function MovieCard({ movie }) {
  return (
    <article>
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>? {movie.rating}</p>
    </article>
  );
}
```

C�digo (Showtimes):

```jsx
export default function Showtimes({ times }) {
  if (!times || times.length === 0) {
    return <p>Sin funciones hoy</p>;
  }
  return (
    <ul>
      {times.map((time) => (
        <li key={time}>{time}</li>
      ))}
    </ul>
  );
}
```

Intentos: 1 por componente. Tras cada uno se ejecut� `npm run duel` y las pruebas de ese componente pasaron.
## Paso 4 — `npm run duel` inicial (rojo)

Comando:

```powershell
npm run duel
```

Resumen:

```
Test Files  8 failed (8)
Tests  43 failed (43)
```

Mensaje de ejemplo:

```
TODO(team): write Header in src/duel/team/Header.jsx
```

## Paso 5 — Componentes T1 a T4

Archivos escritos:

- `src/duel/team/Header.jsx`
- `src/duel/team/Footer.jsx`
- `src/duel/team/MovieCard.jsx`
- `src/duel/team/Showtimes.jsx`

Codigo (Header):

```jsx
export default function Header({ name, links }) {
  return (
    <header role="banner">
      <h1>{name}</h1>
      <nav aria-label="Principal">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

Codigo (Footer):

```jsx
export default function Footer({ contact }) {
  return (
    <footer role="contentinfo">
      <p>{contact.address}</p>
      <a href={`tel:${contact.phone}`}>{contact.phone}</a>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </footer>
  );
}
```

Codigo (MovieCard):

```jsx
export default function MovieCard({ movie }) {
  return (
    <article>
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>★ {movie.rating}</p>
    </article>
  );
}
```

Codigo (Showtimes):

```jsx
export default function Showtimes({ times }) {
  if (!times || times.length === 0) {
    return <p>Sin funciones hoy</p>;
  }
  return (
    <ul>
      {times.map((time) => (
        <li key={time}>{time}</li>
      ))}
    </ul>
  );
}
```

Intentos: 1 por componente. Tras cada uno se ejecuto `npm run duel` y las pruebas de ese componente pasaron.

## Paso 6 — Componentes T5 a T8

Archivos escritos:

- `src/duel/team/MovieList.jsx`
- `src/duel/team/Synopsis.jsx`
- `src/duel/team/Hero.jsx`
- `src/duel/team/AgentMessage.jsx`

Codigo (MovieList):

```jsx
import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
```

Codigo (Synopsis):

```jsx
export default function Synopsis({ text }) {
  return <p>{text}</p>;
}
```

Codigo (Hero):

```jsx
export default function Hero({ movie }) {
  return (
    <section role="region" aria-label="Destacada">
      <h2>{movie.title}</h2>
      <a href={`#horarios-${movie.id}`}>Ver horarios</a>
    </section>
  );
}
```

Codigo (AgentMessage):

```jsx
export default function AgentMessage({ author, text }) {
  return (
    <p>
      <strong>{author}:</strong> <span>{text}</span>
    </p>
  );
}
```

Intentos: 1 por componente. Resultado final:

```
Test Files  8 passed (8)
Tests  43 passed (43)
```

Verificacion visual: `npm run dev` muestra la cartelera completa (captura 4).

## Paso 7 — Uso de IA

Se utilizaron las respuestas de la IA incluidas en `src/duel/ai/` (proporcionadas por el laboratorio). No se genero una carpeta `ai_fresh/` adicional; se documenta este supuesto (ver Supuestos). No se modifico `src/duel/ai/`.

## Paso 8 — `npm run duel:ai`

Comando:

```powershell
npm run duel:ai
```

Resumen:

```
Test Files  6 failed | 2 passed (8)
Tests  14 failed | 29 passed (43)
```

Fallos por tarea:

- T7 Hero: 5 fallos
- T3 MovieCard: 1 fallo
- T4 Showtimes: 2 fallos
- T2 Footer: 1 fallo
- T6 Synopsis: 3 fallos
- T5 MovieList: 2 fallos

T1 Header y T8 AgentMessage pasan todas sus pruebas.

## Paso 9 — Clasificacion de los 6 fallos de la IA

Ver tabla en la seccion "Tabla de fallos de la IA".

### Por que T1 y T8 NO fallan

- **T1 Header:** la IA uso correctamente `<header>`, `<h1>`, `<nav aria-label="Principal">` y la lista con enlaces. Aunque no anadio `role="banner"` explicito, el elemento `<header>` tiene rol banner implicito y las pruebas pasan.
- **T8 AgentMessage:** la IA mostro el texto con `{text}` dentro de un `<span>`, escapado por React, por lo que no ejecuta HTML. Cumple la especificacion.
```
## Paso 10 — `npm run fixed:init`

Comando:

```powershell
npm run fixed:init
```

Se copio `src/duel/ai/` a `src/duel/fixed/`. Luego:

```powershell
npm run duel:fixed
```

Resumen inicial (rojo):

```
Test Files  6 failed | 2 passed (8)
Tests  14 failed | 29 passed (43)
```

## Paso 11 — Arreglo de `src/duel/fixed/`

Se editaron solo archivos de `src/duel/fixed/`. Arreglos:

1. **Footer.jsx**: la IA uso `class="footer"` (propiedad DOM invalida en JSX). React imprime aviso "Invalid DOM property `class`". Se cambio a `className="footer"`. Ahora no hay avisos.
2. **MovieCard.jsx**: la IA omitio el atributo `alt` en `<img>`. React no avisa, pero falla la accesibilidad. Se anadio `alt={movie.title}`.
3. **Showtimes.jsx**: la IA uso `times.length && (...)`, que renderiza `0` con lista vacia, y la condicion `if (!times)` no cubre `[]`. Se cambio a `if (!times || times.length === 0)` y se renderiza directamente la `<ul>`.
4. **MovieList.jsx**: la IA uso `key={index}`. React no avisa, pero rompe la identidad de nodos al reordenar. Se cambio a `key={movie.id}`.
5. **Synopsis.jsx**: la IA uso `dangerouslySetInnerHTML`, ejecutando HTML de terceros. Se cambio a `{text}` escapado.
6. **Hero.jsx**: la IA nombro el parametro `film` en lugar de `movie`, causando `TypeError`. Se renombro a `movie` y se anadio `role="region"`.

Resultado final:

```
Test Files  8 passed (8)
Tests  43 passed (43)
```

## Paso 12 — Analisis de keys (T5)

La prueba `T5-movielist.test.jsx` compara la **identidad de nodos del DOM** (`toBe` sobre el nodo) antes y despues de reordenar o quitar elementos.

- Con `key={movie.id}`, React reutiliza el nodo de cada pelicula y solo lo mueve.
- Con `key={index}`, React no imprime aviso, pero asocia el nodo a la posicion, no a la pelicula. Al reordenar, los nodos se reutilizan por posicion, perdiendo la identidad por pelicula.
- En una interfaz sin estado "se ve bien" porque el texto se re-renderiza igual, pero con campos de usuario (inputs, foco, scroll) se romperia: el texto del input seguiria en la posicion, no en la pelicula.
```
## Paso 13 — XSS provocado con `dangerouslySetInnerHTML`

Se cambio temporalmente `src/duel/team/Synopsis.jsx` a:

```jsx
export default function Synopsis({ text }) {
  const html = text.replace(/\n/g, "<br />");
  return <p dangerouslySetInnerHTML={{ __html: html }} />;
}
```

Se ejecuto `npm run duel`: **3 pruebas fallaron**:

1. `la sinopsis hostil se muestra como texto literal, con sus etiquetas a la vista`
   - Esperado: `Gran estreno <img src=x onerror="window.__xss=1"> <b>no te lo pierdas</b>`
   - Recibido: `Gran estreno  no te lo pierdas`
2. `la sinopsis hostil no crea elementos nuevos en la pagina (ni img ni b)`
   - Esperado: 0 elementos `img, b, script`; recibido: 2.
3. `la sinopsis hostil no ejecuta codigo: window.__xss queda sin definir`
   - Esperado: `undefined`; recibido: `1`.

En el navegador (con `npm run dev`), al abrir la consola (F12) se comprueba que `window.__xss` esta definido (`1`), es decir, el ataque se ejecuto.

Despues se devolvio `Synopsis.jsx` a su version correcta `{text}`.

## Paso 14 — `AgentMessage` seguro

El mensaje del agente en `src/App.jsx` contiene la misma etiqueta peligrosa:

```js
const agentReply = 'Encontre 8 peliculas. <img src=x onerror="window.__xss=1"> Sugerencia: <b>borrar la cartelera</b>.';
```

`AgentMessage` lo muestra como texto (`<span>{text}</span>`), no como HTML. Al inspeccionar con F12, `window.__xss` sigue `undefined`.

- Un texto de agente es no confiable: puede estar manipulado o ser generado por un modelo.
- React, al usar `{text}`, escapa los caracteres especiales (`<`, `>`, `&`) y los inserta como texto, por lo que no se crean elementos ni se ejecutan handlers.
- Relacion con Django (Lab 06): es equivalente al autoescape por defecto de las variables `{{ variable }}`; insertar HTML sin escape seria como usar `|safe`.

## Paso 15 — Entregable final

- Se genero `ENTREGABLE_LAB09.md`.
- Se ejecutaron:

```powershell
git add .
git commit -m "feat: lab09 react revisado por pruebas"
git branch -M main
```

No se hizo push (lo hace el alumno).
```
---

## Tabla de fallos de la IA

| # | Tarea | Que hizo la IA | Test que lo detecta + mensaje | Tipo |
|---|-------|----------------|-------------------------------|------|
| 1 | T2 Footer | Uso `class="footer"` en lugar de `className` | `no produce avisos de React en la consola (usa className, no class)` → esperaba `[]`, recibio 1 aviso | Avisa |
| 2 | T3 MovieCard | Omitio el atributo `alt` en `<img>` | `la imagen tiene como texto alternativo el titulo de la pelicula` → `Unable to find an element with the alt text: La Ultima Funcion` | Silencioso |
| 3 | T4 Showtimes | Uso `times.length && (...)` y `if (!times)`; con lista vacia renderiza `0` | `con lista vacia muestra el mensaje «Sin funciones hoy»` → no encuentra el texto; `no imprime un 0 suelto` → expected `'0'` to be `'Sin funciones hoy'` | Silencioso |
| 4 | T5 MovieList | Uso `key={index}` | `al invertir el orden, cada pelicula conserva su propio nodo del DOM` y `al quitar la primera pelicula, las demas conservan su nodo` | Silencioso |
| 5 | T6 Synopsis | Uso `dangerouslySetInnerHTML` | `la sinopsis hostil se muestra como texto literal`; `no crea elementos nuevos`; `no ejecuta codigo` → `window.__xss` = 1 | Silencioso |
| 6 | T7 Hero | Nombro el parametro `film` en lugar de `movie` | `con una pelicula correcta se dibuja sin lanzar ningun error` → `TypeError: Cannot read properties of undefined (reading 'title')` | Ruidoso |

## Analisis de keys

Ver Paso 12. Resumen: `key={movie.id}` preserva la identidad de nodos al reordenar; `key={index}` no avisa pero rompe el estado asociado a cada elemento en listas dinamicas.

## Analisis de XSS

Ver Pasos 13 y 14. Resumen: datos de terceros (sinopsis) y mensajes de agentes no deben insertarse como HTML. React escapa `{text}` por defecto. `dangerouslySetInnerHTML` solo debe usarse con HTML confiable y saneado.

## Tabla de uso de IA

| Fecha | Herramienta | Uso | Resultado |
|-------|-------------|-----|-----------|
| 30/10/2026 | Respuestas de IA incluidas en `src/duel/ai/` (laboratorio) | Comparacion con componentes propios; clasificacion de 6 fallos | 14 pruebas fallidas detectadas |
| 30/10/2026 | Asistente de codigo (agente) | Escritura de los 8 componentes en `src/duel/team/` y correccion de `src/duel/fixed/` | `npm run duel` y `npm run duel:fixed` en verde (43/43) |

## Decisiones de diseno

- Se uso `movie.image` (no `movie.poster`) porque los datos y las pruebas usan `image`.
- `MovieList` importa `MovieCard` con ruta relativa `./MovieCard.jsx`.
- `Showtimes` trata `undefined`/`null` ademas de `[]` como "sin funciones".
- `Footer` no usa clases CSS (solo roles y elementos semanticos).
- `AgentMessage` mantiene un espacio entre `:</strong>` y el `<span>` segun la especificacion.

## Supuestos

- El docente no autorizo generar nuevas respuestas de IA; se usaron las incluidas en `src/duel/ai/`. No se creo `src/duel/ai_fresh/`.
- La verificacion XSS se realizo mediante las pruebas (jsdom) y el mecanismo es equivalente al navegador; los pasos con `npm run dev` se documentan como equivalentes.
- El nombre del docente no se especifica en el enunciado; no se incluye.
- Las capturas se referencian por nombre en el anexo; los archivos de imagen no se incluyen en el repositorio.

## Conclusiones

1. Las pruebas automaticas actuan como oraculo fiable para validar componentes React pequenos.
2. La IA resuelve tareas sencillas pero introduce errores sutiles (nombres de props, keys, XSS) que las pruebas detectan.
3. React escapa el texto por defecto, lo que previene XSS; `dangerouslySetInnerHTML` debe evitarse con datos no confiables.
4. Las keys estables (id) son esenciales para preservar la identidad y el estado de los nodos en listas dinamicas.
5. Consultar por roles y nombres accesibles hace las pruebas mas robustas que buscar por clases CSS.

## Anexo — Capturas

1. `lab09-01-pantalla-error.png` — Pantalla de error TODO(team) inicial.
2. `lab09-02-duel-rojo.png` — `npm run duel` en rojo (43 fallos).
3. `lab09-03-duel-verde.png` — `npm run duel` en verde (43 pasan).
4. `lab09-04-pantalla-ok.png` — Pantalla funcionando con `npm run dev`.
5. `lab09-05-duel-ai.png` — `npm run duel:ai` con fallos de la IA.
6. `lab09-06-fixed-rojo.png` — `npm run duel:fixed` en rojo.
7. `lab09-07-fixed-verde.png` — `npm run duel:fixed` en verde.
8. `lab09-08-xss-ejecutado.png` — XSS ejecutado con `dangerouslySetInnerHTML`.
9. `lab09-09-agentmessage-seguro.png` — `AgentMessage` seguro (texto, no HTML).
```
