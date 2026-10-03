import { ArrowRight, Clock3, MapPin, Sparkles, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredImages = [
  { src: '/images/shekla-tibs.jpg', alt: 'Shekla tibs' },
  { src: '/images/doro-wat.jpg', alt: 'Doro wat' },
  { src: '/images/special-kitfo.jpg', alt: 'Special kitfo' },
  { src: '/images/margherita.jpg', alt: 'Margherita pizza' },
  { src: '/images/smashed-burger.jpg', alt: 'Gourmet burger' },
  { src: '/images/spris-juice.jpg', alt: 'Spris juice' },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative isolate overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
        <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/20" />
        <div className="grid min-h-[32rem] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex items-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-6 py-12 text-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-[#2b1710] dark:text-white sm:px-10 sm:py-16 lg:px-14">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-[#9f3815] dark:border-orange-900 dark:bg-white/10 dark:text-orange-200">
                <Sparkles className="h-4 w-4 text-[#D04818]" />
                Addis Ababa, delivered with care
              </div>
              <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
                Great food, made easy.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                Discover the flavors of Addis Eats, from beloved Ethiopian classics
                to modern favorites, prepared fresh and delivered to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D04818] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#b83d13]"
                >
                  Explore the menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/orders"
                  className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  View your orders
                </Link>
              </div>
              <div className="mt-9 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-[#D04818] dark:bg-orange-950/50">
                  <Utensils className="h-4 w-4" />
                </span>
                <span>Local flavors. Global standards.</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[20rem] overflow-hidden bg-[#28130d] sm:min-h-[26rem] lg:min-h-full">
            <img
              src="/images/shekla-tibs.jpg"
              alt="Freshly prepared Ethiopian shekla tibs"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <div className="rounded-xl bg-black/55 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              Special Shekla Tibs
              </div>
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#9f3815]">
                Chef's choice
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Featured dishes" className="overflow-hidden">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D04818]">A taste of Addis</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Made to be discovered</h2>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-[#D04818] hover:underline">See menu</Link>
        </div>
        <div className="home-marquee flex w-max gap-4 motion-reduce:animate-none">
          {[...featuredImages, ...featuredImages].map((image, index) => (
            <img
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt}
              className="h-24 w-36 rounded-2xl object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 sm:h-28 sm:w-44"
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Clock3 className="mb-3 h-6 w-6 text-[#D04818]" />
          <h2 className="font-bold text-slate-900 dark:text-white">Fresh, every time</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Carefully prepared meals that arrive ready to enjoy.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <MapPin className="mb-3 h-6 w-6 text-[#D04818]" />
          <h2 className="font-bold text-slate-900 dark:text-white">Made for Addis</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Reliable delivery across your favorite neighborhoods.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Sparkles className="mb-3 h-6 w-6 text-[#D04818]" />
          <h2 className="font-bold text-slate-900 dark:text-white">Something for everyone</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Save favorites, reorder easily, and enjoy every bite.
          </p>
        </div>
      </section>
    </div>
  );
}
