import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
  // If movies is not provided or is empty, don't render the list part,
  // but still render the title container for consistency, or return null if title shouldn't show.
  // For this case, let's assume the title should always show, and an empty list means no movie cards.
  if (!movies) { // Handles null or undefined
    return (
      <div className="px-6">
        <h1 className="text-3xl py-4 text-white">{title}</h1>
        <div className="flex overflow-x-scroll">
          <div className="flex">
            {/* No movies to map */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} title={movie.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
