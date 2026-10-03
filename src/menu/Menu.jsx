import { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { fetchDishes } from '../api/dishes';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import DishDetailModal from './DishDetail';

export const Menu = ({ onSelectDish }) => {
  const fetcher = useCallback(() => fetchDishes(), []);
  const { data: dishes, loading, error } = useFetch(fetcher);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const categories = useMemo(() => {
    if (!dishes) return ['All'];
    const availableDishes = dishes.filter((dish) => dish.isVisible !== false && dish.isActive !== false);
    const unique = Array.from(
      new Set(
        availableDishes
          .map((dish) => dish.category?.trim())
          .filter(Boolean)
      )
    );
    return ['All', ...unique];
  }, [dishes]);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    return dishes.filter((dish) => {
      if (dish.isVisible === false || dish.isActive === false) return false;
      const matchesCategory =
        selectedCategory === 'All' ||
        dish.category?.trim().toLowerCase() === selectedCategory.toLowerCase();

      const query = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        (dish.category && dish.category.toLowerCase().includes(query)) ||
        (dish.amharicName && dish.amharicName.toLowerCase().includes(query)) ||
        (dish.description && dish.description.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [dishes, selectedCategory, debouncedSearch]);

  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
    onSelectDish?.(dish);
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Shekla Tibs, Kitfo, Spris Juice..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D04818] focus:border-transparent text-slate-900 placeholder-slate-400"
        />
      </div>

      {/* Category Filter Pills */}
      <CategoryBar
        categories={categories}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Dish Cards Grid */}
      <DishList
        dishes={filteredDishes}
        loading={loading}
        error={error}
        onSelectDish={handleSelectDish}
      />
      <DishDetailModal
        key={selectedDish?.id || 'dish-detail'}
        dish={selectedDish}
        isOpen={Boolean(selectedDish)}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
};

export default Menu;