import { useEffect } from "react";
import { API_OPTIONS, TMDB_API } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useAppDispath } from "../utils/reduxHooks";
const useMovieTrailer = (movieId: string) => {
  const dispatch = useAppDispath();

  const getMovieVideos = async () => {
    const data = await fetch(TMDB_API + "/" + movieId + "/videos", API_OPTIONS);
    const json = await data.json();
    const tailers = json.results.filter(
      (video: { type: string }) => video.type === "Trailer"
    );
    const finalTrailer = tailers.length ? tailers[0] : json.results[0];
    dispatch(addTrailerVideo(finalTrailer?.key));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
