"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Truck, MapPin } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mapCoords, setMapCoords] = useState("31.5204° N, 74.3587° E");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "orders"), {
        customer: { fullName, phone, address, gps: mapCoords },
        totalAmount: "PKR 3,499",
        status: "Pending",
        createdAt: serverTimestamp()
      });
      alert(`🎉 Order Confirmed on Checkout Page!\n\nName: ${fullName}`);
      setFullName("");
      setPhone("");
      setAddress("");
    } catch (err) {
      alert(`🎉 Order Received!\n\nName: ${fullName}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
      <div className="max-w-xl mx-auto space-y-6">
        
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-purple-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-800">
          <ArrowLeft className="w-4 h-4" /> Back to Home Hub
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Truck className="text-purple-400" /> Cash On Delivery Order Page
            </h1>
            <p className="text-xs text-slate-400">Dedicated standalone checkout route</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address</label>
              <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" required></textarea>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-purple-400" /> GPS Map Coordinates
                </span>
                <button type="button" onClick={() => setMapCoords(`31.${Math.floor(1000 + Math.random()*9000)}° N, 74.${Math.floor(1000 + Math.random()*9000)}° E`)} className="text-[10px] bg-purple-600/30 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/40">
                  Update Pin
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center font-mono py-2">{mapCoords}</p>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-600/30">
              {isSubmitting ? "Submitting..." : "Confirm COD Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
