import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../MovieCard'; // Adjust path as necessary
import { IMG_CDN_URL } from '../../utils/constants'; // Adjust path as necessary

describe('MovieCard Component', () => {
  const mockMovie = {
    posterPath: '/testPoster.jpg',
    title: 'Test Movie Title',
  };

  test('renders movie poster correctly', () => {
    render(<MovieCard posterPath={mockMovie.posterPath} title={mockMovie.title} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', IMG_CDN_URL + mockMovie.posterPath);
    expect(imgElement).toHaveAttribute('alt', mockMovie.title);
  });

  test('renders movie title as alt text', () => {
    render(<MovieCard posterPath={mockMovie.posterPath} title={mockMovie.title} />);
    const imgElement = screen.getByAltText(mockMovie.title);
    expect(imgElement).toBeInTheDocument();
  });

  test('does not render if posterPath is null or empty', () => {
    const { container } = render(<MovieCard posterPath="" title={mockMovie.title} />);
    expect(container.firstChild).toBeNull();

    const { container: containerNull } = render(<MovieCard posterPath={null} title={mockMovie.title} />);
    expect(containerNull.firstChild).toBeNull();
  });

  // Optional: Test for presence of the container div if needed, though not strictly necessary if image is the main content
  test('renders the main div wrapper when posterPath is valid', () => {
    render(<MovieCard posterPath={mockMovie.posterPath} title={mockMovie.title} />);
    const imgElement = screen.getByRole('img');
    // Check if the image's parent div has the expected classes
    expect(imgElement.parentElement).toHaveClass('w-48 pr-4');
  });
});
