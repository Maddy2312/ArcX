import React, { useEffect } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Plus, Package, DollarSign, TrendingUp, ArrowUpRight, Sliders, Box } from "lucide-react";

const SellerDashboard = () => {
  const { handleSellerProducts } = useProduct();
  const products = useSelector((state) => state.product.sellerProducts);
  const navigate = useNavigate();

  useEffect(() => {
    handleSellerProducts();
  }, []);

  // Calculate dynamic stats from current products array for a production dashboard feel
  const totalItems = products?.length || 0;
  const activeValue = products?.reduce((acc, curr) => acc + (Number(curr.price?.amount) || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] font-sans antialiased p-6 lg:p-12 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/60 pb-6">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-gray-400">
              Management Portal
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black mt-1">
              Seller Hub
            </h1>
          </div>

          <button 
            onClick={() => navigate("/seller/create-product")}
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-800 transition active:scale-[0.98] shadow-sm"
          >
            <Plus size={16} /> List New Pair
          </button>
        </div>

        {/* ANALYTICS HIGHLIGHT METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Inventory</p>
              <p className="text-3xl font-black text-black">{totalItems}</p>
            </div>
            <div className="p-4 bg-[#F5F6F7] rounded-xl text-black">
              <Package size={20} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catalog Value</p>
              <p className="text-3xl font-black text-black">${activeValue.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-[#F5F6F7] rounded-xl text-black">
              <DollarSign size={20} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform Status</p>
              <p className="text-lg font-black text-green-600 uppercase tracking-wide flex items-center gap-1">
                Verified <TrendingUp size={16} />
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl text-green-600">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* SECTION BREAK HEADER */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-black">Your Listed Products</h2>
            <p className="text-gray-400 text-xs mt-0.5">Edit, track stock, and update active colorway listings.</p>
          </div>
          <div className="text-gray-400 hover:text-black cursor-pointer p-2 rounded-lg bg-white border border-gray-100 shadow-sm">
            <Sliders size={16} />
          </div>
        </div>

        {/* EMPTY STATE BLOCK */}
        {(!products || products.length === 0) ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-[#F5F6F7] text-gray-400 rounded-full flex items-center justify-center mx-auto">
              <Box size={22} />
            </div>
            <div>
              <h3 className="text-md font-bold text-black">No listings found</h3>
              <p className="text-gray-400 text-xs mt-1">Get started by creating your first premium shoe catalog item above.</p>
            </div>
          </div>
        ) : (
          /* ACTIVE MANAGE GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section Container */}
                <div className="relative bg-[#F5F6F7] m-3 rounded-2xl h-52 flex items-center justify-center p-6">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain mix-blend-darken transform group-hover:scale-105 transition duration-500 ease-out"
                    />
                  ) : (
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Image Template Missing</span>
                  )}

                  {/* Category Pill Tag Overlay */}
                  <span className="absolute top-4 left-4 bg-white text-black font-bold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-md border border-gray-100 shadow-sm">
                    {product.category || "General"}
                  </span>
                </div>

                {/* Info Text Content Layout Block */}
                <div className="p-5 pt-1 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      {product.brand}
                    </span>
                    <h3 className="text-lg font-bold text-black tracking-tight line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Base Value</p>
                      <p className="text-xl font-black text-black">
                        ${product.price?.amount} <span className="text-xs font-bold text-gray-400">{product.price?.currency || "USD"}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/seller/product/${product._id}`)}
                      className="inline-flex items-center gap-1.5 bg-[#EAECED] text-black font-bold text-xs px-4 py-3 rounded-xl hover:bg-black hover:text-white transition"
                    >
                      Manage Pair
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SellerDashboard;