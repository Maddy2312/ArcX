import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart";
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router";

const Cart = () => {
  const { handleGetCart, handleUpdateCartQuantity, handleRemoveFromCart } = useCart();
  const navigate = useNavigate();

  const {
    items = [],
    totalPrice,
    currency,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    handleGetCart();
  }, []);

  const adjustQuantity = async (itemId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      await handleRemoveFromCart(itemId);
    } else {
      await handleUpdateCartQuantity(itemId, newQty);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Retrieving Your Bag...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-md w-full text-center">
          <p className="text-red-500 font-bold text-sm tracking-tight mb-4">{error}</p>
          <button 
            onClick={() => handleGetCart()}
            className="text-xs font-bold uppercase tracking-wider bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] font-sans antialiased p-4 sm:p-6 lg:p-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* NAVIGATION TOP BAR */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition"
          >
            <ArrowLeft size={14} /> Continue Browsing
          </button>
          <span className="bg-black text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-md">
            Secure Checkout Manifest
          </span>
        </div>

        {/* BAG TITLE SECTION */}
        <div>
          <span className="text-[10px] tracking-widest font-bold uppercase text-gray-400">Review Selection</span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black mt-0.5">Your Shopping Bag</h1>
          <p className="text-gray-400 text-xs mt-1">
            Allocation slots for limited models are reserved dynamically upon starting process validation.
          </p>
        </div>

        {/* EMPTY BAG COMPONENT ROUTER */}
        {items.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-[#F5F6F7] rounded-2xl flex items-center justify-center mx-auto text-gray-400">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-black uppercase">Your Bag is Empty</h3>
              <p className="text-xs text-gray-400 mt-1">You haven't allocated any premium stock profiles to this cart profile yet.</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-gray-800 transition"
            >
              Explore Collection <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT CONTAINER: CART SELECTIONS LIST */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const product = item.product;
                const variant = product?.variants;

                return (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative group hover:border-gray-200 transition"
                  >
                    {/* THUMBNAIL CONTAINER */}
                    <div className="w-full sm:w-28 h-28 bg-[#F5F6F7] rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={
                          variant?.images?.[0]?.url ||
                          product?.images?.[0]?.url ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product?.name}
                        className="w-24 h-24 object-contain mix-blend-darken transform group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* PRODUCT CONTENT SPECS */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          {product?.brand || "Brand Edition"}
                        </span>
                        <h2 className="text-base font-extrabold text-black uppercase truncate tracking-tight mt-0.5">
                          {product?.name}
                        </h2>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          <p>
                            <span className="text-gray-400">Colorway:</span> {variant?.color || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* STYLISH INCREMENT / DECREMENT STEPPER NODES */}
                      <div className="mt-4 sm:mt-0 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item._id, item.quantity, -1)}
                          className="w-8 h-8 rounded-lg bg-[#F5F6F7] flex items-center justify-center text-black hover:bg-black hover:text-white transition active:scale-95"
                        >
                          <Minus size={12} />
                        </button>
                        <div className="w-10 text-center text-xs font-black tracking-tight text-black">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item._id, item.quantity, 1)}
                          className="w-8 h-8 rounded-lg bg-[#F5F6F7] flex items-center justify-center text-black hover:bg-black hover:text-white transition active:scale-95"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* ACTIONS & AGGREGATE SUBTOTAL DISPLAY */}
                    <div className="flex sm:flex-col justify-between items-end border-t sm:border-t-0 border-gray-50 pt-4 sm:pt-0 shrink-0 min-w-[120px]">
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Subtotal</span>
                        <p className="text-lg font-black text-black tracking-tight">
                          {item.price?.amount * item.quantity} {item.price?.currency}
                        </p>
                      </div>

                      <button 
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-600 transition p-1 rounded-lg"
                      >
                        <Trash2 size={13} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT CONTAINER: PRICING LEDGER METRICS */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 sticky top-6">
              <div>
                <h2 className="text-sm font-black tracking-tight text-black uppercase">Order Summary</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Calculated ledger breakdowns including immediate dynamic volumes.</p>
              </div>

              {/* METRIC MATRIX ROWS */}
              <div className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Unique Line Profiles</span>
                  <span className="text-black font-extrabold">{items.length}</span>
                </div>

                <div className="flex justify-between items-center text-gray-400">
                  <span>Gross Item Count</span>
                  <span className="text-black font-extrabold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)} Units
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-400">
                  <span>Shipping Allocation</span>
                  <span className="text-green-600 font-extrabold">Complimentary</span>
                </div>

                <div className="border-t border-gray-50 my-2 pt-4 flex justify-between items-baseline text-black">
                  <span className="text-sm font-black">Total Ledger</span>
                  <span className="text-2xl font-black tracking-tight">
                    {totalPrice} {currency}
                  </span>
                </div>
              </div>

              {/* DISPATCH ACTION PIPELINE TRIGGER */}
              <button className="w-full bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] shadow-md shadow-black/5">
                <span>Proceed To Execution Portal</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;