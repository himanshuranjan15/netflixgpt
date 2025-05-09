import { useAppSelector } from "../utils/reduxHooks";
import MovieLists from "./MovieLists";

const GPTMovieSuggestions = () => {
  const gpt = useAppSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return null;
  if (!movieResults) return null;
  return (
    <div className="p-4 m-4 bg-black text-white opacity-90">
      <div>
        {movieNames.map((movieName: string, index: string | number) => (
          <MovieLists
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
