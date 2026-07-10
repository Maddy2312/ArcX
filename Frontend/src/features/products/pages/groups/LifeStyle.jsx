import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  ArrowRight, Truck, RotateCcw, 
  ShieldCheck, Headphones 
} from "lucide-react";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router";

const LifeStyle = () => {
  const { handleUserProducts } = useProduct();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    handleUserProducts();
  }, []);

  // Filter products for the LifeStyle category
  const lifestyleProducts = products.filter((p) => p.category === "Lifestyle");

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-black">
        <div className="w-10 h-10 border-2 border-black/10 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-[Space_Grotesk,Inter,sans-serif]">
      
      {/* ══════════════════════════════════════════
          HERO SECTION 
      ══════════════════════════════════════════ */}
      <section className="relative py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">Daily Essentials</span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.9] mt-4">
            Lifestyle <br /> <span className="text-black/20 dark:text-white/20">Collection</span>
          </h1>
          <p className="max-w-md mt-8 text-black/60 dark:text-white/60 font-medium">
            Seamlessly blending comfort and street-ready aesthetics. Elevated staples designed for your everyday journey.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTS GRID
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tight">Active Inventory ({lifestyleProducts.length})</h2>
        </div>

        {lifestyleProducts.length === 0 ? (
          <div className="text-center py-24 border border-black/5 dark:border-white/5 rounded-3xl">
            <p className="text-black/40">No lifestyle products found at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lifestyleProducts.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden hover:border-black/20 transition-all duration-500"
              >
                <div className="relative bg-zinc-50 dark:bg-zinc-900 m-3 rounded-2xl h-60 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => navigate(`/product/${product._id}`)} className="bg-black text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl">
                      View
                    </button>
                  </div>
                </div>

                <div className="p-5 pt-2">
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30">{product.brand}</span>
                  <h3 className="text-sm font-black uppercase mt-0.5">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-black">${product.price?.amount}</p>
                    <button onClick={() => navigate(`/product/${product._id}`)} className="group/btn flex items-center gap-2 text-xs font-black uppercase">
                      Buy <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════ */}
      <section className="border-t border-black/5 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Truck size={20}/>, title: "Free Delivery" },
            { icon: <RotateCcw size={20}/>, title: "14-Day Return" },
            { icon: <ShieldCheck size={20}/>, title: "Verified" },
            { icon: <Headphones size={20}/>, title: "24/7 Support" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="opacity-50">{item.icon}</div>
              <span className="text-xs font-bold uppercase tracking-widest">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LifeStyle;