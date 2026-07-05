import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { handleGetCart } = useCart();

  const {
    items = [],
    totalPrice,
    currency,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    handleGetCart();
  }, []);
  console.log(items);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        Loading cart...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* EMPTY CART */}
      {items.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Your cart is empty
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = item.product;
              const variant = product?.variants;

              return (
                <div
                  key={item._id}
                  className="flex gap-4 bg-white shadow-md p-4 rounded-lg"
                >
                  {/* IMAGE (FIXED HERE) */}
                  <img
                    src={
                      variant?.images?.[0]?.url ||
                      product?.images?.[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product?.name}
                    className="w-28 h-28 object-cover rounded"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{product?.name}</h2>

                    <p className="text-gray-500">{product?.brand}</p>

                    {/* COLOR */}
                    <p className="mt-1">
                      <span className="font-medium">Color:</span>{" "}
                      {variant?.color}
                    </p>

                    {/* SIZE */}
                    <p>
                      <span className="font-medium">Size:</span>{" "}
                      {variant?.size?.map((s) => (
                        <span key={s._id} className="mr-2">
                          {s.sizeOfShoe} {s.sizeStandard}
                        </span>
                      ))}
                    </p>

                    {/* QUANTITY */}
                    <p>
                      <span className="font-medium">Qty:</span> {item.quantity}
                    </p>

                    {/* PRICE */}
                    <p className="mt-1 font-semibold">
                      {item.price.amount} {item.price.currency}
                    </p>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {item.price.amount * item.quantity} {item.price.currency}
                    </p>

                    <button className="text-red-500 mt-2">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white shadow-md p-5 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Total Quantity</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                {totalPrice} {currency}
              </span>
            </div>

            <button className="w-full mt-5 bg-black text-white py-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
