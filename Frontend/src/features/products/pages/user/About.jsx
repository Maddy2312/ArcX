import React from "react";
import { ShieldCheck, Zap, Layers, Truck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[Inter,sans-serif]">
      {/* ══════════════════════════════════════════
          HERO SECTION 
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mt-6 mb-8">
            Engineered for <br />
            <span className="text-zinc-400 dark:text-zinc-600">Moving Forward.</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            ArcX was founded on a singular principle: performance shouldn't compromise aesthetic. 
            We bridge the gap between elite athletic technology and street-ready design, 
            creating footwear for those who treat every day as a marathon.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION / TECH SECTION 
      ══════════════════════════════════════════ */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Built Different</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              Every ArcX product is the result of thousands of hours of testing. From our 
              signature Arc Foam to our precision-engineered mesh, we ensure that every 
              component serves a purpose. We don't just follow trends; we set the pace.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Zap size={20} />, title: "Arc Foam" },
                { icon: <Layers size={20} />, title: "Flex Motion" },
                { icon: <ShieldCheck size={20} />, title: "Grip Control" },
                { icon: <Truck size={20} />, title: "Breath Tech" },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-zinc-400">{feat.icon}</div>
                  <span className="text-sm font-bold uppercase">{feat.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-square md:aspect-video bg-zinc-200 dark:bg-zinc-800">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" 
              alt="Design Philosophy" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS / PROOF 
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Satisfied Customers", value: "12K+" },
            { label: "Rating", value: "4.9 ★" },
            { label: "Collections", value: "SS '26" },
            { label: "Year Est.", value: "2026" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-black mb-2">{stat.value}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA 
      ══════════════════════════════════════════ */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-zinc-900 dark:bg-zinc-100 rounded-3xl p-16 text-center text-white dark:text-zinc-900">
          <h2 className="text-4xl font-black uppercase mb-6">Join the Movement</h2>
          <p className="mb-10 opacity-70 max-w-md mx-auto">
            Early drops, exclusive colorways, and member-only pricing. Become part of the ArcX legacy.
          </p>
          <button className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
            Create Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;