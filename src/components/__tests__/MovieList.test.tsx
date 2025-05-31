import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from '../MovieList'; // Adjust path as necessary
import MovieCard from '../MovieCard'; // Import the mocked MovieCard

// Mock MovieCard to simplify MovieList tests and avoid testing MovieCard's internals here
jest.mock('../MovieCard', () => {
  // Mocking the default export of MovieCard
  return jest.fn(({ posterPath, title }) => ( // Ensure mock signature matches usage
    <div data-testid="movie-card">
      <img src={posterPath} alt={title} />
      <p>{title}</p>
    </div>
  ));
});

describe('MovieList Component', () => {
  const mockMovies = [
    { id: 1, poster_path: '/poster1.jpg', title: 'Movie 1' },
    { id: 2, poster_path: '/poster2.jpg', title: 'Movie 2' },
    { id: 3, poster_path: '/poster3.jpg', title: 'Movie 3' },
  ];

  const listTitle = 'Popular Movies';

  test('renders the list title correctly', () => {
    render(<MovieList title={listTitle} movies={mockMovies} />);
    const titleElement = screen.getByText(listTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  test('renders a list of MovieCard components', () => {
    render(<MovieList title={listTitle} movies={mockMovies} />);
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  test('passes correct props to MovieCard components', () => {
    render(<MovieList title={listTitle} movies={mockMovies} />);

    const mockMovieCardInstance = MovieCard as jest.Mock;

    expect(mockMovieCardInstance.mock.calls.length).toBe(mockMovies.length);
    mockMovies.forEach((movie, index) => {
      const callArgs = mockMovieCardInstance.mock.calls[index];
      expect(callArgs[0]).toEqual(expect.objectContaining({ // Changed to toEqual for the props object
        posterPath: movie.poster_path,
        title: movie.title,
      }));
      // Optionally, assert the second argument if its state is consistent and important
      // For example, if it should always be undefined:
      // expect(callArgs[1]).toBeUndefined();
    });
  });

  test('renders an empty list correctly if movies array is empty', () => {
    render(<MovieList title={listTitle} movies={[]} />);
    const movieCards = screen.queryAllByTestId('movie-card');
    expect(movieCards).toHaveLength(0);
    // Check that the title still renders
    expect(screen.getByText(listTitle)).toBeInTheDocument();
  });

  test('renders correctly if movies array is undefined', () => {
    render(<MovieList title={listTitle} movies={undefined as any} />);
    const movieCards = screen.queryAllByTestId('movie-card');
    expect(movieCards).toHaveLength(0);
    expect(screen.getByText(listTitle)).toBeInTheDocument();
  });

  test('renders correctly if movies array is null', () => {
    render(<MovieList title={listTitle} movies={null as any} />);
    const movieCards = screen.queryAllByTestId('movie-card');
    expect(movieCards).toHaveLength(0);
    expect(screen.getByText(listTitle)).toBeInTheDocument();
  });

  // Snapshot test (optional, but good for catching UI regressions)
  test('matches snapshot', () => {
    const { asFragment } = render(<MovieList title={listTitle} movies={mockMovies} />);
    expect(asFragment()).toMatchSnapshot();
  });

   test('matches snapshot with empty movies list', () => {
    const { asFragment } = render(<MovieList title={listTitle} movies={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

});
