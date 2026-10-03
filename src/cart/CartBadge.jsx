import { ShoppingBag } from 'lucide-react';
import { useCart } from './cartStore';

export const CartBadge = ({ onClick }) => {
  const { totalItems } = useCart();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Shopping cart with ${totalItems} items`}
      className="relative inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none"
    >
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 z-20 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-[#D04818] rounded-full leading-none shadow-sm animate-scaleIn">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartBadge;