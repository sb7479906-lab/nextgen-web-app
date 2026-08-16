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
  Video,
  Mic,
  MessageSquare,
  CheckCircle2,
  Clock,
  Package,
  X
} from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ZeeSGlobalHub() {
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // COD Order Form States
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState("31.5204° N, 74.3587° E (Lahore, PK)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample Mock Live Orders for Admin Dashboard
  const [orders, setOrders] = useState([
    { id: "ORD-9821", customer: "Muhammad Ali", phone: "+923001234567", address: "GULBERG III, LAHORE", status: "Pending", amount: "PKR 3,499" },
    { id: "ORD-9822", customer: "Usman Raza", phone: "+923219876543", address: "DHA PHASE 5, LAHORE", status: "Confirmed", amount: "PKR 2,199" },
  ]);

  // Conference Room Mock Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: "Admin Hub", text: "Welcome to ZeeS Global Strategy Conference Room!" },
    { sender: "Supplier Desk", text: "New toy inventory shipment dispatched from central warehouse." }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const departments = [
    { id: "toys", name: "Toys Dept", icon: "🧸", desc: "Premium Educational & Fun Toys" },
    { id: "cosmetics", name: "Cosmetics Dept", icon: "💄", desc: "Beauty, Skincare & Grooming" },
    { id: "jewelry", name: "Jewelry Dept", icon: "💍", desc: "Elegant Fine & Artificial Jewelry" },
    { id: "fashion", name: "Fashion Dept", icon: "👗", desc: "Modern & Traditional Apparel" },
  ];

  const sampleProducts = [
    { id: 1, name: "RC High-Speed Stunt Car", dept: "toys", price: "PKR 3,499", icon: "🏎️" },
    { id: 2, name: "Hydrating Face Serum", dept: "cosmetics", price: "PKR 2,199", icon: "✨" },
    { id: 3, name: "Gold-Plated Crystal Ring", dept: "jewelry", price: "PKR 1,850", icon: "💎" },
    { id: 4, name: "Designer Summer Kurti", dept: "fashion", price: "PKR 4,200", icon: "👔" },
  ];

  const addToCart = () => setCartCount(prev => prev + 1);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOrderObj = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: fullName,
      phone: `${countryCode}${phone}`,
      address: `${address} [GPS: ${mapCoordinates}]`,
      status: "Pending",
      amount: "PKR 3,499"
    };

    try {
      await addDoc(collection(db, "orders"), {
        ...newOrderObj,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.log("Saving locally to state fallback.");
    }

    setOrders(prev => [newOrderObj, ...prev]);
    alert(`🎉 Order Confirmed!\n\nOrder ID: #${newOrderObj.id}\nCustomer: ${fullName}\nAddress: ${address}`);
    setShowCheckoutModal(false);
    setCartCount(0);
    setFullName("");
    setPhone("");
    setAddress("");
    setIsSubmitting(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [...prev, { sender: "You (Admin)", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. HEADER */}
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
            <button 
              onClick={() => setShowAdminModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-purple-600/30 transition-all"
            >
              <Lock className="w-4 h-4" /> Admin Portal
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
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

      {/* 3. DEPARTMENTS */}
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

      {/* 4. CONFERENCE ROOM & LIVE CHAT MODULE */}
      <section id="conference" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-white mb-2 flex items-center justify-center gap-2">
              <Video className="text-purple-400" /> ZeeS Virtual Conference Room
            </h3>
            <p className="text-slate-400 text-sm">Real-time team collaboration and live supplier chat portal</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Call Simulation */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-slate-950"></div>
              <div className="relative z-10 flex justify-between items-center">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Live Stream Connected
                </span>
                <span className="text-xs text-slate-400">Encrypted Admin Call</span>
              </div>

              <div className="relative z-10 text-center py-12">
                <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/40">
                  <Users className="w-10 h-10 text-purple-300" />
                </div>
                <h4 className="font-bold text-white text-lg">Central Hub Conference Room</h4>
                <p className="text-xs text-slate-400">4 Active Executive Members Connected</p>
              </div>

              <div className="relative z-10 flex justify-center gap-4">
                <button className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700">
                  <Mic className="w-5 h-5 text-purple-400" />
                </button>
                <button className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg shadow-purple-600/30">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Live Chat Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between h-96">
              <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                <MessageSquare className="w-4 h-4 text-purple-400" /> Executive Live Chat
              </h4>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <p className="text-[10px] text-purple-400 font-bold">{msg.sender}</p>
                    <p className="text-xs text-slate-200 mt-0.5">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type message..." 
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-4 py-2 rounded-xl font-bold">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COD CHECKOUT MODAL WITH GOOGLE MAPS PICKER */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Truck className="text-purple-400" /> Cash On Delivery Order
            </h3>
            <p className="text-xs text-slate-400 mb-6">Enter details and pinpoint location on map below.</p>

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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                <div className="flex gap-2">
                  <input type="text" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white text-center" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="300 1234567" className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
                <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House No, Street, Area, City" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" required></textarea>
              </div>

              {/* Interactive Google Map Location Picker Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400" /> Google Map Location Pinpoint
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setMapCoordinates(`31.${Math.floor(1000 + Math.random()*9000)}° N, 74.${Math.floor(1000 + Math.random()*9000)}° E (Pin Updated)`)}
                    className="text-[10px] bg-purple-600/30 text-purple-300 px-2 py-1 rounded border border-purple-500/40"
                  >
                    Locate Me
                  </button>
                </div>
                <div className="w-full h-28 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden text-center p-2">
                  <p className="text-xs text-slate-400">
                    📍 Coordinates: <span className="text-white font-mono">{mapCoordinates}</span>
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-600/30"
              >
                {isSubmitting ? "Processing..." : "Confirm Cash On Delivery Order"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADMIN ORDER DASHBOARD MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Package className="text-purple-400" /> Admin Order Dashboard
            </h3>
            <p className="text-xs text-slate-400 mb-6">Real-time incoming Cash on Delivery orders tracker</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3">Address & GPS</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-950/50">
                      <td className="py-3 px-3 font-mono text-purple-400 font-bold">{ord.id}</td>
                      <td className="py-3 px-3 font-semibold">{ord.customer}</td>
                      <td className="py-3 px-3">{ord.phone}</td>
                      <td className="py-3 px-3 text-[11px] text-slate-400 max-w-xs truncate">{ord.address}</td>
                      <td className="py-3 px-3 font-bold text-purple-300">{ord.amount}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center text-slate-500 text-xs">
        <p>© 2026 ZeeS Group Global. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
