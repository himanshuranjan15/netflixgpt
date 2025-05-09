import React from "react";
import { useAppSelector } from "../utils/reduxHooks";

import lang from "../utils/languageConstant";

const GPTSearchBar = () => {
  const presferredLang: string = useAppSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex  justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 bg-white col-span-9"
          placeholder={lang[presferredLang].gptSearchPlaceholder}
        />
        <button className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg">
          {lang[presferredLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
