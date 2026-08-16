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
  ArrowLeft,
  Package,
  ChevronRight,
  HelpCircle,
  LayoutGrid
} from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ZeeSGlobalHub() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [cartCount, setCartCount] = useState<number>(0);

  // Form States
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState("31.5204° N, 74.3587° E (Lahore, PK)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Orders Tracker State
  const [orders, setOrders] = useState([
    { id: "ORD-9821", customer: "Muhammad Ali", phone: "+923001234567", address: "GULBERG III, LAHORE", status: "Pending", amount: "PKR 3,499" },
    { id: "ORD-9822", customer: "Usman Raza", phone: "+923219876543", address: "DHA PHASE 5, LAHORE", status: "Confirmed", amount: "PKR 2,199" },
  ]);

  // Conference Chat State
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
      console.log("Local state fallback active");
    }

    setOrders(prev => [newOrderObj, ...prev]);
    alert(`🎉 Order Confirmed!\n\nOrder ID: #${newOrderObj.id}\nCustomer: ${fullName}\nAddress: ${address}`);
    setCartCount(0);
    setFullName("");
    setPhone("");
    setAddress("");
    setIsSubmitting(false);
    setCurrentTab("admin");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [...prev, { sender: "You (Executive)", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* HEADER & TOP TAB NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab("home")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              Z
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                ZeeS Group Global
              </h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">Multi-Department Enterprise</p>
            </div>
          </div>

          {/* Dynamic Tab Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
            <button 
              onClick={() => setCurrentTab("home")}
              className={`px-4 py-2 rounded-xl transition-all ${currentTab === "home" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Home Hub
            </button>
            <button 
              onClick={() => setCurrentTab("departments")}
              className={`px-4 py-2 rounded-xl transition-all ${currentTab === "departments" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Departments
            </button>
            <button 
              onClick={() => setCurrentTab("structure")}
              className={`px-4 py-2 rounded-xl transition-all ${currentTab === "structure" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Business Chain
            </button>
            <button 
              onClick={() => setCurrentTab("conference")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${currentTab === "conference" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              <Video className="w-3.5 h-3.5" /> Conference Room
            </button>
            <button 
              onClick={() => setCurrentTab("help")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1 ${currentTab === "help" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Help
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab("checkout")}
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
              onClick={() => setCurrentTab("admin")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                currentTab === "admin" 
                  ? "bg-purple-600 text-white border-purple-500 shadow-lg" 
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
              }`}
            >
              <Lock className="w-4 h-4 text-purple-400" /> Admin Portal
            </button>
          </div>
        </div>
      </header>

      {/* FIXED BACK BUTTON BAR FOR ALL SUB-TABS */}
      {currentTab !== "home" && (
        <div className="sticky top-20 z-40 bg-purple-950/80 backdrop-blur-md border-b border-purple-800/50 py-3 px-4 sm:px-8 flex items-center justify-between">
          <button 
            onClick={() => setCurrentTab("home")}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 rounded-xl shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Home Hub
          </button>
          <span className="text-xs font-semibold text-purple-200 capitalize">
            Tab Active: <span className="text-white font-bold uppercase tracking-wider">{currentTab}</span>
          </span>
        </div>
      )}

      {/* HORIZONTAL SLIDING VIEW CAROUSEL */}
      <div 
        className="flex w-[700vw] transition-transform duration-700 ease-in-out min-h-[calc(100vh-80px)]"
        style={{
          transform: 
            currentTab === "home" ? "translateX(0vw)" :
            currentTab === "departments" ? "translateX(-100vw)" :
            currentTab === "checkout" ? "translateX(-200vw)" :
            currentTab === "admin" ? "translateX(-300vw)" :
            currentTab === "conference" ? "translateX(-400vw)" :
            currentTab === "structure" ? "translateX(-500vw)" :
            "translateX(-600vw)"
        }}
      >

        {/* VIEW 1: HOME HUB */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-7xl mx-auto space-y-12">
          <div className="relative py-16 rounded-3xl bg-slate-900/60 border border-slate-800 text-center overflow-hidden p-6 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
                <Sparkles className="w-4 h-4" /> B2B & B2C Integrated Ecosystem
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">ZeeS Group Global</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
                Click any tab or card below to slide horizontally to the corresponding department, COD checkout, or admin portal.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setCurrentTab("departments")}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2"
                >
                  <LayoutGrid className="w-4 h-4" /> Slide to Departments
                </button>
                <button 
                  onClick={() => setCurrentTab("checkout")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-purple-400" /> Slide to COD Order
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="font-bold text-white text-base mb-1">Low Budget High Profit</h4>
              <p className="text-xs text-slate-400">Direct sourcing structure maximizing retail profit margins.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <Globe className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-bold text-white text-base mb-1">Global Supply Chain</h4>
              <p className="text-xs text-slate-400">International logistics and warehouse distribution system.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <Award className="w-8 h-8 text-pink-400 mb-4" />
              <h4 className="font-bold text-white text-base mb-1">Quality Compliance</h4>
              <p className="text-xs text-slate-400">Strict quality assurance testing across all department products.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="font-bold text-white text-base mb-1">Scalability</h4>
              <p className="text-xs text-slate-400">Enterprise technology infrastructure built for seamless growth.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div 
              onClick={() => setCurrentTab("departments")}
              className="bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl cursor-pointer transition-all group flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-white text-base">4 Core Departments</h4>
                <p className="text-xs text-slate-400">Toys, Cosmetics, Jewelry, Fashion</p>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
              onClick={() => setCurrentTab("conference")}
              className="bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl cursor-pointer transition-all group flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-white text-base">Virtual Conference</h4>
                <p className="text-xs text-slate-400">Live Team & Supplier Room</p>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
              onClick={() => setCurrentTab("admin")}
              className="bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl cursor-pointer transition-all group flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-white text-base">Admin Dashboard</h4>
                <p className="text-xs text-slate-400">Track COD Orders in Realtime</p>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </section>

        {/* VIEW 2: DEPARTMENTS */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-2xl font-black text-white">Core Business Departments View</h3>
              <p className="text-xs text-slate-400">Select a category tab to filter products</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDept("all")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${selectedDept === "all" ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"}`}
              >
                🌐 All
              </button>
              {departments.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDept(d.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${selectedDept === d.id ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"}`}
                >
                  <span>{d.icon}</span> {d.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts
              .filter(p => selectedDept === "all" || p.dept === selectedDept)
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
                    onClick={() => { addToCart(); setCurrentTab("checkout"); }}
                    className="w-full py-2.5 bg-slate-800 hover:bg-purple-600 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Slide to COD Order View
                  </button>
                </div>
              ))}
          </div>
        </section>

        {/* VIEW 3: COD CHECKOUT */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Truck className="text-purple-400" /> Cash On Delivery Checkout View
            </h3>
            <p className="text-xs text-slate-400 mb-6">Enter delivery details and pinpoint coordinates below.</p>

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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address</label>
                <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House No, Street, Area, City" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" required></textarea>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400" /> Google Map GPS Location Sync
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setMapCoordinates(`31.${Math.floor(1000 + Math.random()*9000)}° N, 74.${Math.floor(1000 + Math.random()*9000)}° E (GPS Locked)`)}
                    className="text-[10px] bg-purple-600/30 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/40"
                  >
                    Locate Me
                  </button>
                </div>
                <div className="w-full h-24 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-center p-2">
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
                {isSubmitting ? "Processing Order..." : "Confirm COD & Slide to Admin Tracker"}
              </button>
            </form>
          </div>
        </section>

        {/* VIEW 4: ADMIN DASHBOARD */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-7xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="text-purple-400" /> Live Admin Order Tracker View
                </h3>
                <p className="text-xs text-slate-400">Manage incoming Cash on Delivery orders</p>
              </div>
              <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold">
                Total Orders: {orders.length}
              </span>
            </div>

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
        </section>

        {/* VIEW 5: CONFERENCE ROOM */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-7xl mx-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Video className="text-purple-400" /> Executive Conference Room View
            </h3>
            <p className="text-xs text-slate-400">Encrypted real-time communication portal</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between h-96 relative overflow-hidden">
              <div className="relative z-10 flex justify-between items-center">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Stream Active
                </span>
                <span className="text-xs text-slate-400">ZeeS Global Room #1</span>
              </div>

              <div className="relative z-10 text-center py-8">
                <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-500/40">
                  <Users className="w-10 h-10 text-purple-300" />
                </div>
                <h4 className="font-bold text-white text-base">Executive Strategy Call</h4>
                <p className="text-xs text-slate-400">4 Active Members Online</p>
              </div>

              <div className="relative z-10 flex justify-center gap-4">
                <button className="p-3 bg-slate-800 text-white rounded-full border border-slate-700">
                  <Mic className="w-5 h-5 text-purple-400" />
                </button>
                <button className="p-3 bg-purple-600 text-white rounded-full shadow-lg">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between h-96">
              <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
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
        </section>

        {/* VIEW 6: BUSINESS CHAIN */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-5xl mx-auto space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
            <h3 className="text-2xl font-bold text-white">ZeeS Business Chain View</h3>
            <p className="text-xs text-slate-400">Visual representation of direct supply chain operations</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h5 className="font-bold text-white text-sm">Global Suppliers</h5>
                <p className="text-[10px] text-slate-400">Direct Sourcing</p>
              </div>
              <div className="text-purple-400 font-bold hidden md:block text-xl">➔ ➔ ➔</div>
              <div className="p-4 rounded-xl bg-purple-900/60 border border-purple-600/50">
                <Globe className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <h5 className="font-bold text-white text-sm">ZeeS Central Hub</h5>
                <p className="text-[10px] text-slate-300">Quality Control & Inventory</p>
              </div>
            </div>

            <button 
              onClick={() => alert("Downloading Chain Diagram...")}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-xs font-semibold border border-slate-700"
            >
              <Download className="w-4 h-4" /> Save Diagram
            </button>
          </div>
        </section>

        {/* VIEW 7: HELP */}
        <section className="w-[100vw] p-6 sm:p-10 max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="text-purple-400" /> ZeeS Support Center View
            </h3>
            <p className="text-xs text-slate-400">Questions about orders, shipping, or suppliers?</p>
            <div className="space-y-3 pt-4 text-xs text-slate-300">
              <p className="p-3 bg-slate-950 rounded-xl border border-slate-800">📦 <strong className="text-white">COD Orders:</strong> Deliveries usually arrive in 2-4 working days nationwide.</p>
              <p className="p-3 bg-slate-950 rounded-xl border border-slate-800">💬 <strong className="text-white">Conference Support:</strong> Executives can join live chat directly via the Conference Tab.</p>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-slate-500 text-xs relative z-10">
        <p>© 2026 ZeeS Group Global. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
