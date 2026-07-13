import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Extracting data from URL query params
  const orderId = searchParams.get("order_id");
  
  // Simulated verification state
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    // In a real app, you might trigger a final order confirmation 
    // API call here using the orderId from the URL
    if (orderId) {
      setTimeout(() => setStatus("success"), 1000);
    } else {
      setStatus("error");
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Status Indicator */}
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-300">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>

        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Order Confirmed</h1>
          <p className="text-black/50 dark:text-white/50 text-sm mt-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-black/40 dark:text-white/40">Order ID</span>
            <span className="font-bold font-mono">{orderId || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-black/40 dark:text-white/40">Status</span>
            <span className="text-emerald-500 font-black uppercase tracking-widest text-xs">Paid</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-transparent border border-black/10 dark:border-white/10 text-black dark:text-white font-black uppercase tracking-wider text-xs py-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-center gap-2"
          >
            <Home size={14} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;