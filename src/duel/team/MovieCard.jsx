// Task 3
// Props: movie = { id, title, image, synopsis, rating, showtimes }.
export default function MovieCard({ movie }) {
  return (
    <article>
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>★ {movie.rating}</p>
    </article>
  );
}
