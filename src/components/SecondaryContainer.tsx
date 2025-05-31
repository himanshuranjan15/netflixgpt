import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import usePopularMovies from "../hooks/usePopularMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"; // Import useNowPlayingMovies
import useTopRatedMovies from "../hooks/useTopRatedMovies"; // Import useTopRatedMovies
import useUpcomingMovies from "../hooks/useUpcomingMovies"; // Import useUpcomingMovies
import { RootState } from "../utils/appStore";

const SecondaryContainer = () => {
  // Fetch movies for all categories
  useNowPlayingMovies(); // Already fetches now playing movies for MainContainer, but we need it here too for the list
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const movies = useSelector((store: RootState) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-52 pl-4 md:pl-12 relative z-20">
        {movies.nowPlayingMovies && (
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        )}
        {movies.popularMovies && (
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        )}
        {movies.topRatedMovies && (
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        )}
        {movies.upcomingMovies && (
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
