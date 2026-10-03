// app/menu/[id]/page.js — route: "/menu/[id]" — Static via params: every dish is known at build time
import { getDishes, getDish } from "../../../lib/data";

// Tells Next.js exactly which [id] values exist, so it can build one HTML
// file per dish during `npm run build` instead of waiting for a request.
export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return <p>Dish not found.</p>;
  return (
    <article>
      <h2>{dish.name}</h2>
      <p>${dish.price}</p>
    </article>
  );
}
