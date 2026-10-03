// app/checkout/page.js — route: "/checkout" — Dynamic: reads the session cookie and live pricing
import { cookies } from "next/headers";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  // This next line is what forces the whole route dynamic: it depends on
  // WHO is asking, so Next.js can no longer build one shared HTML file for it.
  const sessionId = cookieStore.get("session")?.value ?? "guest";

  return <p>Checking out as: {sessionId}</p>;
}
