import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      API_OPTIONS
    );
    const jsonData = await data.json();
    console.log(jsonData?.results);
    dispatch(addNowPlayingMovies(jsonData?.results));
  };

  useEffect(() => {
    getNowPlayingList();
  });
};

export default useNowPlayingMovies;
