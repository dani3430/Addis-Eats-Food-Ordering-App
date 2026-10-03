
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { formatETB } from '../utils/formatCurrency';
import { useCart } from '../cart/cartStore';
import FavoriteButton from '../favorites/FavoriteButton';
import toast from 'react-hot-toast';
import { getDishRating } from '../utils/ratings';

export const DishCard = ({ dish, onSelectDish }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [displayRating, setDisplayRating] = useState(() => getDishRating(dish));

  useEffect(() => {
    const refreshRating = (event) => {
      if (event.detail?.dishId === dish.id) setDisplayRating(getDishRating(dish));
    };
    window.addEventListener('dish-rating-updated', refreshRating);
    return () => window.removeEventListener('dish-rating-updated', refreshRating);
  }, [dish]);

  const handleCardClick = () => {
    if (onSelectDish) {
      onSelectDish(dish);
    } else {
      navigate(`/menu/${dish.id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(dish, 1);
    toast.success(`${dish.name} added to your cart.`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden cursor-pointer flex flex-col group relative"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={dish.image || 'https://via.placeholder.com/400x300?text=Addis+Eats'}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Addis+Eats';
          }}
        />
        {dish.isChefSignature && (
          <span className="absolute top-3 left-3 bg-[#D04818] text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow z-10">
            Chef's Choice
          </span>
        )}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton dishId={dish.id} />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#D04818] transition-colors">
              {dish.name}
            </h3>
            <div className="flex items-center text-amber-500 text-xs font-semibold gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{displayRating || dish.rating || '4.8'}</span>
            </div>
          </div>

          {dish.amharicName && (
            <p className="text-xs text-slate-500 mb-2 font-medium">{dish.amharicName}</p>
          )}

          <p className="text-sm text-slate-600 line-clamp-2 mb-4">
            {dish.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-900">
            {formatETB(dish.price)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="p-2 bg-[#D04818] text-white rounded-xl hover:bg-[#b03a12] transition-colors shadow-sm flex items-center justify-center"
            aria-label={`Add ${dish.name} to cart`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;