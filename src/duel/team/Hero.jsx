// Task 7
// Props: movie (a movie object).
export default function Hero({ movie }) {
  return (
    <section role="region" aria-label="Destacada">
      <h2>{movie.title}</h2>
      <a href={`#horarios-${movie.id}`}>Ver horarios</a>
    </section>
  );
}
