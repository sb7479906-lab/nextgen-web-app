"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState("all");

  const departments = [
    { id: "toys", name: "Toys Dept", icon: "🧸" },
    { id: "cosmetics", name: "Cosmetics Dept", icon: "💄" },
    { id: "jewelry", name: "Jewelry Dept", icon: "💍" },
    { id: "fashion", name: "Fashion Dept", icon: "👗" },
  ];

  const sampleProducts = [
    { id: 1, name: "RC High-Speed Stunt Car", dept: "toys", price: "PKR 3,499", icon: "🏎️" },
    { id: 2, name: "Hydrating Face Serum", dept: "cosmetics", price: "PKR 2,199", icon: "✨" },
    { id: 3, name: "Gold-Plated Crystal Ring", dept: "jewelry", price: "PKR 1,850", icon: "💎" },
    { id: 4, name: "Designer Summer Kurti", dept: "fashion", price: "PKR 4,200", icon: "👔" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-purple-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-800">
          <ArrowLeft className="w-4 h-4" /> Back to Home Hub
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white">Our 4 Business Departments</h1>
            <p className="text-xs text-slate-400">Standalone Departments Page</p>
          </div>

          <div className="flex gap-2">
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
                <Link 
                  href="/checkout"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Buy via COD Page
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
