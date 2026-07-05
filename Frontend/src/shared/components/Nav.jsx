import React from "react";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* LEFT - LOGO */}
      <div className="text-2xl font-bold">
        ArcX
      </div>

      {/* CENTER - LINKS */}
      <div className="hidden md:flex gap-6 text-gray-600">
        <a href="/" className="hover:text-black">
          Home
        </a>
        <a href="/products" className="hover:text-black">
          Products
        </a>
        <a href="/cart" className="hover:text-black">
          Cart
        </a>
      </div>

      {/* RIGHT - USER SECTION */}
      <div className="flex items-center gap-4">
        {/* CART ICON (placeholder) */}
        <a
          href="/cart"
          className="relative text-gray-700 hover:text-black"
        >
          🛒
        </a>

        {/* USER INFO */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-700">
              Welcome,{" "}
              <span className="font-semibold">
                {user.name}
              </span>
            </div>

            <button className="text-red-500 text-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <a
              href="/login"
              className="text-sm text-blue-600"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-sm text-gray-600"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;