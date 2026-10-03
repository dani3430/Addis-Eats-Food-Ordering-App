import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useOrderHistory } from '../orders/orderHistoryStore';

const statuses = ['Preparing', 'Prepared', 'Delivering', 'Delivered'];

export default function OrderManager() {
  const { orders, updateOrderStatus, deleteOrder } = useOrderHistory();

  const handleDelete = (orderId) => {
    if (window.confirm('Delete this order permanently?')) {
      deleteOrder(orderId);
      toast.success('Order deleted successfully.');
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Order Management</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track every customer order and update its fulfillment status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800">
          No customer orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">Order #{order.id}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {order.customer?.fullName || 'Customer'} · {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status || 'Preparing'}
                    onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  >
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <button type="button" onClick={() => handleDelete(order.id)} className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30" aria-label={`Delete order ${order.id}`} title="Delete order">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm dark:border-slate-700">
                {order.items?.map((item) => (
                  <div key={`${order.id}-${item.id}`} className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>{item.quantity} × {item.name}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} ETB</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-right font-bold text-[#D04818]">{(order.total ?? order.totalAmount ?? 0).toLocaleString()} ETB</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
