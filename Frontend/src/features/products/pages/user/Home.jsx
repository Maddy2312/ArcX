import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleUserProducts } = useProduct();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    handleUserProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-4">
            Discover Your Perfect Pair
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl">
            Explore the latest running, casual, and lifestyle shoes from your
            favorite brands.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Latest Products
          </h2>

          <p className="text-gray-500">
            {products.length} Products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Products will appear here once available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Discount Badge */}
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    New
                  </span>

                  {/* Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <Heart size={18} />
                    </button>

                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {product.brand}
                    </span>

                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mt-3 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-2xl font-bold">
                        ${product.price.amount}
                      </p>

                      <span className="text-xs text-gray-500">
                        {product.price.currency}
                      </span>
                    </div>

                    <button onClick={() => navigate(`/product/${product._id}`)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;