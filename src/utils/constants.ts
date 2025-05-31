export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const TMDB_API = "https://api.themoviedb.org/3/movie";
export const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGS = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "hindi",
    name: "Hindi",
  },
  {
    identifier: "spanish",
    name: "Spanish",
  },
];

// export const ;
