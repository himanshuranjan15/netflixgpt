import useAddMovies from "../hooks/useAddMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useAddMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />

      {/*
        Main Container
          - Video Background
        Secondary container
          - Movielist * n
            - cards * n
        */}
    </div>
  );
};

export default Browse;
