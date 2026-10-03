// app/page.js — route: "/" — Static: the story never changes between builds
import { getRestaurantInfo } from "../lib/data";

export default async function HomePage() {
  const info = await getRestaurantInfo();
  return (
    <article>
      <h1>{info.story}</h1>
      <p>{info.address}</p>
    </article>
  );
}
