import React, { useEffect } from 'react';
import useProduct from '../hooks/useProduct.js';
import { useSelector } from 'react-redux';

const SellerDashboard = () => {
  const { handleSellerProducts } = useProduct();
  const products = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleSellerProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

      {/* Empty state */}
      {(!products || products.length === 0) && (
        <div className="text-gray-400">No products found</div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="h-48 bg-gray-800 flex items-center justify-center">
              {product.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-400">{product.brand}</p>

              <div className="mt-2 flex justify-between text-sm text-gray-300">
                <span>{product.category}</span>
                <span className="text-green-400 font-semibold">
                  {product.price?.currency} {product.price?.amount}
                </span>
              </div>

              {/* Button placeholder */}
              <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
                Manage Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;