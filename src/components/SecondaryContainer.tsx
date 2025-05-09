import MovieLists from "./MovieLists";
import { useAppSelector } from "../utils/reduxHooks";

const SecondaryContainer = () => {
  const movies = useAppSelector((store) => store.movies);
  return (
    <div className="bg-black">
      <div className="-mt-55 pl-6 relative z-20">
        <MovieLists
          title={"Now Playing Movies"}
          movies={movies.nowPlayingMovies}
        />
        <MovieLists title={"Popular"} movies={movies.popularMovies} />
        <MovieLists title={"Upcoming"} movies={movies.upcomingMovies} />
        <MovieLists title={"Top Rated"} movies={movies.topRatedMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
