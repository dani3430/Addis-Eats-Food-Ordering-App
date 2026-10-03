import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('addisEatsTheme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const readLegacyStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      cart: readLegacyStorage('addis_eats_cart', []),
      favorites: readLegacyStorage('addisEatsFavorites', []),
      orders: readLegacyStorage('addisEatsOrders', []),
      user: readLegacyStorage('addisEatsCustomer', null),
      theme: initialTheme(),
      isAdminAuthenticated: false,

      addToCart: (dish, quantity = 1, customizations = {}) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === dish.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...dish, quantity, customizations }] };
        }),
      updateQuantity: (dishId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(dishId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === dishId ? { ...item, quantity } : item
          ),
        }));
      },
      removeFromCart: (dishId) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== dishId) })),
      clearCart: () => set({ cart: [] }),

      toggleFavorite: (dishId) =>
        set((state) => ({
          favorites: state.favorites.includes(dishId)
            ? state.favorites.filter((id) => id !== dishId)
            : [...state.favorites, dishId],
        })),

      addOrder: (orderData) => {
        const newOrder = {
          ...orderData,
          id: `AE-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString(),
          status: 'Preparing',
          total: orderData.total ?? orderData.totalAmount ?? 0,
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),
      deleteOrder: (orderId) =>
        set((state) => ({ orders: state.orders.filter((order) => order.id !== orderId) })),

      login: (email, name) => {
        const user = { id: Date.now().toString(), email, name };
        set({ user });
        return user;
      },
      logout: () => set({ user: null }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      adminLogin: (username, password) => {
        if (username === 'admin' && password === 'admin123') {
          set({ isAdminAuthenticated: true });
          return true;
        }
        return false;
      },
      adminLogout: () => set({ isAdminAuthenticated: false }),
    }),
    {
      name: 'addis-eats-store',
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        orders: state.orders,
        user: state.user,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) localStorage.setItem('addisEatsTheme', state.theme);
      },
    }
  )
);

export const selectCart = (state) => state.cart;
export const selectCartTotalItems = (state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
