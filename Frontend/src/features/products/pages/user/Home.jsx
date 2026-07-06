import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Heart, ShoppingCart, Eye, ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleUserProducts } = useProduct();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.product);
  
  useEffect(() => {
    handleUserProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  // Categories placeholder for the quick-navigation categories inspired by the Aero Step UI
  const categories = [
    { name: "Running", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80" },
    { name: "Basketball", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80" },
    { name: "Training", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" },
    { name: "Lifestyle", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] font-sans antialiased">
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-[#EAECEE] overflow-hidden px-6 lg:px-16 rounded-b-[40px]">
        {/* Abstract background typography layer reminiscent of Flare layout */}
        <div className="absolute inset-0 select-none flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[25vw] font-black tracking-tighter">AERO</h1>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block bg-black text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
              Premium Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-black">
              Rhythm, Comfort <br />& City Motion.
            </h1>
            <p className="text-gray-600 text-lg max-w-md font-medium leading-relaxed">
              Engineered with advanced aesthetics and cushioned support. Elevate every single stride through the concrete jungle.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button className="flex items-center gap-2 bg-black text-white font-medium px-8 py-4 rounded-full hover:bg-gray-800 transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/10">
                Explore Catalog <ArrowRight size={18} />
              </button>
              <button className="bg-white border border-gray-200 text-black font-medium px-8 py-4 rounded-full hover:bg-gray-50 transition">
                New Arrivals
              </button>
            </div>
          </div>

          {/* Right Floating Banner Image Area */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="absolute w-[80%] h-[80%] bg-white/40 backdrop-blur-md rounded-[60px] transform rotate-6 pointer-events-none"></div>
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80" 
              alt="Featured Premium Sneaker" 
              className="relative z-10 w-full max-w-[540px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] transform -rotate-12 hover:rotate-0 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-100">
        <div className="flex items-center gap-4 p-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-black"><Truck size={22} /></div>
          <div>
            <h4 className="font-bold text-sm">Free Delivery</h4>
            <p className="text-xs text-gray-400">On all orders over $150</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-black"><RotateCcw size={22} /></div>
          <div>
            <h4 className="font-bold text-sm">14 Days Return</h4>
            <p className="text-xs text-gray-400">Hassle-free dynamic returns</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-black"><ShieldCheck size={22} /></div>
          <div>
            <h4 className="font-bold text-sm">100% Authentic</h4>
            <p className="text-xs text-gray-400">Directly from top brands</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-black"><Headphones size={22} /></div>
          <div>
            <h4 className="font-bold text-sm">24/7 Support</h4>
            <p className="text-xs text-gray-400">Dedicated assistance team</p>
          </div>
        </div>
      </section>

      {/* Grid Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black">Shop By Discipline</h2>
          <p className="text-gray-400 text-sm mt-1">High-performance styles calibrated to your routine.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm">
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{cat.name}</h3>
                  <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Collection →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Dynamic Product Catalog Section */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black">Hot Sellers</h2>
            <p className="text-gray-400 text-sm mt-1">Our most coveted releases active on the streets right now.</p>
          </div>
          <p className="text-sm font-bold bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-gray-700">
            Showing {products.length} Models
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">No Pairs In Stock</h2>
            <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm">
              Our shelves are temporarily clear. Fresh arrivals will show up right here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Wrap */}
                <div className="relative overflow-hidden bg-[#F5F6F7] m-3 rounded-2xl h-64 flex items-center justify-center">
                  <img
                    src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80"}
                    alt={product.name}
                    className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition duration-500 ease-out"
                  />

                  {/* High Quality Badges */}
                  <span className="absolute top-4 left-4 bg-black text-white font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-md shadow-sm">
                    {product.category || "New"}
                  </span>

                  {/* Fast Action Floating Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-black p-2.5 rounded-xl shadow-md hover:bg-black hover:text-white transition">
                      <Heart size={16} />
                    </button>
                    <button className="bg-white text-black p-2.5 rounded-xl shadow-md hover:bg-black hover:text-white transition">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 pt-2 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <span>{product.brand}</span>
                    </div>

                    <h3 className="text-lg font-bold text-black mt-1 line-clamp-1 group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {product.description || "Premium performance build configured for lifestyle aesthetic."}
                    </p>
                  </div>

                  {/* Foot Action Price area */}
                  <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-2xl font-black text-black">
                        ${product.price?.amount}
                      </p>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {product.price?.currency || "USD"}
                      </span>
                    </div>

                    <button 
                      onClick={() => navigate(`/product/${product._id}`)} 
                      className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-gray-800 transition active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;