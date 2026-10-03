import { useState } from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatETB } from '../utils/formatCurrency';
import { useCart } from '../cart/cartStore';
import FavoriteButton from '../favorites/FavoriteButton';
import toast from 'react-hot-toast';
import { getCustomerRating, getDishRating, updateDishRating } from '../utils/ratings';

export const DishDetailModal = ({ dish, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerRating, setCustomerRating] = useState(() => (dish ? getCustomerRating(dish) : 0));
  const [displayRating, setDisplayRating] = useState(() => (dish ? getDishRating(dish) : 0));
  const { addToCart } = useCart();

  if (!dish) return null;

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    toast.success(`${dish.name} added to your cart.`);
    setQuantity(1);
    onClose();
  };

  const handleRating = (rating) => {
    const next = updateDishRating(dish, rating);
    const removed = customerRating === rating;
    setCustomerRating(next.userRating);
    setDisplayRating(Number((next.total / next.count).toFixed(1)));
    toast.success(removed ? 'Your rating was removed.' : 'Thank you for rating this dish!');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dish.name}>
      <div className="space-y-4">
        {/* Dish Hero Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-64">
          <img
            src={dish.image || 'https://via.placeholder.com/600x400?text=Addis+Eats'}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Addis+Eats';
            }}
          />
          {dish.spiceProfile && (
            <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
              🌶️ {dish.spiceProfile}
            </span>
          )}
        </div>

        {/* Amharic Title & Rating */}
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{dish.name}</h4>
            {dish.amharicName && (
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{dish.amharicName}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500 text-sm font-semibold gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{displayRating || dish.rating || '4.8'}</span>
            </div>
            <FavoriteButton dishId={dish.id} />
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4 dark:border-orange-900/40 dark:bg-orange-950/20">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">How was your dish?</p>
          <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label="Rate this dish">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRating(rating)}
                className="rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D04818]"
                aria-label={`Rate ${rating} out of 5`}
                aria-checked={customerRating === rating}
                role="radio"
              >
                <Star className={`h-6 w-6 ${rating <= customerRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
              </button>
            ))}
            <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
              {customerRating ? `${customerRating}/5 · Tap again to remove` : 'Tap to rate'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{dish.description}</p>

        {/* Key Ingredients */}
        {dish.aromaticIngredients && (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Ingredients
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {dish.aromaticIngredients.map((ingredient, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Controls & Add to Cart CTA */}
        <div className="flex flex-col items-stretch justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center">
          <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="rounded-lg p-1 text-slate-700 transition-colors hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center text-base font-bold text-slate-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="rounded-lg p-1 text-slate-700 transition-colors hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <Button onClick={handleAddToCart} className="w-full py-3 text-base font-semibold sm:flex-1">
            Add to Cart • {formatETB(dish.price * quantity)}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DishDetailModal;