import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GPTSearchBar from '../GPTSearchBar'; // Adjust path as needed
import { useAppSelector, useAppDispatch, mockDispatch } from '../../utils/reduxHooksMock'; // Using the mock
import openai from '../../utils/openaiMock'; // Using the mock
import languageConstant from '../../utils/languageConstantMock'; // Using the mock
import { API_OPTIONS } from '../../utils/constantsMock'; // Using the mock
import { setGPTSearchLoading, addGPTMovieResults, setGPTSearchError } from '../../utils/gptSlice';


// Mock Redux hooks from our manual mock
jest.mock('../../utils/reduxHooks', () => require('../../utils/reduxHooksMock'));
// Mock openai from our manual mock (if not already globally mocked effectively by jest.config.js)
jest.mock('../../utils/openai', () => require('../../utils/openaiMock'));
// Mock languageConstant (if not already globally mocked effectively by jest.config.js)
jest.mock('../../utils/languageConstant', () => require('../../utils/languageConstantMock'));
// Mock constants (if not already globally mocked effectively by jest.config.js)
jest.mock('../../utils/constants', () => require('../../utils/constantsMock'));


// Mock fetch for TMDB search
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [{ id: 1, name: 'Mock Movie' }] }),
  })
) as jest.Mock;


describe('GPTSearchBar Component', () => {
  const mockMovieName = "Test Movie";
  const mockGptQuery = `Act as a movie recommendation system and suggest some movies for the query: ${mockMovieName}. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Movie1, Movie2, Movie3, Movie4, Movie5`;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup default mock for useAppSelector
    useAppSelector.mockReturnValue({ lang: 'en' }); // Default language
    useAppDispatch.mockReturnValue(mockDispatch); // Ensure mockDispatch is returned

    // Reset fetch mock
    (global.fetch as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockImplementation(() =>
        Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [{ id: 1, name: 'Mock Movie Result' }] }),
        })
    );
  });

  test('renders search input and button', () => {
    render(<GPTSearchBar />);
    expect(screen.getByPlaceholderText(languageConstant.en.gptSearchPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: languageConstant.en.search })).toBeInTheDocument();
  });

  test('allows user to type in search input', () => {
    render(<GPTSearchBar />);
    const inputElement = screen.getByPlaceholderText(languageConstant.en.gptSearchPlaceholder);
    fireEvent.change(inputElement, { target: { value: 'Inception' } });
    expect(inputElement).toHaveValue('Inception');
  });

  test('dispatches loading, calls OpenAI, fetches movie details, and dispatches results on search', async () => {
    // Mock OpenAI response
    openai.chat.completions.create.mockResolvedValueOnce({
      choices: [{ message: { content: "Movie1, Movie2, Movie3, Movie4, Movie5" } }],
    });

    // Mock TMDB API response for each movie
    const mockTmdbResults = [
      { results: [{ id: 1, name: 'Movie1 result' }] },
      { results: [{ id: 2, name: 'Movie2 result' }] },
      { results: [{ id: 3, name: 'Movie3 result' }] },
      { results: [{ id: 4, name: 'Movie4 result' }] },
      { results: [{ id: 5, name: 'Movie5 result' }] },
    ];

    (global.fetch as jest.Mock)
        .mockResolvedValueOnce(Promise.resolve({ ok: true, json: () => Promise.resolve(mockTmdbResults[0]) }))
        .mockResolvedValueOnce(Promise.resolve({ ok: true, json: () => Promise.resolve(mockTmdbResults[1]) }))
        .mockResolvedValueOnce(Promise.resolve({ ok: true, json: () => Promise.resolve(mockTmdbResults[2]) }))
        .mockResolvedValueOnce(Promise.resolve({ ok: true, json: () => Promise.resolve(mockTmdbResults[3]) }))
        .mockResolvedValueOnce(Promise.resolve({ ok: true, json: () => Promise.resolve(mockTmdbResults[4]) }));


    render(<GPTSearchBar />);
    const inputElement = screen.getByPlaceholderText(languageConstant.en.gptSearchPlaceholder);
    const searchButton = screen.getByRole('button', { name: languageConstant.en.search });

    fireEvent.change(inputElement, { target: { value: mockMovieName } });
    fireEvent.click(searchButton);

    // 1. Check if setGPTSearchLoading was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setGPTSearchLoading());

    // 2. Check if OpenAI API was called
    await waitFor(() => {
      expect(openai.chat.completions.create).toHaveBeenCalledWith({
        messages: [{ role: 'user', content: mockGptQuery }],
        model: 'gpt-3.5-turbo',
      });
    });

    // 3. Check if TMDB API (fetch) was called for each movie
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(5); // For 5 movies
        ["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"].forEach(movie => {
            expect(global.fetch).toHaveBeenCalledWith(
                `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS
            );
        });
    });

    // 4. Check if addGPTMovieResults was dispatched with correct data
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addGPTMovieResults({
        movieNames: ["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"],
        movieResults: [
            mockTmdbResults[0].results,
            mockTmdbResults[1].results,
            mockTmdbResults[2].results,
            mockTmdbResults[3].results,
            mockTmdbResults[4].results
        ],
      }));
    });
  });

  test('handles OpenAI API error and dispatches setGPTSearchError', async () => {
    const errorMessage = "OpenAI API Error";
    openai.chat.completions.create.mockRejectedValueOnce(new Error(errorMessage));

    render(<GPTSearchBar />);
    const inputElement = screen.getByPlaceholderText(languageConstant.en.gptSearchPlaceholder);
    const searchButton = screen.getByRole('button', { name: languageConstant.en.search });

    fireEvent.change(inputElement, { target: { value: "Another Movie" } });
    fireEvent.click(searchButton);

    expect(mockDispatch).toHaveBeenCalledWith(setGPTSearchLoading());

    await waitFor(() => {
      expect(openai.chat.completions.create).toHaveBeenCalled();
    });

    await waitFor(() => {
      // The component catches the error and dispatches setGPTSearchError
      // with a generic message or the error message.
      // Based on current GPTSearchBar, it doesn't pass the specific error message.
      // It would dispatch addGPTMovieResults with nulls or an empty state, or a specific error action.
      // For this test, let's assume it should dispatch setGPTSearchError.
      // We need to add error handling in GPTSearchBar.tsx for this to pass.
      // If GPTSearchBar doesn't catch and dispatch an error action, this part of the test will fail.
      // For now, we expect setGPTSearchError to be called.
      // The actual GPTSearchBar.tsx doesn't have a try-catch for openai call to dispatch setGPTSearchError.
      // It would try to read properties of undefined if API call fails.
      // This test highlights a need for error handling in the component.
      // Let's assume for now the component is updated to dispatch setGPTSearchError.
      expect(mockDispatch).toHaveBeenCalledWith(setGPTSearchError("Failed to fetch GPT suggestions."));
    });

    expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: addGPTMovieResults.type }));
  });

  test('handles TMDB API fetch error for one of the movies', async () => {
    openai.chat.completions.create.mockResolvedValueOnce({
        choices: [{ message: { content: "MovieA, MovieB" } }],
    });

    (global.fetch as jest.Mock)
        .mockResolvedValueOnce(Promise.resolve({ ok: true, json: () => Promise.resolve({ results: [{id: 1, name: "MovieA Result"}]}) }))
        .mockResolvedValueOnce(Promise.resolve({ ok: false, status: 500 })); // MovieB fetch fails

    render(<GPTSearchBar />);
    fireEvent.change(screen.getByPlaceholderText(languageConstant.en.gptSearchPlaceholder), { target: { value: "Query" } });
    fireEvent.click(screen.getByRole('button', { name: languageConstant.en.search }));

    await waitFor(() => {
        // Even if one TMDB call fails, addGPTMovieResults should be called.
        // The failed movie's results will be an empty array in searchMovieTMDB.
        expect(mockDispatch).toHaveBeenCalledWith(addGPTMovieResults({
            movieNames: ["MovieA", "MovieB"],
            movieResults: [[{id: 1, name: "MovieA Result"}], []], // MovieB results is empty array
        }));
    });
    // We might also dispatch a specific error for the part that failed, or a general one.
    // Current component structure doesn't explicitly dispatch a partial error.
  });

});
