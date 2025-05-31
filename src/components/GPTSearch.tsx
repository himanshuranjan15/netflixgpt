import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10 ">
        <img src="animeLight.jpg" className="object-cover h-screen " />
      </div>
      <div className="pt-[30%] md:pt-0">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  );
};

export default GPTSearch;
