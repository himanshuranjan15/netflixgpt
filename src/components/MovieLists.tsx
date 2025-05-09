import MovieCards from "./MovieCards";

const MovieLists = ({ title, movies }) => {
  //   console.log(movies);
  if (!movies) return;
  //   const poster_path =
  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {/* <MovieCards poster_path={movies[0].poster_path} /> */}
          {movies.map((movie) => (
            <MovieCards key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieLists;
