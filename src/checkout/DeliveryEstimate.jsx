import { Clock, MapPin } from 'lucide-react';
import { calculateDeliveryFee, getDeliveryTimeEstimate } from '../utils/deliveryEstimate';
import { formatETB } from '../utils/formatCurrency';

export default function DeliveryEstimate({ subCity = 'Bole' }) {
  const deliveryFee = calculateDeliveryFee(subCity);
  const timeEstimate = getDeliveryTimeEstimate(subCity);

  return (
    <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
          <MapPin className="w-4 h-4 text-[#D04818]" />
          <span>Delivery Zone: <strong className="text-slate-900">{subCity}</strong></span>
        </div>
        <span className="text-xs font-bold bg-orange-100 text-[#D04818] px-2.5 py-1 rounded-full">
          {formatETB(deliveryFee)}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-600 border-t border-orange-100/60 pt-2.5">
        <Clock className="w-4 h-4 text-slate-500 shrink-0" />
        <span>Estimated Delivery Time: <strong className="text-slate-800">{timeEstimate}</strong></span>
      </div>
    </div>
  );
}