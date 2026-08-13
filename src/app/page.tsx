import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 -z-10 pointer-events-none" />

      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-lg">
            Z
          </div>
          <span className="font-semibold text-lg tracking-wider text-slate-100">
            ZeeS Group Global
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
          <Link href="#about" className="hover:text-white transition-colors">About Us</Link>
        </nav>
        <button className="px-5 py-2.5 rounded-full text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/20">
          Admin Portal
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>Next-Gen Enterprise Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 max-w-4xl leading-tight">
          Scalable Cloud Solutions & Master Operations Portal
        </h1>

        <p className="mt-6 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          High-performance web architecture, real-time analytics, and automated multi-tier administrative controls built for global scalability.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25">
            Launch Application
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
            Explore Documentation
          </button>
        </div>

        {/* Feature Cards Grid (Glassmorphism UI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Edge Performance</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Global low-latency deployment utilizing Cloudflare Edge runtime for ultra-fast load times.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-4">
              🛡️
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Master Administration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Granular role-based authorization, security controls, and live system monitoring dashboards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4">
              🌐
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">International Integration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Seamless global transaction capabilities and secure multi-cloud API infrastructure.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
