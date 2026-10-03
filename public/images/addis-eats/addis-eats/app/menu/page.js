// app/menu/page.js — route: "/menu" — ISR: dishes change occasionally, speed matters most
import { Suspense } from "react";
import DishList from "./DishList";

export const revalidate = 3600; // treat this page as stale after 1 hour, then regenerate it

export default function MenuPage() {
  return (
    <>
      <p>Categories</p> {/* instant — no waiting on this */}
      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList /> {/* slow query — this part streams in behind the rest */}
      </Suspense>
    </>
  );
}
