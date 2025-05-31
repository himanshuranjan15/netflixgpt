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
    // Adjusted padding for different screen sizes: px-2 on smallest, sm:px-4, md:px-6 for larger screens.
    // Kept my-4 for consistent vertical margin.
    <div className="px-2 sm:px-4 md:px-6 my-4">
      {/* Adjusted title font size for responsiveness: text-lg on smallest, sm:text-xl, md:text-3xl for larger screens. */}
      {/* Retained py-4 for vertical padding around the title. */}
      <h1 className="text-lg sm:text-xl md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar scroll-smooth"> {/* Added scroll-smooth */}
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
