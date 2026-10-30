export default function Hero({ movie }) {
  return (
    <section role="region" aria-label="Destacada" className="hero">
      <h2>{movie.title}</h2>
      <a href={`#horarios-${movie.id}`}>Ver horarios</a>
    </section>
  );
}
