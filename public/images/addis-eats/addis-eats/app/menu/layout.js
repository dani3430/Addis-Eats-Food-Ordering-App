// app/menu/layout.js — wraps /menu and everything under it (e.g. /menu/kitfo)
"use client"; // needed because useState only works in the browser, not on the server

import { useState } from "react";
import Link from "next/link";

export default function MenuLayout({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <p>Categories</p>
        <ul>
          <li><Link href="/menu/kitfo">Kitfo</Link></li>
          <li><Link href="/menu/doro-wat">Doro Wat</Link></li>
          <li><Link href="/menu/shiro">Shiro</Link></li>
        </ul>
        {/* If this layout survives navigation, this number should NOT reset
            when you click between dishes. */}
        <button onClick={() => setCount(count + 1)}>
          Sidebar clicks: {count}
        </button>
      </aside>
      <main>{children}</main>
    </div>
  );
}
