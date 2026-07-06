import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router";
import { ArrowRight, User, Mail, Lock, Phone, Shield } from "lucide-react";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
    contact: "",
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
      const response = await handleRegister(formData);
      if (response?.success) {
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
      
      {/* LEFT COLUMN: BRAND SPLASH ART (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#EAECEE] items-center justify-center p-12 overflow-hidden">
        {/* Large abstract background text mask */}
        <div className="absolute inset-0 select-none flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[16vw] font-black tracking-tighter text-black">CLUB</h1>
        </div>

        <div className="absolute -top-10 -right-10 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-md text-left space-y-6">
          <span className="inline-block bg-black text-white text-[10px] tracking-widest font-bold uppercase px-3 py-1 rounded-md">
            Create Account
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-black">
            The Movement <br />Starts Here.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            Join our collective. Get instant verification tracking, early access to premium shoe collections, and custom portal filters.
          </p>
          
          <div className="pt-4 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
              alt="Premium Running Sneaker"
              className="w-full max-w-[350px] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.12)] transform rotate-6 hover:rotate-0 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: REGISTRATION FLOW CONSOLE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          
          {/* Form Header */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-black">Get Started</h1>
            <p className="text-sm text-gray-400 mt-2">
              Already a member?{" "}
              <span onClick={() => navigate("/login")} className="text-black font-bold underline cursor-pointer hover:text-gray-600">
                Sign in
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* FULL NAME */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">Full Name</label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  placeholder="Alex Mercer"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl pl-12 pr-4 py-3.5 transition-all outline-none text-black placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">Email Address</label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl pl-12 pr-4 py-3.5 transition-all outline-none text-black placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">Password</label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl pl-12 pr-4 py-3.5 transition-all outline-none text-black placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* CONTACT */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">Contact Number</label>
              <div className="relative flex items-center">
                <Phone size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="contact"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-medium rounded-xl pl-12 pr-4 py-3.5 transition-all outline-none text-black placeholder-gray-400"
                />
              </div>
            </div>

            {/* ROLE DISCIPLINE SELECTOR */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">Account Profile Type</label>
              <div className="relative flex items-center">
                <Shield size={18} className="absolute left-4 text-gray-400 pointer-events-none" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#F5F6F7] border border-transparent focus:border-black focus:bg-white text-sm font-bold rounded-xl pl-12 pr-4 py-3.5 transition-all outline-none text-black cursor-pointer appearance-none"
                >
                  <option value="buyer">Buyer (Discover & Purchase Pairs)</option>
                  <option value="seller">Seller (Distribute Inventory)</option>
                </select>
                <div className="absolute right-4 pointer-events-none text-gray-400 text-xs font-bold">▼</div>
              </div>
            </div>

            {/* DISCLOSURE CHECKBOX */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-xs font-medium text-gray-400 select-none leading-relaxed">
                I authorize registration conditions and accept the platform <span className="text-black font-bold underline cursor-pointer">Terms of Service</span>.
              </label>
            </div>

            {/* ACTION TRIGGER */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-black text-white font-medium py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-800 transition active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-black/5"
            >
              <span>{loading ? "Creating Identity..." : "Complete Registration"}</span>
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default Register;