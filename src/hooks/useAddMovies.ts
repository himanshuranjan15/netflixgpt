import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {
  addNowPlayingMovies,
  addUpcomingMovies,
  addPopularMovies,
  addTopRatedMovies,
} from "../utils/movieSlice";
import { useDispatch } from "react-redux";
const useAddMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData?.results));
  };
  const getPopularMovieList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData?.results));
  };
  const getUpcomingMovieList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addUpcomingMovies(jsonData?.results));
  };
  const getTopRatedMovieList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addTopRatedMovies(jsonData?.results));
  };

  useEffect(() => {
    getNowPlayingList();
    getPopularMovieList();
    getUpcomingMovieList();
    getTopRatedMovieList();
  });
};

export default useAddMovies;
