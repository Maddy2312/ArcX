import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../hooks/useProduct";

const EditVariant = () => {
  const { id, variantId } = useParams();
  const { handleProductDetails, handleAddVariantSize } = useProduct();

  const [variant, setVariant] = useState(null);

  // form state
  const [sizeOfShoe, setSizeOfShoe] = useState("");
  const [sizeStandard, setSizeStandard] = useState("US");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchVariant();
  }, [id, variantId]);

  const fetchVariant = async () => {
    const res = await handleProductDetails(id);

    const found = res.product.variants.find(
      (v) => v._id === variantId
    );

    setVariant(found);
  };

  // ✅ FIXED: NO FormData (IMPORTANT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleAddVariantSize(id, variantId, {
      sizeOfShoe,
      sizeStandard,
      stock,
    });

    await fetchVariant();

    setSizeOfShoe("");
    setSizeStandard("US");
    setStock("");
  };

  if (!variant) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h1 className="text-2xl font-bold">Edit Variant</h1>
          <p className="text-gray-400 mt-1">
            Add multiple sizes to this variant
          </p>
        </div>

        {/* EXISTING SIZES */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Sizes</h2>

          {variant.size?.length === 0 ? (
            <p className="text-gray-500">No sizes added</p>
          ) : (
            <div className="space-y-2">
              {variant.size.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-800 p-3 rounded-lg"
                >
                  <span>
                    {s.sizeStandard} {s.sizeOfShoe}
                  </span>

                  <span
                    className={`font-semibold ${
                      s.stock > 5
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {s.stock}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD NEW SIZE */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Add New Size</h2>

          <form onSubmit={handleSubmit} className="grid gap-3">

            <input
              type="number"
              className="bg-gray-800 p-3 rounded-lg outline-none"
              placeholder="Size (e.g. 10)"
              value={sizeOfShoe}
              onChange={(e) => setSizeOfShoe(e.target.value)}
            />

            <select
              className="bg-gray-800 p-3 rounded-lg outline-none"
              value={sizeStandard}
              onChange={(e) => setSizeStandard(e.target.value)}
            >
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="EU">EU</option>
            </select>

            <input
              type="number"
              className="bg-gray-800 p-3 rounded-lg outline-none"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <button className="bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold">
              Add Size
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default EditVariant;