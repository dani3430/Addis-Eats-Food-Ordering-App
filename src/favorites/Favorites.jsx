import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Utensils } from 'lucide-react';
import { useFavorites } from './favoritesStore';
import { DishCard } from '../menu/DishCard';
import DishDetailModal from '../menu/DishDetail';
import { fetchDishes } from '../api/dishes';

export default function Favorites() {
  const { favorites } = useFavorites();
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    fetchDishes()
      .then((data) => {
        if (isMounted) {
          const filtered = data.filter(
            (dish) =>
              favorites.includes(dish.id) &&
              dish.isVisible !== false &&
              dish.isActive !== false
          );
          setFavoriteDishes(filtered);
        }
      })
      .catch((err) => console.error('Failed to load favorites:', err))
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [favorites]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 dark:text-slate-400 font-medium">
        Loading saved favorites...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Saved Dishes
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Your quick-access list of favorite culinary picks
        </p>
      </div>

      {favoriteDishes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-4">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Click the heart icon on any dish card to save it here for easy access.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-2.5 bg-[#D04818] text-white font-bold text-xs rounded-xl hover:bg-[#b03a12] transition-colors inline-flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" /> Browse Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onSelectDish={setSelectedDish}
          />
          ))}
        </div>
      )}
      <DishDetailModal
        key={selectedDish?.id || 'favorite-detail'}
        dish={selectedDish}
        isOpen={Boolean(selectedDish)}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
}