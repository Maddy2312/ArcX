import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import { ArrowLeft, Plus, Layers, Package, Sliders, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

const SellerProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails, handleAddVariants } = useProduct();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form interactive states
  const [size, setSize] = useState("");
  const [sizeStandard, setSizeStandard] = useState("US");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

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

    for (let img of images) {
      formData.append("images", img);
    }

    try {
      await handleAddVariants(id, formData);
      await fetchProduct();

      // Reset on clean response status
      setSize("");
      setSizeStandard("US");
      setColor("");
      setStock("");
      setImages([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSize = (v) => {
    if (!v?.size) return {};
    return Array.isArray(v.size) ? v.size[0] : v.size;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Catalog Pair...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] font-sans antialiased p-4 sm:p-6 lg:p-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BACK TO DASHBOARD NAVIGATION BAR */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/seller/dashboard")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition"
          >
            <ArrowLeft size={14} /> Back to Listings
          </button>
          <span className="bg-black text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-md">
            Product Admin Profile
          </span>
        </div>

        {/* SECTION 1: MASTER PRODUCT MATRICES */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Primary Multi-Image Canvas Stream */}
          <div className="md:col-span-5 bg-[#F5F6F7] p-6 flex flex-col justify-between min-h-[320px]">
            <div className="flex-grow flex items-center justify-center">
              {product.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="max-h-56 object-contain mix-blend-darken drop-shadow-md"
                />
              ) : (
                <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">No Primary Asset Uploaded</p>
              )}
            </div>
            
            {/* Horizontal gallery strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pt-4 scrollbar-none">
                {product.images.map((img) => (
                  <img
                    key={img._id}
                    src={img.url}
                    alt=""
                    className="w-14 h-14 bg-white object-contain p-1 rounded-xl border border-gray-200/50 flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Profile Information Details */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                {product.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
                {product.name}
              </h1>
              <p className="text-2xl font-black text-black mt-3">
                ${product.price?.amount}{" "}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  {product.price?.currency || "USD"}
                </span>
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Description Summary</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {product.description || "No public production details provided for this inventory model code item yet."}
              </p>
            </div>
          </div>
        </div>

        {/* SPLIT COLUMN CONFIGURATOR COMPONENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: LIVE VARIATION REGISTRY MATRIX */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-gray-400" />
              <h2 className="text-lg font-extrabold tracking-tight text-black">Active Colorway & Size Matrices</h2>
            </div>

            {product.variants?.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 text-xs font-medium">
                No stock definitions configured for this release profile block yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.variants.map((v) => {
                  const s = getSize(v);
                  const isLowStock = (s.stock || 0) <= 5;

                  return (
                    <div
                      key={v._id}
                      onClick={() => navigate(`/seller/product/${id}/variant/${v._id}`)}
                      className="group bg-white rounded-2xl border border-gray-100 hover:border-black shadow-sm overflow-hidden transition cursor-pointer flex flex-col justify-between"
                    >
                      {/* Variant images array line */}
                      <div className="bg-[#F5F6F7] p-2 flex gap-1.5 overflow-x-auto scrollbar-none min-h-[72px]">
                        {v.images && v.images.length > 0 ? (
                          v.images.map((img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              className="w-14 h-14 bg-white rounded-xl object-contain p-0.5 border border-gray-100 flex-shrink-0"
                              alt=""
                            />
                          )
                        )) : (
                          <div className="text-[10px] font-bold text-gray-400 uppercase p-2 flex items-center gap-1">
                            <ImageIcon size={12} /> Standalone Mix Color
                          </div>
                        )}
                      </div>

                      {/* Attribute specs display breakdown */}
                      <div className="p-4 space-y-2.5 bg-white">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-gray-400">Scale Matrix</span>
                          <span className="font-bold text-black">{s.sizeStandard || "US"} {s.sizeOfShoe || "N/A"}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-gray-400">Color Profile</span>
                          <span className="font-bold text-black uppercase tracking-wider text-[11px]">{v.color || "Default"}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs font-medium pt-2 border-t border-gray-50">
                          <span className="text-gray-400">Stock Availability</span>
                          <span className={`inline-flex items-center gap-1 font-bold ${isLowStock ? "text-red-500" : "text-green-600"}`}>
                            {isLowStock ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                            {s.stock || 0} Units
                          </span>
                        </div>

                        {/* Inventory stock visual dynamic indicator bar */}
                        <div className="w-full h-1.5 bg-[#F5F6F7] rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${isLowStock ? "bg-red-500" : "bg-black"}`}
                            style={{ width: `${Math.min((s.stock || 0) * 10, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: INTERACTIVE STOCK VARIANT MUTATOR FORM */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-gray-400" />
              <h2 className="text-lg font-extrabold tracking-tight text-black">Append New Batch</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* COMPACT TWO-COLUMN INPUT: SIZE + METRIC SPEC */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Scale Metric</label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="9.5"
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl px-4 py-3.5 transition outline-none text-black"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Region Rule</label>
                  <select
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-bold rounded-xl px-4 py-3.5 transition outline-none text-black cursor-pointer"
                    value={sizeStandard}
                    onChange={(e) => setSizeStandard(e.target.value)}
                  >
                    <option value="US">US Scale</option>
                    <option value="UK">UK Scale</option>
                    <option value="EU">EU Scale</option>
                  </select>
                </div>
              </div>

              {/* COLOR INTERFACE FIELDS */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Colorway Token</label>
                <input
                  type="text"
                  placeholder="e.g., Triple White / Gum"
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl px-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </div>

              {/* BATCH VOLUMETRIC COUNT */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Opening Vault Volume</label>
                <div className="relative flex items-center">
                  <Package size={16} className="absolute left-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl pl-12 pr-4 py-3.5 transition outline-none text-black"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* MULTI IMAGE FILES CONFIGURATOR PANEL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Colorway Media Capture</label>
                <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-[#FAFAFB] text-center hover:bg-gray-50/50 transition relative">
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setImages([...e.target.files])}
                  />
                  <ImageIcon size={20} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-black">Upload Product Images</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {images.length > 0 ? `${images.length} assets scheduled` : "Select or drag files here"}
                  </p>
                </div>
              </div>

              {/* FORM EXECUTION TRIGGER BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white text-sm font-semibold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] disabled:opacity-50 shadow-md shadow-black/5 mt-2"
              >
                <Plus size={16} />
                <span>{isSubmitting ? "Syncing Manifest..." : "Deploy Variant Drop"}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerProductDetails;