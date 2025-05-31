import React from "react";

interface VideoTitleProps {
  title: string;
  overview: string;
}

const VideoTitle: React.FC<VideoTitleProps> = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 pt-[15%] md:pt-[20%] px-6 md:px-12 lg:px-24 flex flex-col justify-center text-white bg-gradient-to-r from-black via-black/70 to-transparent aspect-video z-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-xl">
        {title}
      </h1>
      <p className="py-4 md:py-6 text-sm sm:text-base md:text-lg w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 line-clamp-3 sm:line-clamp-4 md:line-clamp-5">
        {overview}
      </p>
      <div className="flex items-center mt-2 md:mt-4 space-x-3">
        <button className="bg-white text-black flex items-center justify-center py-2 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg md:text-xl font-semibold rounded-md hover:bg-opacity-80 transition-colors duration-200">
          {/* Using a simple SVG play icon, you can replace it with a more complex one or a library icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          Play
        </button>
        <button className="bg-gray-500 bg-opacity-70 text-white flex items-center justify-center py-2 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg md:text-xl font-semibold rounded-md hover:bg-opacity-60 transition-colors duration-200">
          {/* Using a simple SVG info icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.042.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.67-1.34l.042-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
