import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    active: false,
    gptMovies: null, // This seems like an older or alternative name for results, ensure consistency
    movieNames: [],
    movieResults: null,
    isLoading: false, // Added isLoading state
    error: null as string | null, // Added error state with type
  },

  reducers: {
    toggleGPTSearchView: (state) => {
      state.active = !state.active;
    },
    addGPTMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.isLoading = false; // Assuming loading finishes when results are added
      state.error = null; // Clear any previous errors
    },
    // Example reducers for loading and error states
    setGPTSearchLoading: (state) => {
      state.isLoading = true;
      state.error = null; // Clear error when starting to load
    },
    setGPTSearchError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearGPTSearchResults: (state) => { // Action to clear results, loading and error states
      state.movieNames = [];
      state.movieResults = null;
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const { toggleGPTSearchView, addGPTMovieResults, setGPTSearchLoading, setGPTSearchError, clearGPTSearchResults } = gptSlice.actions;

export default gptSlice.reducer;
