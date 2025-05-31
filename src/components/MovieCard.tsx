import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

interface MovieCardProps {
  posterPath: string;
  title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="w-48 pr-4">
      <img alt={title} src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
