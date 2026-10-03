# Rendering strategy — Addis Eats

| Route          | Strategy       | Why                                                    |
|----------------|----------------|---------------------------------------------------------|
| `/`            | Static         | The story and address never change between builds.     |
| `/menu`        | ISR, 1 hour    | Dishes change a few times a day; speed matters most.    |
| `/menu/[id]`   | Static (SSG)   | All dish IDs are known at build time via generateStaticParams. |
| `/cart`        | Client         | Purely the visitor's own state; nothing to prerender.   |
| `/checkout`    | Dynamic        | Reads the `session` cookie — depends on who's asking.   |
