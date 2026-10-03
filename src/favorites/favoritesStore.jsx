/* eslint-disable react-refresh/only-export-components */
import { useAppStore } from '../store/appStore';

export function FavoritesProvider({ children }) {
  return children;
}

export const useFavorites = () => {
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorite = (dishId) => favorites.includes(dishId);

  return { favorites, toggleFavorite, isFavorite };
};
