import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import CartBadge from './cart/CartBadge';
import ThemeToggle from './theme/ThemeToggle';

export const Layout = ({ children, onOpenCart }) => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navLinkStyle = ({ isActive }) =>
    `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#D04818] text-white font-semibold'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-slate-900 text-[#1C1B1F] dark:text-slate-100 transition-colors duration-200">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-wrap items-center justify-between gap-2">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img 
              src="/logo.png" 
              alt="Addis Eats Logo" 
              className="h-11 w-11 object-contain rounded-full border-2 border-[#D04818] bg-orange-50 p-1 shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} 
            />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Addis<span className="text-[#D04818]">Eats</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" end className={navLinkStyle}>Home</NavLink>
            <NavLink to="/menu" className={navLinkStyle}>Menu</NavLink>
            <NavLink to="/favorites" className={navLinkStyle}>Favorites</NavLink>
            <NavLink to="/orders" className={navLinkStyle}>Orders</NavLink>
          </nav>

          {/* Actions: Dark Mode Toggle & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <CartBadge onClick={onOpenCart || (() => navigate('/cart'))} />
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className="rounded-xl bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#D04818] dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 md:hidden"
              aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {isMobileNavOpen && (
          <nav className="border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-4">
              <NavLink to="/" end onClick={() => setIsMobileNavOpen(false)} className={navLinkStyle}>Home</NavLink>
              <NavLink to="/menu" onClick={() => setIsMobileNavOpen(false)} className={navLinkStyle}>Menu</NavLink>
              <NavLink to="/favorites" onClick={() => setIsMobileNavOpen(false)} className={navLinkStyle}>Favorites</NavLink>
              <NavLink to="/orders" onClick={() => setIsMobileNavOpen(false)} className={navLinkStyle}>Orders</NavLink>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 max-w-7xl w-full mx-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {children || <Outlet />}
      </main>

      {/* Structured 4-Column Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-16 text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#D04818] text-white font-bold px-2 py-0.5 rounded text-xs">AE</span>
              <span className="font-bold text-lg text-slate-900 dark:text-white">Addis Eats</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Addis Ababa's culinary concierge. Delivering traditional Ethiopian dishes and modern international cuisine straight to your doorstep.
            </p>
          </div>

          {/* Column 2: Neighborhoods */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Delivery Zones</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Bole & Atlas</li>
              <li>Kazanchis</li>
              <li>Piassa & Arat Kilo</li>
              <li>Sarbet & Old Airport</li>
            </ul>
          </div>

          {/* Column 3: Payment Options */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Payment Methods</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Telebirr</li>
              <li>CBE Birr</li>
              <li>Chapa Online Payment</li>
              <li>Cash on Delivery</li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/menu" className="hover:text-[#D04818]">Full Menu</Link></li>
              <li><Link to="/favorites" className="hover:text-[#D04818]">Saved Dishes</Link></li>
              <li><Link to="/orders" className="hover:text-[#D04818]">Order History</Link></li>
              <li><Link to="/admin/login" className="hover:text-[#D04818]">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Addis Eats PLC. Bole Sub-city, Addis Ababa, Ethiopia.</p>
          <p>Prices in ETB (Ethiopian Birr)</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;