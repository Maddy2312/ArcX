import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import useCart from "../../../cart/hooks/useCart.js";
import {
  ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeft,
  Star, Zap, ChevronRight, Share2, RotateCcw
} from "lucide-react";

const UserProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails } = useProduct();
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      const res = await handleProductDetails(id);
      if (res?.product) {
        setProduct(res.product);
        setSelectedImage(res.product.variants[0]?.images[0]?.url || res.product.images[0]?.url);
        setSelectedSize(res.product.variants[0]?.size[0]);
      }
    }
    getProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Loading Product</p>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];

  const addToCart = async () => {
    try {
      if (!selectedSize) { alert("Please select a size"); return; }
      setLoading(true);
      const result = await handleAddToCart(product._id, variant._id);
      if (result) navigate("/cart");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 pb-24">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-black/40 dark:text-white/40">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-black/60 dark:text-white/60">{product.category}</span>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-black dark:text-white font-bold line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── LEFT: IMAGE GALLERY ── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image Stage */}
            <div className="relative bg-zinc-50 dark:bg-zinc-950 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden h-[480px] md:h-[580px] flex items-center justify-center group">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain transition-all duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
              />

              {/* Top labels */}
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                <span className="bg-black dark:bg-white text-white dark:text-black text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Top right actions */}
              <div className="absolute top-5 right-5 flex gap-2">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    wishlisted
                      ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                      : "bg-white/80 dark:bg-black/80 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 backdrop-blur-sm hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Heart size={15} className={wishlisted ? "fill-current" : ""} />
                </button>
                <button className="w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all">
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {variant.images.map((image) => (
                <button
                  key={image._id}
                  onClick={() => setSelectedImage(image.url)}
                  className={`shrink-0 w-20 h-20 rounded-2xl border-2 transition-all duration-200 overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center ${
                    selectedImage === image.url
                      ? "border-black dark:border-white scale-95"
                      : "border-black/5 dark:border-white/5 hover:border-black/30 dark:hover:border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={image.url} alt="" className="max-w-[80%] max-h-[80%] object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: PRODUCT CONFIG ── */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            {/* Brand & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">{product.brand}</span>
              <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
                <Star size={12} className="fill-black dark:fill-white text-black dark:text-white" />
                <span className="text-xs font-black">4.9</span>
                <span className="text-xs text-black/40 dark:text-white/40">(2.1K)</span>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight text-black dark:text-white">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-black tracking-tight">${product.price.amount}</span>
                <span className="text-xs font-bold text-black/30 dark:text-white/30 uppercase tracking-wider">{product.price.currency}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed border-b border-black/5 dark:border-white/5 pb-6">
              {product.description || "Premium construction crafted with high-grade breathable textiles, supporting optimized dynamic lifestyle requirements."}
            </p>

            {/* Colorway Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Colorway</span>
                <span className="text-xs font-bold text-black dark:text-white">{variant.color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, index) => (
                  <button
                    key={v._id}
                    onClick={() => {
                      setSelectedVariant(index);
                      setSelectedImage(v.images[0]?.url);
                      setSelectedSize(v.size[0]);
                    }}
                    className={`text-xs font-bold px-5 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                      selectedVariant === index
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "bg-transparent border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Size</span>
                <button className="text-[10px] font-bold text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {variant.size.map((size) => {
                  const isSelected = selectedSize?._id === size._id;
                  const outOfStock = size.stock <= 0;
                  return (
                    <button
                      key={size._id}
                      disabled={outOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`relative py-3 rounded-xl text-xs font-bold transition-all duration-200 border-2 flex flex-col items-center gap-0.5 ${
                        outOfStock
                          ? "bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-black/20 dark:text-white/20 cursor-not-allowed line-through"
                          : isSelected
                            ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg shadow-black/10 dark:shadow-white/10"
                            : "bg-transparent border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <span>{size.sizeStandard} {size.sizeOfShoe}</span>
                      {size.stock > 0 && size.stock <= 3 && (
                        <span className={`text-[8px] font-black uppercase ${isSelected ? "text-white/60 dark:text-black/60" : "text-orange-500"}`}>
                          Low
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${selectedSize?.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
              <span className={`text-xs font-bold ${selectedSize?.stock > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                {selectedSize?.stock > 0 ? `${selectedSize.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
              <div className="flex gap-3">
                <button
                  onClick={addToCart}
                  disabled={loading || selectedSize?.stock <= 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-lg shadow-black/10 dark:shadow-white/10"
                >
                  <ShoppingCart size={17} />
                  {loading ? "Adding..." : "Add to Bag"}
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${
                    wishlisted
                      ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                      : "border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Heart size={18} className={wishlisted ? "fill-current" : ""} />
                </button>
              </div>
              <button className="w-full py-4 rounded-2xl border-2 border-black/10 dark:border-white/10 text-black dark:text-white font-black uppercase tracking-wider text-sm hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/30 dark:hover:border-white/30 transition-all duration-200 active:scale-[0.98]">
                Express Checkout
              </button>
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Truck size={16} />, title: "Free Shipping", sub: "2–4 business days" },
                { icon: <ShieldCheck size={16} />, title: "Authenticated", sub: "Certified pair" },
                { icon: <RotateCcw size={16} />, title: "Easy Returns", sub: "14-day window" },
                { icon: <Zap size={16} />, title: "Arc Tech", sub: "Premium build" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl">
                  <div className="text-black/40 dark:text-white/40">{item.icon}</div>
                  <div>
                    <p className="text-xs font-black text-black dark:text-white">{item.title}</p>
                    <p className="text-[10px] text-black/40 dark:text-white/40">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetails;