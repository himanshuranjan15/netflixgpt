import movieReducer, {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrailerVideo,
} from '../movieSlice'; // Adjust path as needed

// Define the initial state based on the slice definition
const initialState = {
  nowPlayingMovies: null,
  popularMovies: null,
  upcomingMovies: null,
  topRatedMovies: null,
  trailerVideo: null,
};

describe('movieSlice reducer', () => {
  test('should return the initial state', () => {
    expect(movieReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addNowPlayingMovies', () => {
    const moviesPayload = [{ id: 1, title: 'Now Playing Movie 1' }, { id: 2, title: 'Now Playing Movie 2' }];
    const state = movieReducer(initialState, addNowPlayingMovies(moviesPayload));
    expect(state.nowPlayingMovies).toEqual(moviesPayload);
  });

  test('should handle addPopularMovies', () => {
    const moviesPayload = [{ id: 3, title: 'Popular Movie 1' }];
    const state = movieReducer(initialState, addPopularMovies(moviesPayload));
    expect(state.popularMovies).toEqual(moviesPayload);
  });

  test('should handle addTopRatedMovies', () => {
    const moviesPayload = [{ id: 4, title: 'Top Rated Movie 1' }];
    const state = movieReducer(initialState, addTopRatedMovies(moviesPayload));
    expect(state.topRatedMovies).toEqual(moviesPayload);
  });

  test('should handle addUpcomingMovies', () => {
    const moviesPayload = [{ id: 5, title: 'Upcoming Movie 1' }];
    const state = movieReducer(initialState, addUpcomingMovies(moviesPayload));
    expect(state.upcomingMovies).toEqual(moviesPayload);
  });

  test('should handle addTrailerVideo', () => {
    const trailerPayload = { id: 'trailer1', key: 'someKey' };
    const state = movieReducer(initialState, addTrailerVideo(trailerPayload));
    expect(state.trailerVideo).toEqual(trailerPayload);
  });

  test('should handle adding multiple movie types without interference', () => {
    let state = { ...initialState };
    const nowPlaying = [{ id: 1, title: 'NP1' }];
    const popular = [{ id: 2, title: 'P1' }];
    const trailer = { id: 't1', key: 'key1' };

    state = movieReducer(state, addNowPlayingMovies(nowPlaying));
    expect(state.nowPlayingMovies).toEqual(nowPlaying);
    expect(state.popularMovies).toBeNull(); // Other slices are unaffected

    state = movieReducer(state, addPopularMovies(popular));
    expect(state.nowPlayingMovies).toEqual(nowPlaying); // Previous state preserved
    expect(state.popularMovies).toEqual(popular);

    state = movieReducer(state, addTrailerVideo(trailer));
    expect(state.trailerVideo).toEqual(trailer);
    expect(state.popularMovies).toEqual(popular); // Other slices still preserved
  });

  test('should overwrite existing movies when new ones are added for the same category', () => {
    const initialNowPlaying = [{ id: 1, title: 'Old NP Movie' }];
    let state = { ...initialState, nowPlayingMovies: initialNowPlaying };

    const newNowPlaying = [{ id: 2, title: 'New NP Movie' }];
    state = movieReducer(state, addNowPlayingMovies(newNowPlaying));
    expect(state.nowPlayingMovies).toEqual(newNowPlaying); // Not appended, but overwritten
  });
});
