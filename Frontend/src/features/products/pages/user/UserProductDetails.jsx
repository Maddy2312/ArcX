import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import useCart from "../../../cart/hooks/useCart.js";
import { ShoppingCart, Heart, Truck, ShieldCheck } from "lucide-react";

const UserProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails } = useProduct();
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      const res = await handleProductDetails(id);

      if (res?.product) {
        setProduct(res.product);

        setSelectedImage(
          res.product.variants[0]?.images[0]?.url ||
            res.product.images[0]?.url
        );

        setSelectedSize(res.product.variants[0]?.size[0]);
      }
    }

    getProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const variant = product.variants[selectedVariant];

  // ✅ ADD TO CART FUNCTION
 const addToCart = async () => {
  try {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    setLoading(true);

    const result = await handleAddToCart(
      product._id,
      variant._id
    );
    if(result){
      navigate('/cart');
    }

  } catch (error) {
    alert(error?.response?.data?.message || "Failed to add to cart");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* IMAGES */}
          <div>
            <div className="border rounded-2xl overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[550px] object-cover"
              />
            </div>

            <div className="flex gap-4 mt-5">
              {variant.images.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  onClick={() => setSelectedImage(image.url)}
                  className={`w-24 h-24 rounded-xl border-2 cursor-pointer object-cover ${
                    selectedImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <p className="text-gray-500 uppercase text-sm">
              {product.brand}
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {product.category}
            </p>

            <h2 className="text-4xl font-bold mt-6">
              {product.price.currency} {product.price.amount}
            </h2>

            <p className="text-gray-600 mt-6 leading-7">
              {product.description}
            </p>

            {/* COLORS */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Select Color
              </h3>

              <div className="flex gap-3">
                {product.variants.map((v, index) => (
                  <button
                    key={v._id}
                    onClick={() => {
                      setSelectedVariant(index);
                      setSelectedImage(v.images[0].url);
                      setSelectedSize(v.size[0]);
                    }}
                    className={`px-5 py-2 rounded-full border transition ${
                      selectedVariant === index
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {variant.size.map((size) => (
                  <button
                    key={size._id}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border font-semibold ${
                      selectedSize?._id === size._id
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {size.sizeStandard} {size.sizeOfShoe}
                  </button>
                ))}
              </div>
            </div>

            {/* STOCK */}
            <div className="mt-6">
              <span
                className={`font-semibold ${
                  selectedSize?.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedSize?.stock} in Stock
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-10">

              <button
                onClick={addToCart}
                disabled={loading}
                className="flex-1 bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
              >
                <ShoppingCart size={20} />
                {loading ? "Adding..." : "Add to Cart"}
              </button>

              <button className="px-5 border rounded-xl hover:bg-gray-100">
                <Heart />
              </button>
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700">
              Buy Now
            </button>

            {/* FEATURES */}
            <div className="mt-10 space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Truck />
                Free Shipping
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck />
                Secure Checkout
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProductDetails;