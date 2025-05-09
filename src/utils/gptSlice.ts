import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    active: false,
    gptMovies: null,
    movieNames: [],
    movieResults: null,
  },

  reducers: {
    toggleGPTSearchView: (state) => {
      state.active = !state.active;
    },
    addGPTMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGPTSearchView, addGPTMovieResults } = gptSlice.actions;

export default gptSlice.reducer;
