export const TMDB_IMG = 'https://example.com/tmdb_img/';
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer test_token'
  }
};
// Add any other constants that might be imported by components under test
// For now, TMDB_IMG is the most critical for MovieCards.
// API_OPTIONS might be used by other components or thunks, good to have a mock.
// OPENAI_KEY is sensitive and should definitely be mocked if used directly in frontend components (though it ideally shouldn't be).
export const OPENAI_KEY = "mock_openai_key";
