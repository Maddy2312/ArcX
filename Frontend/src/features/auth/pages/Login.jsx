import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate, Link } from "react-router";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await handleLogin(formData);
      if (result.success) navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* LEFT — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black dark:bg-white overflow-hidden items-center justify-center">
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span className="text-[20vw] font-black uppercase tracking-[-0.05em] text-white/[0.04] dark:text-black/[0.04] leading-none">
            AX
          </span>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-px bg-white dark:bg-black" style={{ left: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>

        <div className="relative z-10 p-12 max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 bg-white dark:bg-black rounded-xl flex items-center justify-center">
              <span className="text-black dark:text-white text-xs font-black">AX</span>
            </div>
            <span className="text-white dark:text-black text-xl font-black uppercase tracking-tight">ArcX</span>
          </div>

          <span className="inline-block border border-white/20 dark:border-black/20 text-white dark:text-black text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6">
            Member Access
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-white dark:text-black mb-6">
            Unlock<br />Your<br />Motion.
          </h2>
          <p className="text-white/40 dark:text-black/40 text-sm leading-relaxed font-medium mb-10">
            Access your personalized dashboard, track orders, and be first for exclusive drop releases.
          </p>

          {/* Sneaker image */}
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-white/5 dark:bg-black/5 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80"
              alt="ArcX Premium"
              className="relative w-full max-w-[320px] object-contain drop-shadow-[0_25px_50px_rgba(255,255,255,0.1)] transform -rotate-6 hover:rotate-0 transition-transform duration-700 ease-out mx-auto"
            />
          </div>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-black">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black text-[10px] font-black">AX</span>
            </div>
            <span className="text-xl font-black uppercase tracking-tight">ArcX</span>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">Welcome back</h1>
            <p className="text-sm text-black/40 dark:text-white/40 mt-2 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-black dark:text-white font-black hover:opacity-70 transition-opacity underline underline-offset-2">
                Create one →
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl pl-11 pr-4 py-4 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/30 dark:text-white/30">
                  Password
                </label>
                <button type="button" className="text-[10px] font-black text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-2 border-transparent focus:border-black dark:focus:border-white text-sm font-medium rounded-2xl pl-11 pr-12 py-4 transition-all outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
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

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-5">
                <input type="checkbox" id="remember" className="sr-only peer" />
                <label
                  htmlFor="remember"
                  className="w-10 h-5 bg-black/10 dark:bg-white/10 rounded-full cursor-pointer block peer-checked:bg-black dark:peer-checked:bg-white transition-colors"
                />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white dark:bg-black rounded-full pointer-events-none transition-transform peer-checked:translate-x-5" />
              </div>
              <label htmlFor="remember" className="text-xs font-bold text-black/40 dark:text-white/40 cursor-pointer select-none">
                Keep me signed in
              </label>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-black/10 dark:shadow-white/10 mt-2 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5 dark:border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-black px-4 text-[10px] font-black tracking-wider uppercase text-black/20 dark:text-white/20">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social login placeholders */}
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 py-3 border-2 border-black/10 dark:border-white/10 rounded-2xl text-sm font-bold text-black/60 dark:text-white/60 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white transition-all"
              >
                {provider === "Google" ? "🌐" : "🍎"} {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-[10px] text-black/20 dark:text-white/20 font-medium">
            By signing in, you agree to ArcX{" "}
            <span className="underline cursor-pointer hover:text-black dark:hover:text-white transition-colors">Terms</span>{" "}
            and{" "}
            <span className="underline cursor-pointer hover:text-black dark:hover:text-white transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;