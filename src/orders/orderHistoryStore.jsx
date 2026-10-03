/* eslint-disable react-refresh/only-export-components */
import { useAppStore } from '../store/appStore';
import { useCart } from '../cart/cartStore';

export function OrderHistoryProvider({ children }) {
  return children;
}

export const useOrderHistory = () => {
  const { addToCart } = useCart();
  const orders = useAppStore((state) => state.orders);
  const addOrder = useAppStore((state) => state.addOrder);
  const updateOrderStatus = useAppStore((state) => state.updateOrderStatus);
  const deleteOrder = useAppStore((state) => state.deleteOrder);
  const reorder = (order) => {
    order?.items?.forEach((item) => addToCart(item, item.quantity || 1));
  };

  return { orders, addOrder, reorder, updateOrderStatus, deleteOrder };
};
