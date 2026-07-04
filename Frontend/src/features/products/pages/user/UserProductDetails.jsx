import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import { ShoppingCart, Heart, Truck, ShieldCheck } from "lucide-react";

const UserProductDetails = () => {
  const { id } = useParams();
  const { handleProductDetails } = useProduct();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Images */}
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
                  alt=""
                />
              ))}
            </div>

          </div>

          {/* Details */}
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

            {/* Colors */}

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

            {/* Sizes */}

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

            {/* Stock */}

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

            {/* Quantity */}

            <div className="flex items-center gap-4 mt-8">

              <button
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
                className="w-10 h-10 border rounded-lg"
              >
                -
              </button>

              <span className="text-xl">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-lg"
              >
                +
              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-10">

              <button className="flex-1 bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800">
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="px-5 border rounded-xl hover:bg-gray-100">
                <Heart />
              </button>

            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700">
              Buy Now
            </button>

            {/* Features */}

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