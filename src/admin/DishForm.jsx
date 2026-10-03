import { useState } from 'react';
import { X, ImagePlus } from 'lucide-react';

export function DishForm({ dish, onSave, onClose }) {
  // Pass dish directly to useState initializer to eliminate synchronous setState inside effect
  const [formData, setFormData] = useState(() => dish || {
    name: '',
    category: 'Main Dish',
    price: '',
    description: '',
    image: '',
    isVisible: true,
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Dish name is required.';
    if (!(formData.image || '').trim()) nextErrors.image = 'Add an image upload or image path.';
    if (!formData.price || Number(formData.price) <= 0) nextErrors.price = 'Enter a price greater than 0.';
    if (!formData.description.trim()) nextErrors.description = 'Add a short dish description.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    onSave({
      ...formData,
      id: dish ? dish.id : Date.now(),
      price: Number(formData.price),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:max-h-[calc(100dvh-3rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-form-title"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/95 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D04818]">Menu management</p>
            <h2 id="dish-form-title" className="mt-1 truncate text-lg font-bold text-slate-900 dark:text-white">
            {dish ? 'Edit Dish' : 'Add New Dish'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 shadow-sm transition-all hover:border-[#D04818] hover:bg-orange-50 hover:text-[#D04818] focus:outline-none focus:ring-2 focus:ring-[#D04818] focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-orange-950/30"
            aria-label="Close dish editor"
            title="Close"
          >
            <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 sm:pt-5">
            <input type="checkbox" checked={formData.isVisible !== false} onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })} className="h-4 w-4 accent-[#D04818]" />
            Visible in store
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 sm:pt-5">
            <input type="checkbox" checked={formData.isActive !== false} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 accent-[#D04818]" />
            Active for ordering
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dish Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors((current) => ({ ...current, name: '' }));
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dish Image</label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-3 text-center text-xs text-slate-500 hover:border-[#D04818]">
                <ImagePlus className="mx-auto mb-1 h-5 w-5" />
                Upload image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {formData.image && <img src={formData.image} alt="Preview" className="h-16 w-16 rounded-xl object-cover" />}
            </div>
            <input
              type="text"
              value={formData.image?.startsWith('data:') ? '' : formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setErrors((current) => ({ ...current, image: '' }));
              }}
              placeholder="Or enter an image path, e.g. /images/shekla-tibs.jpg"
              className="mt-2 w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Use an uploaded file or a public path from <code>/public</code>.
            </p>
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="Main Dish">Main Dish</option>
              <option value="Traditional">Traditional</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Price (ETB)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: e.target.value });
                setErrors((current) => ({ ...current, price: '' }));
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrors((current) => ({ ...current, description: '' }));
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-[#D04818] text-white text-xs font-bold rounded-xl hover:bg-[#b03a12]"
            >
              Save Dish
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default DishForm;