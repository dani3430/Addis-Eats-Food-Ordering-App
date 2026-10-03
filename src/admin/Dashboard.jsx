import { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Utensils, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchDishes } from '../api/dishes';

export function Dashboard() {
  const [dishesCount, setDishesCount] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // Fetch dishes asynchronously
    fetchDishes()
      .then((data) => {
        if (isMounted) setDishesCount(data.length);
      })
      .catch(() => {
        if (isMounted) setDishesCount(0);
      });

    // Defer state update to next microtask tick to prevent synchronous cascading re-renders
    queueMicrotask(() => {
      if (!isMounted) return;
      try {
        const savedOrders = JSON.parse(localStorage.getItem('addisEatsOrders') || '[]');
        setOrders(savedOrders);
      } catch {
        setOrders([]);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  const stats = [
    { title: 'Total Revenue', value: `${totalRevenue.toLocaleString()} ETB`, icon: DollarSign, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { title: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { title: 'Active Menu Items', value: dishesCount, icon: Utensils, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { title: 'Fulfillment Rate', value: '100%', icon: TrendingUp, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time metrics for Addis Eats operations</p>
          </div>
          <Link to="/admin/dishes" className="inline-flex items-center gap-2 rounded-xl bg-[#D04818] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#b03a12]">
            <Plus className="h-4 w-4" /> Add menu item
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/admin/dishes" className="group rounded-2xl border border-orange-100 bg-orange-50 p-5 dark:border-orange-950/40 dark:bg-orange-950/20">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">Keep the menu fresh</h2>
            <ArrowRight className="h-4 w-4 text-[#D04818] transition-transform group-hover:translate-x-1" />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Add seasonal dishes, update prices, and keep image paths current.</p>
        </Link>
        <Link to="/admin/orders" className="group rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-950/40 dark:bg-blue-950/20">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">Stay on top of fulfillment</h2>
            <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Review incoming orders and update customers as orders move forward.</p>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Customer Orders</h2>
        {orders.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 py-4">No recent orders recorded yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{order.id}</span>
                  <p className="text-slate-500 dark:text-slate-400">{order.items?.length || 0} items • {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#D04818]">{order.total?.toLocaleString()} ETB</p>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold">
                    {order.status || 'Preparing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;