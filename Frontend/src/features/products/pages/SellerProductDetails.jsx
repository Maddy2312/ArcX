import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../hooks/useProduct";

const SellerProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails, handleAddVariants } = useProduct();

  const [product, setProduct] = useState(null);

  // form state
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  // fetch product
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await handleProductDetails(id);
    setProduct(res.product);
  };

  // add variant
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", size);
    formData.append("color", color);
    formData.append("stock", stock);

    for (let img of images) {
      formData.append("images", img);
    }

    await handleAddVariants(id, formData);

    fetchProduct(); // refresh

    setSize("");
    setColor("");
    setStock("");
    setImages([]);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* PRODUCT CARD */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-400">{product.brand}</p>

          {/* Images */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img) => (
              <img
                key={img._id}
                src={img.url}
                className="w-44 h-44 object-cover rounded-lg border border-gray-700"
              />
            ))}
          </div>

          <p className="mt-4 text-green-400 text-xl font-semibold">
            {product.price.currency} {product.price.amount}
          </p>

          <p className="text-gray-300 mt-2">{product.description}</p>
        </div>

        {/* VARIANTS SECTION */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Variants</h2>

          {product.variants?.length === 0 ? (
            <p className="text-gray-500">No variants yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.variants.map((v) => (
                <div
                  key={v._id}
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500 transition"
                >
                  {/* Variant Images */}
                  <div className="flex gap-1 overflow-x-auto p-2 bg-gray-900">
                    {v.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Size</span>
                      <span className="font-semibold">{v.size}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Color</span>
                      <span className="font-semibold">{v.color}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Stock</span>
                      <span
                        className={`font-semibold ${
                          v.stock > 5 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {v.stock}
                      </span>
                    </div>

                    {/* Stock bar */}
                    <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
                      <div
                        className="h-2 bg-indigo-500 rounded-full"
                        style={{
                          width: `${Math.min(v.stock * 10, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD VARIANT FORM */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Add Variant</h2>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              className="bg-gray-800 p-3 rounded-lg outline-none"
              placeholder="Size (e.g. US 10)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />

            <input
              className="bg-gray-800 p-3 rounded-lg outline-none"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <input
              className="bg-gray-800 p-3 rounded-lg outline-none"
              placeholder="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <input
              type="file"
              multiple
              className="text-gray-300"
              onChange={(e) => setImages([...e.target.files])}
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold">
              Add Variant
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SellerProductDetails;