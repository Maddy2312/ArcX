import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useProduct from "../../hooks/useProduct";
import {
  ArrowLeft, Plus, Ruler, Layers, Package,
  CheckCircle, AlertCircle, ChevronDown, ArrowRight
} from "lucide-react";

const EditVariant = () => {
  const { id, variantId } = useParams();
  const { handleProductDetails, handleAddVariantSize } = useProduct();
  const navigate = useNavigate();

  const [variant, setVariant] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const [sizeOfShoe, setSizeOfShoe] = useState("");
  const [sizeStandard, setSizeStandard] = useState("US");
  const [stock, setStock] = useState("");

  useEffect(() => { fetchVariant(); }, [id, variantId]);

  const fetchVariant = async () => {
    const res = await handleProductDetails(id);
    const found = res.product.variants.find((v) => v._id === variantId);
    setVariant(found);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleAddVariantSize(id, variantId, { sizeOfShoe, sizeStandard, stock });
      await fetchVariant();
      setSizeOfShoe(""); setSizeStandard("US"); setStock("");
      setNotification({ type: "success", msg: "Size added!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", msg: "Failed to add size." });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl px-4 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30";
  const labelClass = "block text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30 mb-2";

  if (!variant) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Loading Variant</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold ${
            notification.type === "success"
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
          }`}>
            {notification.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {notification.msg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/seller/product/${id}`)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Product
          </button>
          <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
            {variant.color || "Default Colorway"}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Variant Editor</span>
          <h1 className="text-4xl font-black uppercase tracking-tight mt-1 text-black dark:text-white">
            Edit Sizes &<br />Stock
          </h1>
        </div>

        {/* Variant Overview */}
        <div className="flex items-center gap-5 p-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl">
          {variant.images?.[0]?.url && (
            <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center shrink-0">
              <img src={variant.images[0].url} className="max-w-[80%] max-h-[80%] object-contain" alt={variant.color} />
            </div>
          )}
          <div>
            <p className="text-[10px] font-black tracking-wider uppercase text-black/30 dark:text-white/30">Colorway</p>
            <p className="text-lg font-black text-black dark:text-white mt-0.5">{variant.color}</p>
            <p className="text-xs text-black/40 dark:text-white/40 mt-0.5">{variant.size?.length || 0} size entries</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT — Current Sizes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">
                Current Stock ({variant.size?.length || 0} sizes)
              </span>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {(!variant.size || variant.size.length === 0) ? (
                <div className="text-center py-10 border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl">
                  <Ruler size={18} className="text-black/20 dark:text-white/20 mx-auto mb-2" />
                  <p className="text-xs font-black uppercase text-black/20 dark:text-white/20">No sizes yet</p>
                </div>
              ) : (
                variant.size.map((s, i) => {
                  const isLow = (s.stock || 0) <= 5;
                  const isOOS = (s.stock || 0) === 0;
                  return (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-4 py-3 rounded-2xl border transition-all ${
                        isOOS
                          ? "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30"
                          : isLow
                            ? "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30"
                            : "bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5"
                      }`}
                    >
                      <span className="text-sm font-black uppercase tracking-tight text-black dark:text-white">
                        {s.sizeStandard} {s.sizeOfShoe}
                      </span>
                      <div className="flex items-center gap-2">
                        {isOOS ? (
                          <AlertCircle size={13} className="text-red-500" />
                        ) : isLow ? (
                          <AlertCircle size={13} className="text-orange-500" />
                        ) : (
                          <CheckCircle size={13} className="text-emerald-500" />
                        )}
                        <span className={`text-xs font-black ${isOOS ? "text-red-500" : isLow ? "text-orange-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {isOOS ? "Out of Stock" : `${s.stock} units`}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT — Add Size Form */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plus size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">Add New Size</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6">
              {/* Size Number */}
              <div>
                <label className={labelClass}>Size (Number)</label>
                <div className="relative">
                  <Ruler size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g., 10.5"
                    value={sizeOfShoe}
                    onChange={(e) => setSizeOfShoe(e.target.value)}
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Size Standard */}
              <div>
                <label className={labelClass}>Size Standard</label>
                <div className="relative">
                  <select
                    value={sizeStandard}
                    onChange={(e) => setSizeStandard(e.target.value)}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    {["US", "UK", "EU", "CM"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <div className="relative">
                  <Package size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                  <input
                    type="number"
                    placeholder="e.g., 25"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    min="0"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.99] disabled:opacity-50 text-sm mt-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                ) : (
                  <><Plus size={16} /> Add Size Entry</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVariant;