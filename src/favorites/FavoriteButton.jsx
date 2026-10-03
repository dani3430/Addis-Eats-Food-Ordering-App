import { Heart } from 'lucide-react';
import { useFavorites } from './favoritesStore';

export function FavoriteButton({ dishId }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(dishId);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite(dishId);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-200 hover:text-red-500"
      aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
    >
      <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
    </button>
  );
}

export default FavoriteButton;