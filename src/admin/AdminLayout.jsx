import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ClipboardList, LogOut, Store, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from './useAdminAuth';

export function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Dishes', path: '/admin/dishes', icon: UtensilsCrossed },
    { label: 'Orders', path: '/admin/orders', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full shrink-0 md:w-72 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="px-3 py-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Addis Eats" className="h-11 w-11 rounded-xl border border-orange-200 bg-orange-50 p-1 object-contain" />
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Addis Eats</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Control Panel</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-xs font-semibold text-[#D04818] dark:bg-orange-950/30">
              <ShieldCheck className="h-4 w-4" /> Operations workspace
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#D04818] text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <NavLink
            to="/menu"
            className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <Store className="h-4 w-4" />
            Customer Storefront
          </NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full mt-4"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

// Ensures App.jsx can import as: import AdminLayout from './admin/AdminLayout'
export default AdminLayout;