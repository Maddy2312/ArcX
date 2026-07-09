import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate, Link } from "react-router";
import { ArrowRight, User, Mail, Lock, Phone, Shield, Eye, EyeOff, Check } from "lucide-react";

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
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleRegister(formData);
      if (response?.success) navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "Early access to limited drops",
    "Exclusive member pricing",
    "Personalized size recommendations",
    "Priority customer support",
  ];

  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* LEFT — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black dark:bg-white overflow-hidden items-center justify-center">
        {/* Large background text */}
        <div className="absolute inset-0 flex items-end justify-start pointer-events-none overflow-hidden select-none p-4">
          <span className="text-[25vw] font-black uppercase tracking-[-0.05em] text-white/[0.03] dark:text-black/[0.03] leading-none">
            CLUB
          </span>
        </div>

        {/* Horizontal lines decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 h-px bg-white dark:bg-black" style={{ top: `${(i + 1) * 8.33}%` }} />
          ))}
        </div>

        <div className="relative z-10 p-12 max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 bg-white dark:bg-black rounded-xl flex items-center justify-center">
              <span className="text-black dark:text-white text-xs font-black">AX</span>
            </div>
            <span className="text-white dark:text-black text-xl font-black uppercase tracking-tight">ArcX</span>
          </div>

          <span className="inline-block border border-white/20 dark:border-black/20 text-white dark:text-black text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6">
            ArcX Club
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tight leading-none text-white dark:text-black mb-4">
            The Movement<br />Starts Here.
          </h2>
          <p className="text-white/40 dark:text-black/40 text-sm leading-relaxed font-medium mb-10">
            Join thousands of sneaker enthusiasts. Get exclusive access, early drops, and a personalized arc journey.
          </p>

          {/* Perks list */}
          <div className="space-y-3 mb-10">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-white/20 dark:border-black/20 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-white dark:text-black" />
                </div>
                <span className="text-white/60 dark:text-black/60 text-sm font-medium">{perk}</span>
              </div>
            ))}
          </div>

          {/* Sneaker */}
          <div className="relative mt-4">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
              alt="ArcX Sneaker"
              className="w-full max-w-[300px] object-contain drop-shadow-[0_25px_50px_rgba(255,255,255,0.1)] transform rotate-6 hover:rotate-0 transition-transform duration-700 ease-out mx-auto"
            />
          </div>
        </div>
      </div>

      {/* RIGHT — Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-black overflow-y-auto">
        <div className="w-full max-w-md space-y-7 py-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black text-[10px] font-black">AX</span>
            </div>
            <span className="text-xl font-black uppercase tracking-tight">ArcX</span>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight">Get Started</h1>
            <p className="text-sm text-black/40 dark:text-white/40 mt-2 font-medium">
              Already a member?{" "}
              <Link to="/login" className="text-black dark:text-white font-black hover:opacity-70 transition-opacity underline underline-offset-2">
                Sign in →
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Alex Mercer"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                <input
                  id="register-password"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl pl-11 pr-12 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Contact Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                <input
                  id="register-contact"
                  type="text"
                  name="contact"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                />
              </div>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "buyer", label: "Buyer", desc: "Shop & discover" },
                  { value: "seller", label: "Seller", desc: "List & distribute" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, role: option.value }))}
                    className={`relative py-4 px-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      formData.role === option.value
                        ? "bg-black dark:bg-white border-black dark:border-white"
                        : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                    }`}
                  >
                    {formData.role === option.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-white dark:bg-black rounded-full flex items-center justify-center">
                        <Check size={10} className="text-black dark:text-white" />
                      </div>
                    )}
                    <Shield size={14} className={`mb-1 ${formData.role === option.value ? "text-white dark:text-black" : "text-black/30 dark:text-white/30"}`} />
                    <p className={`text-xs font-black uppercase tracking-wide ${formData.role === option.value ? "text-white dark:text-black" : "text-black dark:text-white"}`}>
                      {option.label}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${formData.role === option.value ? "text-white/60 dark:text-black/60" : "text-black/30 dark:text-white/30"}`}>
                      {option.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-0.5 rounded border-black/20 dark:border-white/20 text-black focus:ring-black accent-black cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs font-medium text-black/40 dark:text-white/40 select-none leading-relaxed cursor-pointer">
                I agree to ArcX's{" "}
                <span className="text-black dark:text-white font-bold underline underline-offset-1 cursor-pointer">Terms of Service</span>{" "}
                and{" "}
                <span className="text-black dark:text-white font-bold underline underline-offset-1 cursor-pointer">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-black/10 dark:shadow-white/10 text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-black/20 dark:text-white/20 font-medium">
            © 2026 ArcX. Engineered for those who move forward.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;