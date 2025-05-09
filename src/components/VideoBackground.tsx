import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { RootState } from "../utils/appStore";
interface VideoBackgroundProps {
  movieId: string;
}
const VideoBackground = ({ movieId }: VideoBackgroundProps) => {
  // https://www.youtube.com/watch?v=tlLsFEDHtWs
  useMovieTrailer(movieId);
  const trailerVideo = useSelector(
    (store: RootState) => store.movies?.trailerVideo
  );
  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo +
          "?&autoplay=1&mute=1&loop=1&controls=0"
        }
        title="YouTube video player"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"

        // autoPl
      ></iframe>{" "}
    </div>
  );
};

export default VideoBackground;
