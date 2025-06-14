interface VideoTitleProps {
  title: string;
  overview: string;
}

const VideoTitle = ({ title, overview }: VideoTitleProps) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black py-4 px-8 text-xl rounded-xl hover:opacity-80">
          ▶️Play
        </button>
        <button className=" mx-2 bg-slate-400 text-white py-4 px-8 text-xl rounded-xl">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
