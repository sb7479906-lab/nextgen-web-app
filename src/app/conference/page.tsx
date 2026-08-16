"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Video, Users, Mic, MessageSquare } from "lucide-react";

export default function ConferencePage() {
  const [messages, setMessages] = useState([
    { sender: "Admin Hub", text: "Welcome to ZeeS Global Strategy Conference!" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: "You", text: inputMsg }]);
    setInputMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-purple-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-800">
          <ArrowLeft className="w-4 h-4" /> Back to Home Hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between h-96">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold w-fit">
              ● Stream Active
            </span>
            <div className="text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-lg">Executive Conference Call</h3>
            </div>
            <div className="flex justify-center gap-4">
              <button className="p-3 bg-slate-800 text-purple-300 rounded-full"><Mic className="w-5 h-5" /></button>
              <button className="p-3 bg-purple-600 text-white rounded-full"><Video className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between h-96">
            <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
              <MessageSquare className="w-4 h-4 text-purple-400" /> Executive Live Chat
            </h4>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {messages.map((m, i) => (
                <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <p className="font-bold text-purple-400 text-[10px]">{m.sender}</p>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
              <input type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} placeholder="Type message..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="bg-purple-600 text-white text-xs px-4 py-2 rounded-xl font-bold">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
