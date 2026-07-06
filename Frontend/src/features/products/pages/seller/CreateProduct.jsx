import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router";
import { ArrowLeft, Tag, Info, DollarSign, Image as ImageIcon, Sparkles, UserCheck } from "lucide-react";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    gender: "Male",
    category: "",
    priceAmount: "",
    priceCurrency: "AUD",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((image) => {
        data.append("images", image);
      });

      const result = await handleCreateProduct(data);
      if (result?.success) {
        navigate("/seller/dashboard");
      }
      
      setFormData({
        name: "",
        brand: "",
        gender: "Male",
        category: "",
        priceAmount: "",
        priceCurrency: "AUD",
        description: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] font-sans antialiased p-4 sm:p-6 lg:p-12 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* TOP BAR NAVIGATION */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition"
          >
            <ArrowLeft size={14} /> Cancel Creation
          </button>
          <span className="bg-black text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-md">
            Catalog Core System
          </span>
        </div>

        {/* WORKSPACE HEADER */}
        <div>
          <span className="text-[10px] tracking-widest font-bold uppercase text-gray-400">Inventory Drop Engine</span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black mt-0.5">List New Master Product</h1>
          <p className="text-gray-400 text-xs mt-1">
            Establish the root identity data for your sneaker model profile. Sizes and color configurations can be appended immediately afterward.
          </p>
        </div>

        {/* CORE ARCHITECTURE FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CONTENT SPECS CONFIGURATION */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* CARD BLOCK 1: PRIMARY RECOGNITION */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <Tag size={16} className="text-gray-400" />
                <h2 className="text-xs font-black uppercase tracking-wider text-black">Product Details</h2>
              </div>

              {/* PRODUCT NAME */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Model/Silhouette Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Quantum Runner Pro"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl px-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                  required
                />
              </div>

              {/* TWO COLUMN: BRAND + CATEGORY */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Brand Label</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="e.g., Nike, Adidas"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl px-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Division Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g., Sportswear, Retro"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl px-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* GENDER FOCUS SEGMENTED SELECTION */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Target Audience demographic</label>
                <div className="relative flex items-center">
                  <UserCheck size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-bold rounded-xl pl-12 pr-4 py-3.5 transition outline-none text-black cursor-pointer appearance-none"
                  >
                    <option value="Male">Men's Apparel / Unisex</option>
                    <option value="Female">Women's Apparel</option>
                  </select>
                  <div className="absolute right-4 pointer-events-none text-gray-400 text-xs font-bold">▼</div>
                </div>
              </div>
            </div>

            {/* CARD BLOCK 2: VALUATION SYSTEM */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <DollarSign size={16} className="text-gray-400" />
                <h2 className="text-xs font-black uppercase tracking-wider text-black">Financial Metrics</h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Retail Base Amount</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-sm font-bold text-gray-400">$</span>
                    <input
                      type="number"
                      name="priceAmount"
                      placeholder="180"
                      value={formData.priceAmount}
                      onChange={handleChange}
                      className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl pl-8 pr-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-1 space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Currency Unit</label>
                  <select
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-bold rounded-xl px-4 py-3.5 transition outline-none text-black cursor-pointer"
                  >
                    <option value="AUD">AUD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: COMPLEMENTARY MEDIA + STORY DESCRIPTION */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CARD BLOCK 3: DISCOVERY MEDIA BOX */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <ImageIcon size={16} className="text-gray-400" />
                <h2 className="text-xs font-black uppercase tracking-wider text-black">Primary Assets</h2>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Catalog Grid Photos</label>
                <div className="border border-dashed border-gray-200 rounded-2xl p-6 bg-[#FAFAFB] text-center hover:bg-gray-50/50 transition relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <ImageIcon size={28} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-black">Upload Master Product Images</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {images.length > 0 ? `${images.length} assets selected` : "Drag files here or browse folder"}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD BLOCK 4: REFINED DESCRIPTION BLOCK */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <Info size={16} className="text-gray-400" />
                <h2 className="text-xs font-black uppercase tracking-wider text-black">Editorial Copy</h2>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Public Story/Specifications Description</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Draft the style manifesto, structural design, tech specifications, or unique color history narrative for this release model..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl p-4 transition outline-none text-black placeholder-gray-400 resize-none leading-relaxed"
                  required
                />
              </div>

              {/* MASTER SUBMIT TRIGGER CONTROLLER */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-black/5 pt-3"
              >
                <Sparkles size={14} />
                <span>{isSubmitting ? "Broadcasting Profile..." : "Initialize Product"}</span>
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;