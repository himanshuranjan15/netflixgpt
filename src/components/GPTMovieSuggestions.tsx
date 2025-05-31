import { useAppSelector } from "../utils/reduxHooks";
import MovieLists from "./MovieLists";

const GPTMovieSuggestions = () => {
  // Destructure isLoading and error from the gpt store
  const { movieResults, movieNames, isLoading, error } = useAppSelector((store) => store.gpt);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="p-4 m-4 bg-black text-white opacity-90 text-center">
        <p className="text-lg">Loading suggestions...</p>
        {/* Optionally, add a spinner animation here */}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-4 m-4 bg-red-700 text-white text-center">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  // Handle no movie names or results after loading and no error
  if (!movieNames || movieNames.length === 0 || !movieResults) {
    // Check if it was not loading and there was no error, but still no movies.
    // This could mean "No suggestions found" or simply that a search hasn't been performed yet.
    // Depending on product requirements, this message might only show after a search attempt.
    // For now, if there are no names/results, and not loading, and no error, it implies no suggestions.
    return (
      <div className="p-4 m-4 bg-black text-white opacity-90 text-center">
        <p className="text-lg">No movie suggestions found. Try searching for something else!</p>
      </div>
    );
  }

  // Display movie suggestions
  return (
    <div className="p-4 m-4 bg-black text-white opacity-90">
      <div>
        {movieNames.map((movieName: string, index: number) => ( // Ensure index is number
          <MovieLists
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
