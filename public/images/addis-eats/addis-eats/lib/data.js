// lib/data.js — pretend these hit a real database

const DISHES = [
  { id: "kitfo", name: "Kitfo", price: 12.5 },
  { id: "doro-wat", name: "Doro Wat", price: 14.0 },
  { id: "shiro", name: "Shiro", price: 9.0 },
];

export async function getRestaurantInfo() {
  return {
    story: "Addis Eats has served Addis Ababa since 2014.",
    address: "Bole Road, Addis Ababa",
  };
}

export async function getDishes() {
  return DISHES;
}

export async function getDish(id) {
  return DISHES.find((d) => d.id === id) ?? null;
}
