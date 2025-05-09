import { Key } from "react";
import MovieCards from "./MovieCards";
interface MovieListsProps {
  title: string;
  movies: null | [];
}
const MovieLists = ({ title, movies }: MovieListsProps) => {
  //   console.log(movies);
  if (!movies) return;
  //   const poster_path =
  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {/* <MovieCards poster_path={movies[0].poster_path} /> */}
          {movies.map(
            (movie: {
              id: Key | null | undefined;
              poster_path: string | null;
            }) => (
              <MovieCards key={movie.id} poster_path={movie.poster_path} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieLists;
