import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Heart, ShoppingCart, Eye, ArrowRight, Truck,
  RotateCcw, ShieldCheck, Headphones, Zap, Layers,
  ChevronRight, Star
} from "lucide-react";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleUserProducts } = useProduct();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.product);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    handleUserProducts();
  }, []);

  const categories = [
    { name: "Running", icon: "⚡", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80" },
    { name: "Basketball", icon: "🏀", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80" },
    { name: "Training", icon: "💪", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" },
    { name: "Lifestyle", icon: "✨", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80" },
  ];

  const techFeatures = [
    { icon: <Zap size={20} />, title: "Arc Foam", desc: "Ultra-lightweight cushioning for maximum energy return." },
    { icon: <Layers size={20} />, title: "Flex Motion", desc: "Adaptive zones for natural movement patterns." },
    { icon: <ShieldCheck size={20} />, title: "Grip Control", desc: "Reliable traction on any terrain." },
    { icon: <Truck size={20} />, title: "Breath Tech", desc: "Engineered mesh for optimal airflow." },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#e9e9e9] dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Loading Collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e9e9e9] dark:bg-black text-black dark:text-white font-[Space_Grotesk,Inter,sans-serif]">

      {/* ══════════════════════════════════════════
          HERO SECTION — Editorial cinematic layout
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#e9e9e9] dark:bg-black pt-20">
        {/* Massive background text — inspired by FLARE / VECTOR designs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black uppercase tracking-[-0.05em] text-black/[0.04] dark:text-white/[0.04] leading-none">
            ARCX
          </span>
        </div>

        {/* Grid lines decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-black/5 dark:bg-[#e9e9e9]/5 ml-6 lg:ml-16" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-black/5 dark:bg-[#e9e9e9]/5 mr-6 lg:mr-16" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
          {/* LEFT — Copy */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-black dark:bg-[#e9e9e9] text-white dark:text-black text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#e9e9e9] dark:bg-black rounded-full animate-pulse" />
                Premium Collection 2026
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.9] text-black dark:text-white">
                Move.
                <br />
                <span className="text-black/20 dark:text-white/20">Feel.</span>
                <br />
                <em className="not-italic">Arc.</em>
              </h1>
            </div>

            <p className="text-base text-black/50 dark:text-white/50 max-w-md leading-relaxed font-medium">
              Engineered for the streets. Built for performance. ArcX fuses cutting-edge cushioning tech with editorial design — every step, a statement.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 bg-black dark:bg-[#e9e9e9] text-white dark:text-black font-bold px-8 py-4 rounded-full hover:gap-5 transition-all duration-300 shadow-lg shadow-black/10 dark:shadow-white/10"
              >
                Explore Catalog
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2 border border-black/20 dark:border-white/20 text-black dark:text-white font-semibold px-8 py-4 rounded-full hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-[#e9e9e9]/5 transition-all duration-200">
                New Arrivals
              </button>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 pt-4 border-t border-black/5 dark:border-white/5">
              <div className="flex -space-x-2">
                {["🧑", "👩", "👨", "🧑‍🦱"].map((em, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-black/10 dark:bg-[#e9e9e9]/10 border-2 border-white dark:border-black flex items-center justify-center text-sm">
                    {em}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-black dark:fill-white text-black dark:text-white" />
                  ))}
                </div>
                <p className="text-xs text-black/40 dark:text-white/40 font-medium mt-0.5">12K+ satisfied customers</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Hero product image */}
          <div className="relative flex items-center justify-center">
            {/* Circular background */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-black/[0.04] dark:bg-[#e9e9e9]/[0.04] border border-black/5 dark:border-white/5" />
            <div className="absolute w-[380px] h-[380px] rounded-full bg-black/[0.04] dark:bg-[#e9e9e9]/[0.04] border border-black/5 dark:border-white/5" />

            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90"
              alt="ArcX Featured Sneaker"
              className="relative z-10 w-full max-w-[520px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_40px_60px_rgba(255,255,255,0.1)] transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out"
            />

            {/* Floating stat cards */}
            <div className="absolute top-8 right-0 bg-[#e9e9e9] dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl shadow-black/5 dark:shadow-white/5">
              <p className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest font-bold">Rating</p>
              <p className="text-lg font-black">4.9 ★</p>
            </div>
            <div className="absolute bottom-8 left-0 bg-[#e9e9e9] dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl shadow-black/5 dark:shadow-white/5">
              <p className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest font-bold">Collection</p>
              <p className="text-lg font-black">SS '26</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase text-black/30 dark:text-white/30 font-bold">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-black/30 dark:from-white/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BADGES STRIP
      ══════════════════════════════════════════ */}
      <section className="border-y border-black/5 dark:border-white/5 bg-black dark:bg-[#e9e9e9]">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 dark:bg-[#e9e9e9]/5">
          {[
            { icon: <Truck size={18} />, title: "Free Delivery", sub: "On orders over $150" },
            { icon: <RotateCcw size={18} />, title: "14-Day Returns", sub: "Hassle-free exchanges" },
            { icon: <ShieldCheck size={18} />, title: "100% Authentic", sub: "Verified sources only" },
            { icon: <Headphones size={18} />, title: "24/7 Support", sub: "Always on, always ready" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-5 bg-black dark:bg-[#e9e9e9] hover:bg-zinc-900 dark:hover:bg-zinc-100 transition-colors">
              <div className="text-white dark:text-black opacity-60">{item.icon}</div>
              <div>
                <p className="text-white dark:text-black font-bold text-sm">{item.title}</p>
                <p className="text-white/50 dark:text-black/50 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORIES GRID — FLARE style editorial
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Disciplines</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1 text-black dark:text-white">
              Shop by<br />Category
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
            onClick={() => navigate(`/products/${cat.name}`)}
              key={i}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-black/5 dark:bg-[#e9e9e9]/5"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="text-white text-xl font-black uppercase tracking-tight">{cat.name}</h3>
                  <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-white/70 text-xs font-semibold">View Collection</span>
                    <ArrowRight size={12} className="text-white/70" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTS SECTION — HOT SELLERS
      ══════════════════════════════════════════ */}
      <section id="products-section" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-12 border-t border-black/5 dark:border-white/5 pt-12">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Top Picks</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1 text-black dark:text-white">
              Hot<br />Sellers
            </h2>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-4 py-1.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold text-black/50 dark:text-white/50">
              {products.length} Models
            </span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-32 border border-black/5 dark:border-white/5 rounded-3xl">
            <div className="text-6xl mb-4">👟</div>
            <h3 className="text-2xl font-black uppercase text-black dark:text-white">No Stock Yet</h3>
            <p className="text-black/40 dark:text-white/40 mt-2 text-sm">Fresh drops incoming. Stay tuned.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-[#e9e9e9] dark:bg-zinc-950 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden hover:border-black/20 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative bg-zinc-50 dark:bg-zinc-900 m-3 rounded-2xl h-60 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"}
                    alt={product.name}
                    className="w-[85%] h-[85%] object-contain group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out"
                  />

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-black dark:bg-[#e9e9e9] text-white dark:text-black text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                    {product.category || "New"}
                  </span>

                  {/* Hover quick actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-[#e9e9e9]/5 transition-colors duration-300 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button className="flex items-center gap-1.5 bg-[#e9e9e9] dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl hover:bg-black hover:text-white dark:hover:bg-[#e9e9e9] dark:hover:text-black transition">
                      <Heart size={12} /> Save
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex items-center gap-1.5 bg-black dark:bg-[#e9e9e9] text-white dark:text-black text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
                    >
                      <Eye size={12} /> View
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 pt-2 flex flex-col flex-1">
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">{product.brand}</span>
                  <h3 className="text-sm font-black text-black dark:text-white mt-0.5 line-clamp-1 uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-black/40 dark:text-white/40 mt-1 line-clamp-2 leading-relaxed flex-1">
                    {product.description || "Premium performance build for lifestyle aesthetic."}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                    <div>
                      <p className="text-xl font-black text-black dark:text-white tracking-tight">${product.price?.amount}</p>
                      <span className="text-[9px] font-bold text-black/30 dark:text-white/30 uppercase tracking-wider">{product.price?.currency || "USD"}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="group/btn flex items-center gap-2 bg-black dark:bg-[#e9e9e9] text-white dark:text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-95"
                    >
                      Buy
                      <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          TECHNOLOGY STRIP — VECTOR inspired
      ══════════════════════════════════════════ */}
      <section className="bg-black dark:bg-[#e9e9e9] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30 dark:text-black/30">Innovation</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-white dark:text-black">
              Built Different
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e9e9e9]/10 dark:bg-black/10">
            {techFeatures.map((feat, i) => (
              <div
                key={i}
                className="group bg-black dark:bg-[#e9e9e9] hover:bg-zinc-900 dark:hover:bg-zinc-100 transition-colors p-8 text-center flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 border border-white/20 dark:border-black/20 rounded-2xl flex items-center justify-center text-white dark:text-black group-hover:border-white dark:group-hover:border-black transition-colors">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-white dark:text-black font-black uppercase tracking-wider text-sm">{feat.title}</h4>
                  <p className="text-white/40 dark:text-black/40 text-xs mt-2 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER — Join ArcX
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-black dark:bg-[#e9e9e9] p-12 md:p-20 text-center">
          {/* Bg text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-[20vw] font-black uppercase text-white/[0.03] dark:text-black/[0.03] leading-none tracking-tighter whitespace-nowrap">ARCX</span>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block bg-[#e9e9e9]/10 dark:bg-black/10 text-white dark:text-black text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
              Exclusive Access
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white dark:text-black leading-none mb-4">
              Join the<br />Movement
            </h2>
            <p className="text-white/50 dark:text-black/50 text-base mb-10 leading-relaxed">
              Early drops. Exclusive colorways. Member-only prices. ArcX Club gives you the edge.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="group inline-flex items-center gap-3 bg-[#e9e9e9] dark:bg-black text-black dark:text-white font-black uppercase tracking-wider px-10 py-5 rounded-full hover:gap-5 transition-all duration-300 text-sm shadow-2xl shadow-white/20 dark:shadow-black/20"
            >
              Create Account
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-black dark:bg-[#e9e9e9] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black text-[10px] font-black">AX</span>
              </div>
              <span className="text-lg font-black tracking-tight text-black dark:text-white uppercase">ArcX</span>
            </div>
            <p className="text-black/40 dark:text-white/40 text-sm leading-relaxed">
              Premium sneaker brand engineered for those who move forward, always.
            </p>
          </div>

          {[
            { title: "Shop", links: ["Running", "Basketball", "Training", "Lifestyle", "New Arrivals"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Blog", "Sustainability"] },
            { title: "Help", links: ["Shipping Info", "Returns", "Size Guide", "FAQ", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/30 dark:text-white/30 font-medium">© 2026 ArcX. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-xs text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors font-medium">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;