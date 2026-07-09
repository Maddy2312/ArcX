import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Tag, Info, DollarSign, Image as ImageIcon,
  Sparkles, UserCheck, Upload, X, ArrowRight, ChevronDown
} from "lucide-react";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    gender: "Male",
    category: "",
    priceAmount: "",
    priceCurrency: "USD",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (idx) => {
    setImages((p) => p.filter((_, i) => i !== idx));
    setPreviewImages((p) => p.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      images.forEach((image) => data.append("images", image));

      const result = await handleCreateProduct(data);
      if (result?.success) navigate("/seller/dashboard");

      setFormData({ name: "", brand: "", gender: "Male", category: "", priceAmount: "", priceCurrency: "USD", description: "" });
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl px-4 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30";
  const labelClass = "block text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30 mb-2";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/20 dark:text-white/20 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Seller Portal
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">New Product</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1 text-black dark:text-white leading-none">
            Create<br />Listing
          </h1>
          <p className="text-black/40 dark:text-white/40 text-sm mt-3 font-medium">
            Fill in the product details below. Variants and sizes can be added after creation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Core Info */}
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">Core Information</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Product Name */}
              <div>
                <label className={labelClass}>Product Name</label>
                <div className="relative">
                  <Tag size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                  <input
                    id="product-name"
                    type="text"
                    name="name"
                    placeholder="ArcX Air Pro 3"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className={labelClass}>Brand</label>
                <div className="relative">
                  <Sparkles size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                  <input
                    id="product-brand"
                    type="text"
                    name="brand"
                    placeholder="ArcX"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>
                <div className="relative">
                  <Tag size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                  <input
                    id="product-category"
                    type="text"
                    name="category"
                    placeholder="Running, Basketball…"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Target Gender</label>
                <div className="relative">
                  <UserCheck size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`${inputClass} pl-11 appearance-none cursor-pointer`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Kids">Kids</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Product Description</label>
              <textarea
                name="description"
                placeholder="Describe the shoe's technology, materials, and use cases…"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Section: Pricing */}
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">Pricing</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Price */}
              <div>
                <label className={labelClass}>Base Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 text-sm font-black">$</span>
                  <input
                    id="product-price"
                    type="number"
                    name="priceAmount"
                    placeholder="0.00"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className={labelClass}>Currency</label>
                <div className="relative">
                  <select
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    {["USD", "AUD", "EUR", "GBP", "CAD", "JPY"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Images */}
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon size={14} className="text-black/30 dark:text-white/30" />
              <span className="text-xs font-black uppercase tracking-wider text-black/30 dark:text-white/30">Product Images</span>
            </div>

            {/* Upload Zone */}
            <label
              htmlFor="product-images"
              className="relative flex flex-col items-center justify-center gap-3 h-36 border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl cursor-pointer hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={18} className="text-black/30 dark:text-white/30" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-black dark:text-white">Drop images here</p>
                <p className="text-xs text-black/30 dark:text-white/30 mt-0.5">or click to browse — PNG, JPG, WEBP</p>
              </div>
              <input
                id="product-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {previewImages.map((src, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center group/img">
                    <img src={src} alt="" className="max-w-full max-h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black dark:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                    >
                      <X size={10} className="text-white dark:text-black" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="sm:w-40 py-4 border-2 border-black/10 dark:border-white/10 rounded-2xl text-sm font-black uppercase tracking-wider text-black/60 dark:text-white/60 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              id="create-product-submit"
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 text-sm shadow-lg shadow-black/10 dark:shadow-white/10"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Create Listing
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;