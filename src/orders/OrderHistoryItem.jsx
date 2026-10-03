import { RefreshCw, PackageCheck } from 'lucide-react';
import { formatETB } from '../utils/formatCurrency';
import { useOrderHistory } from './orderHistoryStore';

const statuses = ['Preparing', 'Prepared', 'Delivering', 'Delivered'];

export function OrderHistoryItem({ order, onReorderSuccess }) {
  const { reorder } = useOrderHistory();

  const handleReorder = () => {
    reorder(order);
    if (onReorderSuccess) onReorderSuccess();
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      {/* Order Header */}
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D04818]/10 text-[#D04818] rounded-xl">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-base">Order #{order.id}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-semibold rounded-full">
          {order.status || 'Preparing'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {statuses.map((status, index) => {
          const currentIndex = statuses.indexOf(order.status || 'Preparing');
          const active = index <= currentIndex;
          return (
            <div key={status} className="space-y-1 text-center">
              <div className={`h-1.5 rounded-full ${active ? 'bg-[#D04818]' : 'bg-slate-200 dark:bg-slate-700'}`} />
              <span className={`text-[10px] ${active ? 'font-semibold text-[#D04818]' : 'text-slate-400'}`}>{status}</span>
            </div>
          );
        })}
      </div>

      {/* Item List */}
      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {order.items?.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
            <span>
              <span className="font-bold text-slate-900 dark:text-white mr-2">{item.quantity}x</span>
              {item.name}
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {formatETB(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Total & Reorder Action */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700">
        <div>
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Paid</span>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{formatETB(order.total)}</p>
        </div>

        <button
          onClick={handleReorder}
          className="flex items-center gap-2 px-4 py-2 bg-[#D04818] hover:bg-[#b03a12] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reorder Items
        </button>
      </div>
    </div>
  );
}