import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router";
import { ArrowRight, Lock, Mail } from "lucide-react";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await handleLogin(formData);
      console.log(result);
      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-[#1A1A1A] font-sans antialiased">
      
      {/* LEFT COLUMN: THEMATIC BRAND VISUAL (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#EAECEE] items-center justify-center p-12 overflow-hidden">
        {/* Large back-text element mimicking the Flare design motif */}
        <div className="absolute inset-0 select-none flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[18vw] font-black tracking-tighter text-black">JOIN</h1>
        </div>

        {/* Diagonal colored accent block */}
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-md text-left space-y-6">
          <span className="inline-block bg-black text-white text-[10px] tracking-widest font-bold uppercase px-3 py-1 rounded-md">
            Aero Step Club
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-black">
            Unlock <br />Your Motion.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            Sign in to access your customized dashboard, tracked orders, and priority release drops.
          </p>
          
          {/* Main Visual Sneaker Graphic */}
          <div className="pt-4 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
              alt="Premium Sneaker Drop"
              className="w-full max-w-[340px] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.12)] transform -rotate-6 hover:rotate-0 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: REFINED CONFIGURATOR LOGIN INTERFACE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Layout */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-black">Welcome Back</h1>
            <p className="text-sm text-gray-400 mt-2">
              Don't have an account?{" "}
              <span className="text-black font-bold underline cursor-pointer hover:text-gray-600">
                Register free
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL CONTAINER */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl pl-12 pr-4 py-4 transition-all outline-none text-black placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* PASSWORD CONTAINER */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Password
                </label>
                <span className="text-xs font-semibold text-gray-400 underline cursor-pointer hover:text-black">
                  Forgot?
                </span>
              </div>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl pl-12 pr-4 py-4 transition-all outline-none text-black placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* KEEP LOGGED IN CHECKBOX */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs font-bold text-gray-500 cursor-pointer select-none">
                Keep me signed in on this device
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-black text-white font-medium py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-black/5"
            >
              <span>{loading ? "Verifying..." : "Sign In to Account"}</span>
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;