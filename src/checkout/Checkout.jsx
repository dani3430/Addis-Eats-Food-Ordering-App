import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../cart/cartStore';
import { useOrderHistory } from '../orders/orderHistoryStore';
import { formatETB } from '../utils/formatCurrency';
import { calculateDeliveryFee } from '../utils/deliveryEstimate';
import { validateCheckout } from './validate';
import Field from './Field';
import DeliveryEstimate from './DeliveryEstimate';
import Button from '../ui/Button';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const { addOrder } = useOrderHistory();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    subCity: 'Bole',
    specificAddress: '',
    paymentMethod: 'Telebirr',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = calculateDeliveryFee(formData.subCity);
  const totalAmount = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePaymentSelect = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCheckout ? validateCheckout(formData) : {};

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const newOrder = {
      items: cart,
      subtotal,
      deliveryFee,
      total: totalAmount,
      customer: formData,
    };
    const savedOrder = addOrder(newOrder);

    // Complete order simulation
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      toast.success(`Order placed successfully! Your order number is ${savedOrder.id}.`);
      navigate('/orders', { state: { orderSuccess: true, orderId: savedOrder.id } });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Your Cart is Empty</h2>
        <p className="text-slate-600 mb-6">Please add dishes to your cart before proceeding to checkout.</p>
        <Button onClick={() => navigate('/menu')}>Return to Menu</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 font-serif">Checkout</h1>
        <button
          type="button"
          onClick={() => navigate('/menu')}
          className="text-sm font-semibold text-[#D04818] hover:underline"
        >
          ← Back to Menu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Details */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Delivery Information</h2>

            <Field label="Full Name" error={errors.fullName} required>
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Abebe Bikila"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D04818]"
              />
            </Field>

            <Field label="Phone Number" error={errors.phoneNumber} required>
              <input
                type="text"
                name="phoneNumber"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="0911234567"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D04818]"
              />
            </Field>

            <Field label="Sub-City" error={errors.subCity} required>
              <select
                name="subCity"
                value={formData.subCity}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D04818] [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-800 dark:[&>option]:text-white"
              >
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Piassa">Piassa</option>
                <option value="Sarbet">Sarbet</option>
                <option value="CMC">CMC</option>
                <option value="Akaki Kality">Akaki Kality</option>
                <option value="Nifas Silk">Nifas Silk</option>
              </select>
            </Field>

            <Field label="Specific Delivery Address / Landmark" error={errors.specificAddress} required>
              <textarea
                name="specificAddress"
                autoComplete="street-address"
                rows="3"
                value={formData.specificAddress}
                onChange={handleChange}
                placeholder="Behind Edna Mall, Building A, 2nd Floor"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D04818]"
              />
            </Field>
          </div>

          {/* Payment Method Options */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Payment Option</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handlePaymentSelect('Telebirr')}
                className={`p-4 border rounded-xl flex flex-col items-center justify-center font-semibold text-sm transition-all ${
                  formData.paymentMethod === 'Telebirr'
                    ? 'border-[#D04818] bg-orange-50 text-[#D04818] ring-2 ring-[#D04818]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Telebirr</span>
                <span className="text-xs text-slate-500 font-normal mt-1">Mobile Money</span>
              </button>

              <button
                type="button"
                onClick={() => handlePaymentSelect('CBE Birr')}
                className={`p-4 border rounded-xl flex flex-col items-center justify-center font-semibold text-sm transition-all ${
                  formData.paymentMethod === 'CBE Birr'
                    ? 'border-[#D04818] bg-orange-50 text-[#D04818] ring-2 ring-[#D04818]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>CBE Birr</span>
                <span className="text-xs text-slate-500 font-normal mt-1">Commercial Bank</span>
              </button>
            </div>
          </div>

          <DeliveryEstimate subCity={formData.subCity} />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 text-lg font-bold shadow-md bg-[#D04818] hover:bg-[#b83d13] text-white rounded-xl"
          >
            {isSubmitting ? 'Processing Order...' : `Confirm Order • ${formatETB(totalAmount)}`}
          </Button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#D04818]">{item.quantity}x</span>
                    <span className="text-slate-800 font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {formatETB(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatETB(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-slate-800">{formatETB(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total</span>
                <span className="text-[#D04818]">{formatETB(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;