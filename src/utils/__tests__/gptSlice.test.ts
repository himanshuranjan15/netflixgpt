import gptReducer, {
  toggleGPTSearchView,
  addGPTMovieResults,
  setGPTSearchLoading,
  setGPTSearchError,
  clearGPTSearchResults,
  initialState as gptInitialState // Assuming initialState is exported, or redefine it here
} from '../gptSlice'; // Adjust path as needed

// If initialState is not exported from the slice, define it here based on the slice definition
const initialState = {
  active: false,
  gptMovies: null,
  movieNames: [],
  movieResults: null,
  isLoading: false,
  error: null as string | null,
};


describe('gptSlice reducer', () => {
  test('should return the initial state', () => {
    expect(gptReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle toggleGPTSearchView', () => {
    let state = { ...initialState, active: false };
    state = gptReducer(state, toggleGPTSearchView());
    expect(state.active).toBe(true);
    state = gptReducer(state, toggleGPTSearchView());
    expect(state.active).toBe(false);
  });

  test('should handle addGPTMovieResults', () => {
    const payload = {
      movieNames: ['Movie 1', 'Movie 2'],
      movieResults: [['Result 1A', 'Result 1B'], ['Result 2A']],
    };
    const state = gptReducer(initialState, addGPTMovieResults(payload));
    expect(state.movieNames).toEqual(payload.movieNames);
    expect(state.movieResults).toEqual(payload.movieResults);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('should handle addGPTMovieResults when previous state had error/loading', () => {
    const payload = {
      movieNames: ['Movie 1'],
      movieResults: [['Result 1']],
    };
    const previousState = { ...initialState, isLoading: true, error: "Some error" };
    const state = gptReducer(previousState, addGPTMovieResults(payload));
    expect(state.movieNames).toEqual(payload.movieNames);
    expect(state.movieResults).toEqual(payload.movieResults);
    expect(state.isLoading).toBe(false); // Should be reset
    expect(state.error).toBeNull(); // Should be cleared
  });

  test('should handle setGPTSearchLoading', () => {
    const previousState = { ...initialState, isLoading: false, error: "Some error" };
    const state = gptReducer(previousState, setGPTSearchLoading());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull(); // Error should be cleared
  });

  test('should handle setGPTSearchLoading when already loading', () => {
    const previousState = { ...initialState, isLoading: true, error: null };
    const state = gptReducer(previousState, setGPTSearchLoading());
    expect(state.isLoading).toBe(true); // Still true
    expect(state.error).toBeNull();
  });

  test('should handle setGPTSearchError', () => {
    const errorPayload = 'Failed to fetch suggestions';
    const previousState = { ...initialState, isLoading: true, error: null };
    const state = gptReducer(previousState, setGPTSearchError(errorPayload));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorPayload);
  });

  test('should handle clearGPTSearchResults', () => {
    const previousState = {
      active: true, // Should not be affected by clearGPTSearchResults
      gptMovies: ['Some old movies'], // This property is not cleared by the current clearGPTSearchResults
      movieNames: ['Old Movie'],
      movieResults: [['Old Result']],
      isLoading: true,
      error: 'Some Error',
    };
    const state = gptReducer(previousState, clearGPTSearchResults());
    expect(state.movieNames).toEqual([]);
    expect(state.movieResults).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.active).toBe(true); // Check that 'active' state is preserved
    expect(state.gptMovies).toEqual(['Some old movies']); // Check that 'gptMovies' is preserved
  });
});
