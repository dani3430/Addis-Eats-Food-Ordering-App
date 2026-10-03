const ratingsKey = (dishId) => `addisEatsRatings:${dishId}`;

const getStoredRatings = (dish) => {
  const baseRating = Number(dish.rating) || 4.8;

  try {
    const saved = JSON.parse(localStorage.getItem(ratingsKey(dish.id)) || 'null');
    if (saved && Number.isFinite(saved.total) && Number.isFinite(saved.count)) {
      return {
        total: saved.total,
        count: Math.max(1, saved.count),
        userRating: Number(saved.userRating) || 0,
      };
    }
  } catch {
    // Fall back to the catalog rating if stored feedback is invalid.
  }

  return { total: baseRating, count: 1, userRating: 0 };
};

export const getDishRating = (dish) => {
  const ratings = getStoredRatings(dish);
  return Number((ratings.total / ratings.count).toFixed(1));
};

export const getCustomerRating = (dish) => getStoredRatings(dish).userRating;

export const updateDishRating = (dish, rating) => {
  const current = getStoredRatings(dish);
  let next;

  if (current.userRating === rating) {
    next = {
      total: current.total - rating,
      count: Math.max(1, current.count - 1),
      userRating: 0,
    };
  } else if (current.userRating) {
    next = {
      total: current.total - current.userRating + rating,
      count: current.count,
      userRating: rating,
    };
  } else {
    next = {
      total: current.total + rating,
      count: current.count + 1,
      userRating: rating,
    };
  }

  localStorage.setItem(ratingsKey(dish.id), JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('dish-rating-updated', { detail: { dishId: dish.id } }));
  return next;
};
