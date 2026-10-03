import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Core Pages
import Layout from './Layout';
import Menu from './menu/Menu';
import Home from './Home';

// Feature Components
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Favorites from './favorites/Favorites';
import { FavoritesProvider } from './favorites/favoritesStore';
import OrderHistory from './orders/OrderHistory';
import { OrderHistoryProvider } from './orders/orderHistoryStore';

// Admin Module
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import DishManager from './admin/DishManager';
import OrderManager from './admin/OrderManager';

// Auth Guards & Context Providers
import RequireAdmin from './admin/RequireAdmin';
import { ThemeProvider } from './theme/ThemeContext';
import { AuthProvider } from './auth/AuthProvider';
import { CartProvider } from './cart/cartStore';
import { AdminAuthProvider } from './admin/useAdminAuth';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <OrderHistoryProvider>
              <AdminAuthProvider>
                <Router>
                  <Routes>
                {/* Public & Customer Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="menu" element={<Menu />} />
                  
                  <Route path="cart" element={<Cart />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="orders" element={<OrderHistory />} />
                  <Route path="checkout" element={<Checkout />} />
                </Route>

                {/* Admin Portal Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminLayout />
                    </RequireAdmin>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="dishes" element={<DishManager />} />
                  <Route path="orders" element={<OrderManager />} />
                </Route>
                  </Routes>
                </Router>
                <Toaster
                  position="top-center"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      borderRadius: '12px',
                      background: '#1C1B1F',
                      color: '#fff',
                    },
                  }}
                />
              </AdminAuthProvider>
            </OrderHistoryProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}