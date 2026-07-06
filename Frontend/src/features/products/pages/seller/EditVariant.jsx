import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useProduct from "../../hooks/useProduct";
import { ArrowLeft, Plus, Ruler, Layers, Package, CheckCircle, AlertCircle } from "lucide-react";

const EditVariant = () => {
  const { id, variantId } = useParams();
  const { handleProductDetails, handleAddVariantSize } = useProduct();
  const navigate = useNavigate();

  const [variant, setVariant] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [sizeOfShoe, setSizeOfShoe] = useState("");
  const [sizeStandard, setSizeStandard] = useState("US");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchVariant();
  }, [id, variantId]);

  const fetchVariant = async () => {
    const res = await handleProductDetails(id);
    const found = res.product.variants.find((v) => v._id === variantId);
    setVariant(found);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await handleAddVariantSize(id, variantId, {
        sizeOfShoe,
        sizeStandard,
        stock,
      });

      await fetchVariant();

      setSizeOfShoe("");
      setSizeStandard("US");
      setStock("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!variant) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Variant Details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-[#1A1A1A] font-sans antialiased p-4 sm:p-6 lg:p-12 pb-32">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* HEADER NAVIGATION */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/seller/product/${id}`)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition"
          >
            <ArrowLeft size={14} /> Back to Product
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Colorway:</span>
            <span className="bg-black text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-md">
              {variant.color || "Default"}
            </span>
          </div>
        </div>

        {/* WORKSPACE PROFILE TITLE */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-gray-400">Inventory Matrix</span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black mt-0.5">Edit Variant Allocations</h1>
            <p className="text-gray-400 text-xs mt-1">Scale custom regional sizes and independent stock vaults inside this cluster block.</p>
          </div>
          
          {variant.images && variant.images.length > 0 && (
            <div className="bg-[#F5F6F7] p-2 rounded-xl border border-gray-100 flex items-center justify-center">
              <img src={variant.images[0].url} className="w-16 h-16 object-contain mix-blend-darken" alt="" />
            </div>
          )}
        </div>

        {/* CONTROLS LAYOUT SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTAINER: EXISTING SIZE SPECIFICATIONS BOX */}
          <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <Layers size={16} className="text-gray-400" />
              <h2 className="text-sm font-extrabold tracking-tight text-black uppercase">Active Stock Breakdown</h2>
            </div>

            {!variant.size || variant.size.length === 0 ? (
              <p className="text-center py-12 text-xs font-medium text-gray-400">No sizing scales populated yet.</p>
            ) : (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {variant.size.map((s, i) => {
                  const isLowStock = (s.stock || 0) <= 5;
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-[#F5F6F7] px-4 py-3.5 rounded-xl border border-transparent hover:border-gray-200 transition"
                    >
                      <span className="text-xs font-bold text-black uppercase tracking-wider">
                        {s.sizeStandard} {s.sizeOfShoe}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold ${
                          isLowStock ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {isLowStock ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                        {s.stock} Units
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT CONTAINER: DYNAMIC ADD SIZE GENERATOR FORM */}
          <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <Plus size={16} className="text-gray-400" />
              <h2 className="text-sm font-extrabold tracking-tight text-black uppercase">Insert Sizing Node</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* SIZE VALUE INPUT */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Size Unit</label>
                <div className="relative flex items-center">
                  <Ruler size={16} className="absolute left-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.5"
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl pl-12 pr-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                    placeholder="e.g., 10.5"
                    value={sizeOfShoe}
                    onChange={(e) => setSizeOfShoe(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* REGION DIALECT */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Scale Context</label>
                <select
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-bold rounded-xl px-4 py-3.5 transition outline-none text-black cursor-pointer appearance-none"
                  value={sizeStandard}
                  onChange={(e) => setSizeStandard(e.target.value)}
                >
                  <option value="US">US Metric Standard</option>
                  <option value="UK">UK Metric Standard</option>
                  <option value="EU">EU Metric Standard</option>
                </select>
              </div>

              {/* VAULT STOCK QUANTITY */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Batch Unit Volume</label>
                <div className="relative flex items-center">
                  <Package size={16} className="absolute left-4 text-gray-400" />
                  <input
                    type="number"
                    className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-semibold rounded-xl pl-12 pr-4 py-3.5 transition outline-none text-black placeholder-gray-400"
                    placeholder="e.g., 25"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* FORM EMISSION RESOLVER BUTTON */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] disabled:opacity-50 shadow-md shadow-black/5"
              >
                <span>{isSubmitting ? "Updating Registry..." : "Commit Sizing Scale"}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditVariant;