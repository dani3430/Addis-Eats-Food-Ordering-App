import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from './cartStore';
import { formatETB } from '../utils/formatCurrency';
import Button from '../ui/Button';

export const CartPanel = ({ isOpen, onClose, onNavigateToCheckout }) => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-md max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] rounded-3xl border border-slate-200 bg-white shadow-2xl flex flex-col justify-between overflow-hidden dark:border-slate-700 dark:bg-slate-900">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D04818]" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Your Order</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 shadow-sm transition-all hover:border-[#D04818] hover:bg-orange-50 hover:text-[#D04818] focus:outline-none focus:ring-2 focus:ring-[#D04818] focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-orange-950/30"
              aria-label="Close cart"
              title="Close cart"
            >
              <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                <ShoppingBag className="w-12 h-12 stroke-1 text-slate-300 mb-3" />
                <p className="font-semibold text-slate-700 mb-1">Your cart is empty</p>
                <p className="text-sm">Add some delicious dishes from the menu to get started.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/64?text=Addis+Eats'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 bg-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#D04818] font-semibold mt-0.5">
                      {formatETB(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-white space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-bold text-slate-900 text-base">
                  {formatETB(subtotal)}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Clear Cart
                </button>
                <Button
                  onClick={handleCheckoutClick}
                  className="flex-1 font-semibold bg-[#D04818] hover:bg-[#b83d13] text-white py-2.5 rounded-xl"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;