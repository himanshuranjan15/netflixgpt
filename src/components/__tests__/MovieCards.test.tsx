import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCards from '../MovieCards'; // Adjust path as needed

// Mock the constants import
jest.mock('../../utils/constants', () => ({
  TMDB_IMG: 'https://image.tmdb.org/t/p/w500',
}));

describe('MovieCards Component', () => {
  const defaultProps = {
    poster_path: '/test_poster.jpg',
    title: 'Test Movie Title',
    rating: 8.5,
  };

  test('renders correctly with a poster path', () => {
    render(<MovieCards poster_path={defaultProps.poster_path} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', `https://image.tmdb.org/t/p/w500${defaultProps.poster_path}`);
    // Default title and rating are provided in the component if not passed, let's test for those when not passed
    // The component defaults title to "Movie Title" and rating to 0.0
    // The overlay is opacity-0 by default, but the text should be in the document
    expect(screen.getByText('Movie Title')).toBeInTheDocument();
    // Rating 0.0 is not rendered by the component's conditional logic (rating > 0)
    // So, we should not find "Rating: 0.0"
    expect(screen.queryByText(/Rating: 0.0/i)).not.toBeInTheDocument();
  });

  test('displays the provided title and rating', () => {
    render(<MovieCards {...defaultProps} />);
    // The overlay is opacity-0 by default, but the text should be in the document
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${defaultProps.rating.toFixed(1)}`)).toBeInTheDocument();
  });

  test('uses title for alt text if provided, otherwise "Movie Card"', () => {
    const { rerender } = render(<MovieCards {...defaultProps} />);
    let imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', defaultProps.title);

    // Test default alt text when title is not provided
    rerender(<MovieCards poster_path={defaultProps.poster_path} />);
    imgElement = screen.getByRole('img');
    // The component defaults title to "Movie Title", which is then used for alt text
    expect(imgElement).toHaveAttribute('alt', 'Movie Title');
  });

  test('does not render if poster_path is null', () => {
    const { container } = render(<MovieCards poster_path={null} title="Test" rating={7} />);
    // The component returns null, so the container should be empty
    expect(container.firstChild).toBeNull();
  });

  // Testing CSS hover effects (opacity change) directly is complex with RTL/Jest.
  // We've already tested that the title and rating text are present in the document.
  // For group-hover, you'd typically need an integration test or a more specialized setup.
  // We trust that Tailwind CSS classes like `group-hover:opacity-100` work as expected.
  test('overlay text (title and rating) is present in the document', () => {
    render(<MovieCards {...defaultProps} />);
    // These elements are in the DOM but made visible by CSS on hover.
    // We verify their presence.
    const titleElement = screen.getByText(defaultProps.title);
    const ratingElement = screen.getByText(`Rating: ${defaultProps.rating.toFixed(1)}`);

    expect(titleElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();

    // Check if the parent div for overlay has opacity-0 initially.
    // This is a bit of an implementation detail test, but can verify initial state.
    // The text itself is not styled with opacity, its container is.
    const overlayContainer = titleElement.parentElement;
    expect(overlayContainer).toHaveClass('opacity-0');
    // And it should gain group-hover:opacity-100, which we can't easily test here.
  });

});
