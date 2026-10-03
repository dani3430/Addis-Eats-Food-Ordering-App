import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Power, PowerOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchDishes, saveDishes } from '../api/dishes';
import { DishForm } from './DishForm';

export function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Fetch dishes and defer state update to avoid cascading re-renders
    fetchDishes()
      .then((data) => {
        queueMicrotask(() => {
          if (isMounted) setDishes(data || []);
        });
      })
      .catch((err) => {
        console.error('Failed to fetch dishes:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = (dishData) => {
    if (editingDish) {
      setDishes((prev) => {
        const updated = prev.map((d) => (d.id === dishData.id ? dishData : d));
        saveDishes(updated);
        return updated;
      });
      toast.success('Dish deleted from the storefront.');
    } else {
      setDishes((prev) => {
        const updated = [dishData, ...prev];
        saveDishes(updated);
        return updated;
      });
    }
    setIsFormOpen(false);
    setEditingDish(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this dish from the storefront permanently?')) return;
    setDishes((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      saveDishes(updated);
      return updated;
    });
  };

  const updateDish = (id, changes) => {
    setDishes((prev) => {
      const updated = prev.map((dish) => (dish.id === id ? { ...dish, ...changes } : dish));
      saveDishes(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dish Manager</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage restaurant dishes and prices</p>
        </div>
        <button
          onClick={() => { setEditingDish(null); setIsFormOpen(true); }}
          className="px-4 py-2 bg-[#D04818] text-white font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-[#b03a12] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Dish
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {dishes.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 p-6 text-center">No menu dishes found.</p>
          ) : (
            dishes.map((dish) => (
              <div key={dish.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {dish.image && (
                    <img src={dish.image} alt={dish.name} className="w-12 h-12 object-cover rounded-xl" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{dish.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{dish.category} • {dish.price} ETB</p>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                      <span className={`rounded-full px-2 py-0.5 ${dish.isVisible !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{dish.isVisible !== false ? 'Visible' : 'Hidden'}</span>
                      <span className={`rounded-full px-2 py-0.5 ${dish.isActive !== false ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{dish.isActive !== false ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateDish(dish.id, { isVisible: dish.isVisible === false })} className="p-2 text-slate-500 hover:text-[#D04818] rounded-lg transition-colors" aria-label={dish.isVisible === false ? 'Show dish in storefront' : 'Hide dish from storefront'} title={dish.isVisible === false ? 'Show in storefront' : 'Hide from storefront'}>
                    {dish.isVisible === false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => updateDish(dish.id, { isActive: dish.isActive === false })} className="p-2 text-slate-500 hover:text-blue-600 rounded-lg transition-colors" aria-label={dish.isActive === false ? 'Activate dish' : 'Deactivate dish'} title={dish.isActive === false ? 'Activate ordering' : 'Deactivate ordering'}>
                    {dish.isActive === false ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { setEditingDish(dish); setIsFormOpen(true); }}
                    className="p-2 text-slate-500 hover:text-[#D04818] rounded-lg transition-colors"
                    aria-label="Edit dish"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(dish.id)}
                    className="p-2 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
                    aria-label="Delete dish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isFormOpen && (
        <DishForm
          dish={editingDish}
          onSave={handleSave}
          onClose={() => { setIsFormOpen(false); setEditingDish(null); }}
        />
      )}
    </div>
  );
}

export default DishManager;