import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import {
  ArrowLeft, Plus, Layers, Package, Sliders, Image as ImageIcon,
  CheckCircle, AlertCircle, Upload, X, ArrowRight, ChevronDown, Edit3
} from "lucide-react";

const SellerProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails, handleAddVariants } = useProduct();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [notification, setNotification] = useState(null);

  const [size, setSize] = useState("");
  const [sizeStandard, setSizeStandard] = useState("US");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    const res = await handleProductDetails(id);
    setProduct(res.product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("size", size);
    formData.append("sizeStandard", sizeStandard);
    formData.append("stock", stock);
    formData.append("color", color);
    for (let img of images) formData.append("images", img);

    try {
      await handleAddVariants(id, formData);
      await fetchProduct();
      setSize(""); setSizeStandard("US"); setColor(""); setStock(""); setImages([]); setPreviewImages([]);
      setNotification({ type: "success", msg: "Variant added successfully!" });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", msg: "Failed to add variant. Try again." });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (idx) => {
    setImages((p) => p.filter((_, i) => i !== idx));
    setPreviewImages((p) => p.filter((_, i) => i !== idx));
  };

  const inputClass = "w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl px-4 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30";
  const labelClass = "block text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30 mb-2";

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Loading Product</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold transition-all ${
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
            onClick={() => navigate("/seller/dashboard")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Dashboard
          </button>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/20 dark:text-white/20 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Seller Portal
          </span>
        </div>

        {/* Product Overview Card */}
        <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Product Image */}
            <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center shrink-0">
              {product.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              ) : (
                <Package size={24} className="text-black/20 dark:text-white/20" />
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">{product.brand}</span>
              <h1 className="text-2xl font-black uppercase tracking-tight mt-0.5 text-black dark:text-white">{product.name}</h1>
              <div className="flex flex-wrap gap-3 mt-3">
                {[
                  { label: "Category", val: product.category },
                  { label: "Price", val: `$${product.price?.amount} ${product.price?.currency}` },
                  { label: "Variants", val: `${product.variants?.length || 0} colorways` },
                ].map((item) => (
                  <div key={item.label} className="bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-xl px-3 py-2">
                    <p className="text-[9px] font-black tracking-wider uppercase text-black/30 dark:text-white/30">{item.label}</p>
                    <p className="text-xs font-black text-black dark:text-white mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT: Add Variant Form */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Plus size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">Add Colorway Variant</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6">
              {/* Color */}
              <div>
                <label className={labelClass}>Colorway Name</label>
                <input
                  type="text"
                  placeholder="Midnight Black, Arctic White…"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Size */}
                <div>
                  <label className={labelClass}>Initial Size</label>
                  <input
                    type="text"
                    placeholder="9.5"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Size Standard */}
                <div>
                  <label className={labelClass}>Standard</label>
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
              </div>

              {/* Stock */}
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input
                  type="number"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  min="0"
                  className={inputClass}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className={labelClass}>Variant Images</label>
                <label
                  htmlFor="variant-images"
                  className="flex flex-col items-center justify-center gap-2 h-28 border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl cursor-pointer hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all"
                >
                  <Upload size={16} className="text-black/30 dark:text-white/30" />
                  <p className="text-xs font-bold text-black/40 dark:text-white/40">Upload images</p>
                  <input id="variant-images" type="file" multiple accept="image/*" onChange={handleImageChange} className="sr-only" />
                </label>
                {previewImages.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {previewImages.map((src, i) => (
                      <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center group/img">
                        <img src={src} alt="" className="max-w-full max-h-full object-contain" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-[0.99] disabled:opacity-50 text-sm"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                ) : (
                  <><Plus size={16} /> Add Variant</>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Variants List */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Layers size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">
                Colorways ({product.variants?.length || 0})
              </span>
            </div>

            <div className="space-y-3">
              {(!product.variants || product.variants.length === 0) ? (
                <div className="text-center py-12 border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl">
                  <Layers size={20} className="text-black/20 dark:text-white/20 mx-auto mb-2" />
                  <p className="text-xs font-black uppercase text-black/30 dark:text-white/30">No variants yet</p>
                </div>
              ) : (
                product.variants.map((v) => (
                  <div
                    key={v._id}
                    className="flex items-center gap-4 p-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl hover:border-black/15 dark:hover:border-white/15 transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-950 rounded-xl flex items-center justify-center border border-black/5 dark:border-white/5 shrink-0 overflow-hidden">
                      {v.images?.[0]?.url ? (
                        <img src={v.images[0].url} alt={v.color} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <ImageIcon size={14} className="text-black/20 dark:text-white/20" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase tracking-tight text-black dark:text-white line-clamp-1">{v.color}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {v.size?.map((s, si) => (
                          <span
                            key={si}
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              s.stock > 0
                                ? "bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50"
                                : "bg-red-50 dark:bg-red-950/30 text-red-400"
                            }`}
                          >
                            {s.sizeStandard} {s.sizeOfShoe} {s.stock > 0 ? `(${s.stock})` : "(OOS)"}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Manage Button */}
                    <button
                      onClick={() => navigate(`/seller/product/${id}/variant/${v._id}`)}
                      className="shrink-0 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Edit3 size={12} />
                      Edit
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductDetails;