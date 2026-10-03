import { getDishes } from "../../lib/data";

export default async function DishList() {
  // Pretend this is a slow database query.
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const dishes = await getDishes();

  return (
    <ul>
      {dishes.map((d) => (
        <li key={d.id}>
          {d.name} — ${d.price}
        </li>
      ))}
    </ul>
  );
}
