export const fetchDishes = async () => {
  try {
    const response = await fetch('/menu-data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch menu data (Status: ${response.status})`);
    }
    const data = await response.json();
    const savedDishes = localStorage.getItem('addisEatsDishes');
    const dishes = savedDishes ? JSON.parse(savedDishes) : data;
    return dishes.map((dish) => ({
      ...dish,
      isVisible: dish.isVisible !== false,
      isActive: dish.isActive !== false,
      rating: Number(dish.rating) || 4.8,
    }));
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};

export const saveDishes = (dishes) => {
  localStorage.setItem('addisEatsDishes', JSON.stringify(dishes));
};

export default fetchDishes;