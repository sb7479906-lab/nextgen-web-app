"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function AdminPage() {
  const mockOrders = [
    { id: "ORD-9821", customer: "Muhammad Ali", phone: "+923001234567", address: "GULBERG III, LAHORE", status: "Pending", amount: "PKR 3,499" },
    { id: "ORD-9822", customer: "Usman Raza", phone: "+923219876543", address: "DHA PHASE 5, LAHORE", status: "Confirmed", amount: "PKR 2,199" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-purple-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-800">
          <ArrowLeft className="w-4 h-4" /> Back to Home Hub
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Package className="text-purple-400" /> Admin Order Tracker Portal
            </h1>
            <p className="text-xs text-slate-400">Separate Admin Route (`/admin`)</p>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Address</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {mockOrders.map((ord) => (
                <tr key={ord.id}>
                  <td className="py-3 px-3 font-mono text-purple-400 font-bold">{ord.id}</td>
                  <td className="py-3 px-3 font-semibold">{ord.customer}</td>
                  <td className="py-3 px-3">{ord.phone}</td>
                  <td className="py-3 px-3 text-slate-400">{ord.address}</td>
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
  );
}
