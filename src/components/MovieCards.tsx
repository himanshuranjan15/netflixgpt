import { TMDB_IMG } from "../utils/constants";
interface MovieCardsProps {
  poster_path: string | null;
}
const MovieCards = ({ poster_path }: MovieCardsProps) => {
  return (
    <div className="w-48 pr-4">
      <img alt=" Movie Card" src={TMDB_IMG + poster_path} />
    </div>
  );
};

export default MovieCards;
