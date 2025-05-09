// import { useSelector } from "react-redux";
import useAddMovies from "../hooks/useAddMovies";
import GPTSearch from "./GPTSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useAppSelector } from "../utils/reduxHooks";

const Browse = () => {
  const showGPTSearch = useAppSelector((store) => store.gpt.active);

  useAddMovies();

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
