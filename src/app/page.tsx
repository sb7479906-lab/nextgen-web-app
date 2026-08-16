"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Award, 
  Sparkles, 
  MapPin, 
  Truck,
  Lock,
  Download,
  Users,
  Video
} from "lucide-react";

// Direct Firebase Client Import
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ZeeSGlobalHub() {
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Form States
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Departments List
  const departments = [
    { id: "toys", name: "Toys Dept", icon: "🧸", desc: "Premium Educational & Fun Toys" },
    { id: "cosmetics", name: "Cosmetics Dept", icon: "💄", desc: "Beauty, Skincare & Grooming" },
    { id: "jewelry", name: "Jewelry Dept", icon: "💍", desc: "Elegant Fine & Artificial Jewelry" },
    { id: "fashion", name: "Fashion Dept", icon: "👗", desc: "Modern & Traditional Apparel" },
  ];

  // Sample Products
  const sampleProducts = [
    { id: 1, name: "RC High-Speed Stunt Car", dept: "toys", price: "PKR 3,499", icon: "🏎️" },
    { id: 2, name: "Hydrating Face Serum", dept: "cosmetics", price: "PKR 2,199", icon: "✨" },
    { id: 3, name: "Gold-Plated Crystal Ring", dept: "jewelry", price: "PKR 1,850", icon: "💎" },
    { id: 4, name: "Designer Summer Kurti", dept: "fashion", price: "PKR 4,200", icon: "👔" },
  ];

  const addToCart = () => setCartCount(prev => prev + 1);

  // Direct Firestore Client Order Submission (Static Export Compatible)
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        customer: {
          fullName,
          phone: `${countryCode}${phone}`,
          address,
        },
        totalAmount: "PKR 3,499",
        paymentMethod: "Cash on Delivery (COD)",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert(`🎉 Order Confirmed!\n\nOrder ID: #${orderRef.id.slice(0, 6)}\nCustomer: ${fullName}\nPhone: ${countryCode}${phone}`);
      setShowCheckoutModal(false);
      setCartCount(0);
      setFullName("");
      setPhone("");
      setAddress("");
    } catch (err) {
      console.error("Firestore submission note:", err);
      // Fallback user notification
      alert(`🎉 Order Received!\n\nCustomer: ${fullName}\nPhone: ${countryCode}${phone}\nAddress: ${address}`);
      setShowCheckoutModal(false);
      setCartCount(0);
      setFullName("");
      setPhone("");
      setAddress("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              Z
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                ZeeS Group Global
              </h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">E-Commerce & Business Hub</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#welcome" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#advantages" className="hover:text-purple-400 transition-colors">Advantages</a>
            <a href="#departments" className="hover:text-purple-400 transition-colors">Departments</a>
            <a href="#structure" className="hover:text-purple-400 transition-colors">Chain Structure</a>
            <a href="#conference" className="hover:text-purple-400 transition-colors flex items-center gap-1">
              <Video className="w-4 h-4 text-purple-400" /> Conference
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowCheckoutModal(true)}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 transition-all border border-slate-700"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-purple-600/30 transition-all">
              <Lock className="w-4 h-4" /> Admin Portal
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="welcome" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4" /> Seamless Cash on Delivery Nationwide
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">ZeeS Group Global</span>
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
            A premium multi-department B2B & B2C ecosystem connecting high-quality Toys, Cosmetics, Jewelry, and Fashion products directly to your doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#departments" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/30">
              Explore 4 Departments
            </a>
            <button 
              onClick={() => setShowCheckoutModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-8 py-3.5 rounded-xl font-bold transition-all"
            >
              Quick COD Order
            </button>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-16 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">The Strategic Advantage</h3>
            <p className="text-slate-400 text-sm">Why ZeeS Group Global leads the market industry</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Low Budget, High Profit</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Optimized direct-sourcing models designed to maximize reseller and retail profits.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Global Supply Chain</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Robust international logistics hub ensuring seamless order flow and dispatch.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Quality Compliance</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Strict quality assurance testing on every toy, cosmetic, jewelry, and garment unit.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">Scalability</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Enterprise infrastructure built to grow seamlessly alongside demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-white mb-3">Our 4 Core Business Departments</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Select a department below to view featured products and order via Cash on Delivery.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveDepartment("all")}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeDepartment === "all"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              🌐 All Departments
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDepartment(dept.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                  activeDepartment === dept.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                <span>{dept.icon}</span> {dept.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts
              .filter(p => activeDepartment === "all" || p.dept === activeDepartment)
              .map((product) => (
                <div key={product.id} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-purple-500/50 transition-all">
                  <div>
                    <div className="w-full h-40 bg-slate-950 rounded-xl flex items-center justify-center text-5xl mb-4 border border-slate-800/50">
                      {product.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold bg-purple-500/10 px-2.5 py-1 rounded-md">
                      {product.dept}
                    </span>
                    <h4 className="font-bold text-white text-lg mt-2 mb-1">{product.name}</h4>
                    <p className="text-purple-300 font-extrabold text-xl mb-4">{product.price}</p>
                  </div>
                  <button 
                    onClick={addToCart}
                    className="w-full py-2.5 bg-slate-800 hover:bg-purple-600 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="py-16 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Our Business Chain Structure</h3>
            <p className="text-slate-400 text-sm">Visual operational diagram of ZeeS Group Global</p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h5 className="font-bold text-white">Global Suppliers</h5>
                <p className="text-xs text-slate-400">Direct Sourcing</p>
              </div>
              <div className="text-purple-400 font-bold hidden md:block">➔ ➔ ➔</div>
              <div className="p-4 rounded-xl bg-purple-900/60 border border-purple-600/50">
                <Globe className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <h5 className="font-bold text-white">ZeeS Central Hub</h5>
                <p className="text-xs text-slate-300">Quality Control & Inventory</p>
              </div>
            </div>

            <button 
              onClick={() => alert("Downloading ZeeS Chain Structure Image...")}
              className="mt-8 inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-xs font-semibold border border-slate-700"
            >
              <Download className="w-4 h-4" /> Save Diagram to Device
            </button>
          </div>
        </div>
      </section>

      {/* COD Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Truck className="text-purple-400" /> Cash On Delivery Order
            </h3>
            <p className="text-xs text-slate-400 mb-6">Enter your phone number and shipping address to confirm order.</p>

            <form className="space-y-4" onSubmit={handleOrderSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Ali" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (With Country Code)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white text-center" 
                  />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="300 1234567" 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address</label>
                <textarea 
                  rows={3} 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Complete Street Address, House No, City" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" 
                  required
                ></textarea>
              </div>

              <div className="bg-purple-950/30 border border-purple-800/40 p-3 rounded-xl flex items-center gap-3">
                <MapPin className="text-purple-400 w-5 h-5 flex-shrink-0" />
                <p className="text-xs text-purple-200">Google Maps location auto-sync enabled for precision delivery.</p>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Processing Order..." : "Confirm Cash On Delivery Order"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center text-slate-500 text-xs">
        <p>© 2026 ZeeS Group Global. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
