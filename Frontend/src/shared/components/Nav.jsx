import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { ShoppingBag, Sun, Moon, Menu, X, User, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { setUser } from "../../features/auth/state/auth.slice.js";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const { items = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();
  const handleLogout = () => { dispatch(setUser(null)); };
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/" },
    { label: "About", to: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── LOGO ── */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="ArcX Home"
        >
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
            <span className="text-white dark:text-black text-xs font-black tracking-tight">AX</span>
          </div>
          <span className="text-xl font-black tracking-tight text-black dark:text-white uppercase">
            Arc<span className="text-black dark:text-white opacity-50">X</span>
          </span>
        </Link>

        {/* ── CENTER LINKS (desktop) ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200 tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              className="text-sm font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200 tracking-wide uppercase"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* ── RIGHT ACTIONS ── */}
        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full flex items-center justify-center text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Cart */}
          <button
            id="nav-cart-btn"
            onClick={() => navigate("/cart")}
            aria-label="Shopping cart"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Section */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/10 rounded-full">
                <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <User size={12} className="text-white dark:text-black" />
                </div>
                <span className="text-xs font-bold text-black dark:text-white">{user.name?.split(" ")[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                id="nav-logout-btn"
                className="w-9 h-9 rounded-full flex items-center justify-center text-black/50 dark:text-white/50 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-semibold text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5"
              >
                Login
              </Link>
              <Link
                to="/register"
                id="nav-register-btn"
                className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200"
              >
                Join ArcX
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-black border-t border-black/5 dark:border-white/10 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border-b border-black/5 dark:border-white/5 tracking-wide uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border-b border-black/5 dark:border-white/5 tracking-wide uppercase"
            >
              Dashboard
            </Link>
          )}
          <div className="pt-2 flex gap-3">
            {user ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="flex-1 py-3 border border-black/20 dark:border-white/20 rounded-xl text-sm font-bold text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-3 text-center border border-black/20 dark:border-white/20 rounded-xl text-sm font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-3 text-center bg-black dark:bg-white rounded-xl text-sm font-bold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                >
                  Join ArcX
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;