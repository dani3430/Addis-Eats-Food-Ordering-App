
import DishCard from './DishCard';
import Spinner from '../ui/Spinner';

export const DishList = ({ dishes, loading, error, onSelectDish }) => {
  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!dishes || dishes.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-100 p-8">
        <p className="text-lg font-semibold mb-1">No dishes found</p>
        <p className="text-sm">Try searching for something else or switching categories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onSelectDish={onSelectDish} />
      ))}
    </div>
  );
};

export default DishList;