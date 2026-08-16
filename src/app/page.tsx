"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Award, 
  Sparkles, 
  Truck,
  Lock,
  LayoutGrid,
  Video,
  ChevronRight
} from "lucide-react";

export default function HomeHub() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              Z
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                ZeeS Group Global
              </h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">Multi-Department Enterprise</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <Link href="/" className="text-purple-400">Home</Link>
            <Link href="/departments" className="hover:text-purple-400">Departments</Link>
            <Link href="/conference" className="hover:text-purple-400 flex items-center gap-1">
              <Video className="w-3.5 h-3.5" /> Conference Room
            </Link>
            <Link href="/admin" className="hover:text-purple-400">Admin Portal</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/checkout" className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 transition-all border border-slate-700">
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <Link href="/admin" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30">
              <Lock className="w-4 h-4" /> Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section className="relative py-16 rounded-3xl bg-slate-900/60 border border-slate-800 text-center overflow-hidden p-6 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> Integrated Multi-Page Hub
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">ZeeS Group Global</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
              Explore our dedicated pages for Toys, Cosmetics, Jewelry, and Fashion products, or place direct Cash on Delivery orders.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/departments" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> View Departments Page
              </Link>
              <Link href="/checkout" className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-400" /> Go to COD Checkout Page
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/departments" className="bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl transition-all group flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-base">4 Core Departments</h4>
              <p className="text-xs text-slate-400">Browse Toys, Beauty, Jewelry & Apparel</p>
            </div>
            <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/conference" className="bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl transition-all group flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-base">Virtual Conference</h4>
              <p className="text-xs text-slate-400">Executive Meeting & Live Chat Room</p>
            </div>
            <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/admin" className="bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-2xl transition-all group flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-base">Admin Dashboard</h4>
              <p className="text-xs text-slate-400">Track Cash on Delivery Orders</p>
            </div>
            <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-slate-500 text-xs">
        <p>© 2026 ZeeS Group Global. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
