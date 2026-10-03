import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useOrderHistory } from './orderHistoryStore';
import { OrderHistoryItem } from './OrderHistoryItem';

export default function OrderHistory() {
  const { orders } = useOrderHistory();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Order History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">View and reorder your past culinary choices</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            When you complete an order from the Addis Eats menu, it will appear here so you can easily track or reorder it anytime.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-2.5 bg-[#D04818] text-white font-bold text-xs rounded-xl hover:bg-[#b03a12] transition-colors"
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderHistoryItem
              key={order.id}
              order={order}
              onReorderSuccess={() => navigate('/cart')}
            />
          ))}
        </div>
      )}
    </div>
  );
}