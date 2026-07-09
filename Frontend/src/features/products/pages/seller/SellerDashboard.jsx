import React, { useEffect } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Plus, Package, DollarSign, TrendingUp, ArrowUpRight,
  Sliders, Box, ArrowRight, LayoutDashboard, BarChart3
} from "lucide-react";

const SellerDashboard = () => {
  const { handleSellerProducts } = useProduct();
  const products = useSelector((state) => state.product.sellerProducts);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    handleSellerProducts();
  }, []);

  const totalItems = products?.length || 0;
  const activeValue = products?.reduce((acc, curr) => acc + (Number(curr.price?.amount) || 0), 0) || 0;
  const avgPrice = totalItems > 0 ? Math.round(activeValue / totalItems) : 0;

  const stats = [
    {
      label: "Active Listings",
      value: totalItems,
      icon: <Package size={18} />,
      sub: "Products live",
    },
    {
      label: "Catalog Value",
      value: `$${activeValue.toLocaleString()}`,
      icon: <DollarSign size={18} />,
      sub: "Total inventory",
    },
    {
      label: "Avg. Price",
      value: `$${avgPrice}`,
      icon: <BarChart3 size={18} />,
      sub: "Per product",
    },
    {
      label: "Status",
      value: "Verified",
      icon: <TrendingUp size={18} />,
      sub: "Account standing",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Management Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white leading-none">
              Seller<br />Hub
            </h1>
            {user?.name && (
              <p className="text-black/40 dark:text-white/40 text-sm mt-2 font-medium">Welcome back, {user.name.split(" ")[0]}</p>
            )}
          </div>

          <button
            id="create-product-btn"
            onClick={() => navigate("/seller/create-product")}
            className="group inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black text-sm font-black uppercase tracking-wider px-6 py-3.5 rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/10 dark:shadow-white/10 whitespace-nowrap"
          >
            <Plus size={15} />
            New Listing
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative p-6 rounded-3xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                stat.highlight
                  ? "bg-black dark:bg-white border-black dark:border-white"
                  : "bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15"
              }`}
            >
              {/* Bg decoration */}
              <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full ${stat.highlight ? "bg-white/5 dark:bg-black/5" : "bg-black/[0.03] dark:bg-white/[0.03]"}`} />

              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl mb-4 ${
                stat.highlight
                  ? "bg-white/10 dark:bg-black/10 text-white dark:text-black"
                  : "bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50"
              }`}>
                {stat.icon}
              </div>

              <p className={`text-[10px] font-black tracking-[0.15em] uppercase mb-1 ${
                stat.highlight ? "text-white/40 dark:text-black/40" : "text-black/30 dark:text-white/30"
              }`}>
                {stat.label}
              </p>
              <p className={`text-2xl font-black tracking-tight ${
                stat.highlight ? "text-white dark:text-black" : "text-black dark:text-white"
              }`}>
                {stat.value}
              </p>
              <p className={`text-xs mt-1 font-medium ${
                stat.highlight ? "text-white/40 dark:text-black/40" : "text-black/30 dark:text-white/30"
              }`}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Products Section Header */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">Your Listings</h2>
            <p className="text-black/30 dark:text-white/30 text-xs mt-0.5 font-medium">
              {totalItems} product{totalItems !== 1 ? "s" : ""} active
            </p>
          </div>
          <button className="flex items-center gap-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
            <Sliders size={14} />
            Filter
          </button>
        </div>

        {/* Empty State */}
        {(!products || products.length === 0) ? (
          <div className="text-center py-32 border-2 border-dashed border-black/10 dark:border-white/10 rounded-3xl">
            <div className="w-14 h-14 border-2 border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Box size={20} className="text-black/30 dark:text-white/30" />
            </div>
            <h3 className="text-lg font-black uppercase text-black dark:text-white">No listings yet</h3>
            <p className="text-black/30 dark:text-white/30 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
              Create your first product listing to start selling on ArcX.
            </p>
            <button
              onClick={() => navigate("/seller/create-product")}
              className="mt-6 inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
            >
              Create First Listing <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden hover:border-black/20 dark:hover:border-white/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-400 flex flex-col"
              >
                {/* Image */}
                <div className="relative bg-zinc-50 dark:bg-zinc-950 m-3 rounded-2xl h-48 flex items-center justify-center overflow-hidden">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-black/20 dark:text-white/20">
                      <Package size={24} />
                      <span className="text-[10px] font-black uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {product.category || "General"}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 pt-1 flex flex-col flex-1">
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">{product.brand}</span>
                  <h3 className="text-sm font-black uppercase tracking-tight text-black dark:text-white mt-0.5 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-black/30 dark:text-white/30 mt-1 line-clamp-2 leading-relaxed flex-1">
                    {product.description || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                    <div>
                      <p className="text-[9px] font-black tracking-wider uppercase text-black/30 dark:text-white/30">Base Price</p>
                      <p className="text-lg font-black text-black dark:text-white">${product.price?.amount}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/seller/product/${product._id}`)}
                      className="flex items-center gap-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-95"
                    >
                      Manage
                      <ArrowRight size={11} />
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