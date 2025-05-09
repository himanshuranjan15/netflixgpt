import React, { useRef } from "react";
import { useAppDispath, useAppSelector } from "../utils/reduxHooks";

import lang from "../utils/languageConstant";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const presferredLang: string = useAppSelector((store) => store.config.lang);
  const searchText = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispath();
  // fetch(
  //   "https://api.themoviedb.org/3/search/movie?query=and%20Ae%20Dil%20Hai%20Mushkil&include_adult=false&language=en-US&page=1",
  //   options
  // );

  const searchMovieTMDB = async (movie: string) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + movie,
      API_OPTIONS
    );
    const jsonData = await data.json();

    return jsonData?.results;
  };

  const handleGPTSearchClick = async () => {
    //Make API call here
    const userInput = searchText.current?.value;

    const ollamaQuery =
      "You are Netflix GPT-  A movie recommendation system. User will ask for recommendation for movies list.Just provide them with 5 titles of the movie.SAY NOTHING ELSE , just comma separated list? User has asked for:" +
      userInput;
    const ollamaResponse = await client.chat({
      model: "deepseek-coder-v2:16b-lite-instruct-q8_0",
      messages: [
        {
          role: "user",
          content: ollamaQuery,
        },
      ],
    });
    // console.log(response.message.content);

    const ollamaRecommendation = ollamaResponse.message.content
      .split(",")
      .map((title) => title.trim());
    console.log(ollamaRecommendation);

    const promiseArray = ollamaRecommendation.map((movie) =>
      searchMovieTMDB(movie)
    );
    const tmdbResults = await Promise.all(promiseArray); // ✅ wait for the actual data
    dispatch(
      addGPTMovieResults({
        movieNames: ollamaRecommendation,
        movieResults: tmdbResults,
      })
    ); // ✅ dispatch plain array data
  };
  return (
    <div className="pt-[10%] flex  justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9"
          placeholder={lang[presferredLang].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg"
          onClick={handleGPTSearchClick}
        >
          {lang[presferredLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
