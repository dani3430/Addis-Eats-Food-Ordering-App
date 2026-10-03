/* eslint-disable react-refresh/only-export-components */
import { useAppStore, selectCart, selectCartSubtotal, selectCartTotalItems } from '../store/appStore';

export function CartProvider({ children }) {
  return children;
}

export const useCart = () => {
  const cart = useAppStore(selectCart);
  const addToCart = useAppStore((state) => state.addToCart);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const clearCart = useAppStore((state) => state.clearCart);
  const totalItems = useAppStore(selectCartTotalItems);
  const subtotal = useAppStore(selectCartSubtotal);

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, subtotal };
};
