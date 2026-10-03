// app/layout.js — required, wraps EVERYTHING on the site
import "./globals.css";

export const metadata = { title: "Addis Eats" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Addis Eats 🍽️</header>
        {children}
        <footer>© Addis Eats</footer>
      </body>
    </html>
  );
}
