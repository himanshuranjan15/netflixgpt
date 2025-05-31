import { TMDB_IMG } from "../utils/constants";
interface MovieCardsProps {
  poster_path: string | null;
  title?: string; // Optional title prop
  rating?: number; // Optional rating prop
}
const MovieCards = ({ poster_path, title = "Movie Title", rating = 0.0 }: MovieCardsProps) => {
  if (!poster_path) return null; // Return null for cleaner conditional rendering

  return (
    // Adjusted card width for responsiveness: w-32 on smallest, w-40 on sm, w-48 on md and up.
    // Adjusted pr-2 on smallest, pr-4 on sm and up for spacing between cards.
    <div className="w-32 sm:w-40 md:w-48 pr-2 sm:pr-4 flex-shrink-0 relative group cursor-pointer">
      <div className="overflow-hidden rounded-lg shadow-lg group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-200 ease-in-out"> {/* Container for image and overlay text, with hover effects */}
        <img
          alt={title || "Movie Card"} // Use title for alt text if available
          src={TMDB_IMG + poster_path}
          className="w-full h-full object-cover" // Ensure image fills the container
        />
        {/* Adjusted padding for overlay on smaller screens: p-1 on smallest, p-2 on sm and up */}
        <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"> {/* Overlay for title and rating */}
          {/* Adjusted text size for title on smaller screens: text-xs on smallest, text-sm on sm and up */}
          <h3 className="text-xs sm:text-sm font-bold truncate">{title}</h3>
          {/* Adjusted text size for rating on smaller screens: text-xxs (custom or very small) on smallest, text-xs on sm and up */}
          {/* For simplicity, text-xs is kept, but for very small screens, further adjustment or hiding might be needed if text-xxs is not defined */}
          {rating > 0 && <p className="text-xs">Rating: {rating.toFixed(1)}</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
