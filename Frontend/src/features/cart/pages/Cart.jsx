import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import {
  ShoppingBag, Trash2, ArrowRight, ArrowLeft,
  Plus, Minus, Tag, Truck, ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router";

const Cart = () => {
  const { handleGetCart, handleUpdateCartQuantity, handleRemoveFromCart, handleCreateOrder, handleVerifyOrder } = useCart();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const { items = [], totalPrice, currency, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    handleGetCart();
  }, []);

  const { isLoading, Razorpay } = useRazorpay();

  const handleCheckout = async () => {
    try {
      const order = await handleCreateOrder();
      const options = {
      key: "rzp_test_TCriJBS9uh82ew",
      amount: order.amount, // Amount in paise
      currency: order.currency,
      name: "ArcX",
      description: "Test Transaction",
      order_id: order.id, // Generate order_id on server
      handler: async (response) => {
        const res = await handleVerifyOrder({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
        if(res.success){
          alert("Payment Successful!");
          navigate(`/order-success?order_id=${response?.razorpay_order_id}`)
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.contact,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Retrieving Your Bag</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6">
        <div className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 p-8 rounded-3xl max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-950 rounded-2xl flex items-center justify-center mx-auto">
            <ShoppingBag size={20} className="text-red-500" />
          </div>
          <p className="text-red-500 font-bold text-sm">{error}</p>
          <button
            onClick={() => handleGetCart()}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </button>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Secure Checkout
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Your Selection</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1 text-black dark:text-white">
            Shopping<br />Bag
          </h1>
          {items.length > 0 && (
            <p className="text-black/40 dark:text-white/40 text-sm mt-2">{items.length} item{items.length !== 1 ? "s" : ""} in your bag</p>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-32 border border-black/5 dark:border-white/5 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="w-16 h-16 border-2 border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={22} className="text-black/30 dark:text-white/30" />
            </div>
            <h3 className="text-xl font-black uppercase text-black dark:text-white">Empty Bag</h3>
            <p className="text-black/40 dark:text-white/40 mt-2 text-sm max-w-xs mx-auto">
              Your bag is empty. Discover our collection and find your perfect pair.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-8 inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
            >
              Explore Collection <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const product = item.product;
                const variant = product?.variants;
                return (
                  <div
                    key={item._id}
                    className="group flex flex-col sm:flex-row gap-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-5 rounded-3xl hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="w-full sm:w-28 h-28 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={variant?.images?.[0]?.url || product?.images?.[0]?.url || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80"}
                        alt={product?.name}
                        className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">
                          {product?.brand || "ArcX"}
                        </span>
                        <h2 className="text-base font-black uppercase tracking-tight text-black dark:text-white mt-0.5 line-clamp-1">
                          {product?.name}
                        </h2>
                        {variant?.color && (
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">Color:</span>
                            <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">{variant.color}</span>
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-1">
                          <button
                            onClick={() => adjustQuantity(item._id, item.quantity, -1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all active:scale-90"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-black text-black dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => adjustQuantity(item._id, item.quantity, 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all active:scale-90"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex sm:flex-col justify-between items-end sm:min-w-[110px]">
                      <div className="text-right">
                        <span className="text-[9px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30 block">Subtotal</span>
                        <p className="text-xl font-black tracking-tight text-black dark:text-white mt-0.5">
                          ${item.price?.amount * item.quantity}
                        </p>
                        <span className="text-[9px] font-bold text-black/30 dark:text-white/30 uppercase">{item.price?.currency}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black/30 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 mt-2"
                      >
                        <Trash2 size={12} />
                        <span className="hidden sm:block">Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 space-y-4 sticky top-28">
              <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-6">
                <div>
                  <h2 className="text-xs font-black tracking-[0.15em] uppercase text-black dark:text-white">Order Summary</h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-black/50 dark:text-white/50">
                    <span className="font-semibold">Subtotal</span>
                    <span className="font-black text-black dark:text-white">${totalPrice} {currency}</span>
                  </div>
                  <div className="flex justify-between items-center text-black/50 dark:text-white/50">
                    <span className="font-semibold">Items</span>
                    <span className="font-black text-black dark:text-white">{items.reduce((sum, i) => sum + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-black/50 dark:text-white/50">
                    <span className="font-semibold">Shipping</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">Free</span>
                  </div>

                  <div className="border-t border-black/5 dark:border-white/5 pt-4 flex justify-between items-baseline">
                    <span className="font-black text-black dark:text-white uppercase tracking-wide text-sm">Total</span>
                    <div className="text-right">
                      <p className="text-2xl font-black text-black dark:text-white tracking-tight">${totalPrice}</p>
                      <span className="text-[9px] font-bold text-black/30 dark:text-white/30 uppercase">{currency}</span>
                    </div>
                  </div>
                </div>

                {/* Promo code input */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 text-xs font-bold rounded-xl pl-9 pr-3 py-3 outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                  <button className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-xs font-black text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition">
                    Apply
                  </button>
                </div>

                <button onClick={handleCheckout} className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/10 dark:shadow-white/10">
                  Checkout
                  <ArrowRight size={16} />
                </button>

                {/* Assurances */}
                <div className="flex items-center justify-center gap-5 text-black/30 dark:text-white/30">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <ShieldCheck size={12} />
                    Secure
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <Truck size={12} />
                    Free Ship
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;