// Task 5
// Props: movies (array of movie objects).
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
