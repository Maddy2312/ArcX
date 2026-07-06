import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import useCart from "../../../cart/hooks/useCart.js";
import { ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeft, Star, Layers, Zap } from "lucide-react";

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

  useEffect(() => {
    async function getProductDetails() {
      const res = await handleProductDetails(id);

      if (res?.product) {
        setProduct(res.product);

        setSelectedImage(
          res.product.variants[0]?.images[0]?.url ||
            res.product.images[0]?.url
        );

        setSelectedSize(res.product.variants[0]?.size[0]);
      }
    }

    getProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];

  const addToCart = async () => {
    try {
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      setLoading(true);
      const result = await handleAddToCart(product._id, variant._id);
      if (result) {
        navigate("/cart");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F9FA] min-h-screen text-[#1A1A1A] font-sans antialiased pb-20">
      {/* Top Breadcrumb Header Line */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid lg:grid-cols-12 gap-12 bg-white rounded-[40px] p-6 lg:p-12 border border-gray-100 shadow-sm">
          
          {/* LEFT: MEDIA GALLERY DISPLAY CONTAINER */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Stage Presentation Wrapper */}
            <div className="relative bg-[#F5F6F7] rounded-3xl overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center p-8 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-darken transform group-hover:scale-105 transition duration-700 ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.08)]"
              />
              <span className="absolute top-6 left-6 bg-black text-white text-[10px] tracking-widest font-bold uppercase px-3 py-1.5 rounded-md">
                {product.category}
              </span>
            </div>

            {/* Alternating Sub-Thumbnails Row */}
            <div className="flex flex-wrap gap-4">
              {variant.images.map((image) => (
                <button
                  key={image._id}
                  onClick={() => setSelectedImage(image.url)}
                  className={`w-24 h-24 rounded-2xl p-2 bg-[#F5F6F7] border-2 transition overflow-hidden flex items-center justify-center ${
                    selectedImage === image.url ? "border-black scale-95" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={image.url} alt="Variant view" className="max-h-full max-w-full object-contain mix-blend-darken" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONFIGURATOR AND DATA META COLUMN */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Brand, Badges & Meta Layout Block */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black tracking-widest text-gray-400 uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  <Star size={14} className="fill-black text-black" />
                  <span className="text-xs font-bold">4.9</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-3xl font-black tracking-tight text-black">
                  ${product.price.amount}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {product.price.currency}
                </span>
              </div>

              {/* Editorial Description Text Segment */}
              <p className="text-gray-500 text-sm mt-6 leading-relaxed border-b border-gray-100 pb-6">
                {product.description || "Premium construction crafted with high-grade breathable textiles, supporting optimized dynamic lifestyle requirements and daily urban cushioning needs."}
              </p>

              {/* COLORS INVENTORY CONTROLLERS */}
              <div className="mt-6">
                <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                  Select Colorway
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v, index) => (
                    <button
                      key={v._id}
                      onClick={() => {
                        setSelectedVariant(index);
                        setSelectedImage(v.images[0]?.url);
                        setSelectedSize(v.size[0]);
                      }}
                      className={`text-xs font-bold px-5 py-3 rounded-xl border transition-all ${
                        selectedVariant === index
                          ? "bg-black text-white border-black shadow-md shadow-black/10"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZES MATRIX GRID */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Select Available Size
                  </h3>
                  <span className="text-xs text-gray-400 underline cursor-pointer hover:text-black">
                    Size Guide
                  </span>
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
                        className={`py-3.5 border rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                          outOfStock 
                            ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed line-through" 
                            : isSelected
                              ? "bg-black text-white border-black shadow-md shadow-black/10"
                              : "bg-white border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span>{size.sizeStandard} {size.sizeOfShoe}</span>
                        {size.stock > 0 && size.stock <= 3 && (
                          <span className={`text-[8px] absolute bottom-1 font-semibold ${isSelected ? "text-gray-300" : "text-orange-500"}`}>
                            Low stock
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STOCK STATUS BLOCK */}
              <div className="mt-4 flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${selectedSize?.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className={`text-xs font-bold tracking-tight ${selectedSize?.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {selectedSize?.stock > 0 ? `${selectedSize.stock} units available at this tier` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* ACTION FOOTER BLOCK & ASSURANCES */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  onClick={addToCart}
                  disabled={loading || selectedSize?.stock <= 0}
                  className="flex-1 bg-black text-white font-medium py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-black/5"
                >
                  <ShoppingCart size={18} />
                  {loading ? "Allocating..." : "Secure To Bag"}
                </button>

                <button className="px-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-black">
                  <Heart size={20} />
                </button>
              </div>

              <button className="w-full bg-[#EAECED] text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition active:scale-[0.99]">
                Express Checkout
              </button>

              {/* VALUE CHAIN BENEFITS WRAP */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <Truck size={18} className="text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-800">Free Air Shipping</p>
                    <p className="text-[10px] text-gray-400">Arrives in 2-4 days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <ShieldCheck size={18} className="text-gray-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-800">Authentic Secure</p>
                    <p className="text-[10px] text-gray-400">Certified marketplace</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetails;