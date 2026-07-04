import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";

const SellerProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails, handleAddVariants } = useProduct();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // form state
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

    const formData = new FormData();
    formData.append("size", size);
    formData.append("sizeStandard", sizeStandard);
    formData.append("stock", stock);
    formData.append("color", color);

    for (let img of images) {
      formData.append("images", img);
    }

    await handleAddVariants(id, formData);

    fetchProduct();

    setSize("");
    setSizeStandard("US");
    setColor("");
    setStock("");
    setImages([]);
  };

  // helper (IMPORTANT)
  const getSize = (v) => {
    if (!v?.size) return {};
    return Array.isArray(v.size) ? v.size[0] : v.size;
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

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img) => (
              <img
                key={img._id}
                src={img.url}
                className="w-44 h-44 object-cover rounded-lg border border-gray-700"
                alt=""
              />
            ))}
          </div>

          <p className="mt-4 text-green-400 text-xl font-semibold">
            {product.price.currency} {product.price.amount}
          </p>

          <p className="text-gray-300 mt-2">{product.description}</p>
        </div>

        {/* VARIANTS */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Variants</h2>

          {product.variants?.length === 0 ? (
            <p className="text-gray-500">No variants yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.variants.map((v) => {
                const s = getSize(v);

                return (
                  <div
                    onClick={() =>
                      navigate(`/seller/product/${id}/variant/${v._id}`)
                    }
                    key={v._id}
                    className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
                  >
                    {/* images */}
                    <div className="flex gap-1 overflow-x-auto p-2 bg-gray-900">
                      {v.images?.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          className="w-16 h-16 object-cover rounded"
                          alt=""
                        />
                      ))}
                    </div>

                    {/* info */}
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size</span>
                        <span className="font-semibold">
                          {s.sizeStandard} {s.sizeOfShoe}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-400">Color</span>
                        <span className="font-semibold">{v.color}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-400">Stock</span>
                        <span
                          className={`font-semibold ${
                            s.stock > 5 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {s.stock}
                        </span>
                      </div>

                      <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-indigo-500 rounded-full"
                          style={{
                            width: `${Math.min(s.stock * 10, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ADD VARIANT */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Add Variant</h2>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              type="number"
              className="bg-gray-800 p-3 rounded-lg"
              placeholder="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />

            <select
              className="bg-gray-800 p-3 rounded-lg"
              value={sizeStandard}
              onChange={(e) => setSizeStandard(e.target.value)}
            >
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="EU">EU</option>
            </select>

            <input
              className="bg-gray-800 p-3 rounded-lg"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <input
              type="number"
              className="bg-gray-800 p-3 rounded-lg"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <input
              type="file"
              multiple
              className="text-gray-300"
              onChange={(e) => setImages([...e.target.files])}
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg">
              Add Variant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerProductDetails;
