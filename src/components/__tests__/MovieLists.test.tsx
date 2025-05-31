import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieLists from '../MovieLists'; // Adjust path as needed

// Mock the MovieCards component
jest.mock('../MovieCards', () => {
  // The mock needs to be a function that returns a JSX element
  // It should also handle the props passed to it, especially 'key' and any data-testid for selection
  return jest.fn(({ poster_path, title }) => (
    <div data-testid="movie-card">
      <span>Mocked MovieCard</span>
      {poster_path && <span>{poster_path}</span>}
      {title && <span>{title}</span>}
    </div>
  ));
});

describe('MovieLists Component', () => {
  const mockMovies = [
    { id: '1', poster_path: '/poster1.jpg', title: 'Movie 1', vote_average: 7.5 },
    { id: '2', poster_path: '/poster2.jpg', title: 'Movie 2', vote_average: 8.0 },
  ];

  const defaultProps = {
    title: 'Popular Movies',
    movies: mockMovies,
  };

  test('renders the title', () => {
    render(<MovieLists {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('renders a list of MovieCards when movies are provided', () => {
    render(<MovieLists {...defaultProps} />);
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockMovies.length);

    // Check if MovieCards mock was called correctly
    mockMovies.forEach(movie => {
      expect(MovieCards).toHaveBeenCalledWith(
        expect.objectContaining({
          poster_path: movie.poster_path,
          // title: movie.title, // MovieLists doesn't pass title & rating to MovieCards
          // rating: movie.vote_average
        }),
        {} // Second argument to functional component calls (context)
      );
    });
  });

  test('does not render MovieCards if movies prop is an empty array', () => {
    render(<MovieLists title="Test List" movies={[]} />);
    // MovieCards should not be rendered, so queryByTestId should be null
    expect(screen.queryByTestId('movie-card')).not.toBeInTheDocument();
    // The title should still be rendered
    expect(screen.getByText("Test List")).toBeInTheDocument();
  });

  test('returns null and does not render if movies prop is null', () => {
    const { container } = render(<MovieLists title="Test List" movies={null} />);
    // The component returns null (or undefined due to `if (!movies) return;`), so the container should be empty or not contain list-specific elements
    // Specifically, the title should not be rendered if the component early exits.
    expect(screen.queryByText("Test List")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull(); // Or check for absence of specific child elements
  });

  test('passes correct poster_path to MovieCards', () => {
    render(<MovieLists {...defaultProps} />);
    // Check if MovieCards mock was called with correct poster_path for each movie
    mockMovies.forEach(movie => {
      expect(MovieCards).toHaveBeenCalledWith(
        expect.objectContaining({ poster_path: movie.poster_path }),
        {}
      );
    });
  });

});
