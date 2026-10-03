// app/cart/page.js — route: "/cart" — Client: the person's own state, and private
"use client";

import { useState } from "react";

export default function CartPage() {
  const [items, setItems] = useState([]);

  return (
    <div>
      <p>Your cart has {items.length} item(s).</p>
      <button onClick={() => setItems([...items, "item"])}>Add item</button>
    </div>
  );
}
