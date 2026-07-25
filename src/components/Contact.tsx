import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle2, Terminal, ShieldCheck, Cpu, Database, Layout, Sparkles, Radio, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase"; // تأكد من مسار ملف الـ supabase الصحيح لديك

export default function DeepSpaceContact({ lang = "EN", isDark = true }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", clearance: "Alpha" });
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("form");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("transmitting");

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            clearance: formData.clearance,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "", clearance: "Alpha" });
      }, 4000);

    } catch (err) {
      console.error("Error transmitting message:", err);
      setStatus("idle");
      alert(lang === "EN" ? "Transmission failed. Please try again." : "فشل الإرسال، يجدر المحاولة مرة أخرى.");
    }
  };

  return (
    <section id="contact" className={`relative min-h-screen w-full px-4 sm:px-6 lg:px-12 py-28 overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#010104] text-white" : "bg-white text-slate-900"}`}>
      
      {/* 🌌 Deep Space Holographic & Nebula Matrix */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className={`absolute inset-0 pointer-events-none opacity-30 ${isDark ? "bg-[linear-gradient(to_right,#0a0a16_1px,transparent_1px),linear-gradient(to_bottom,#0a0a16_1px,transparent_1px)] bg-[size:4rem_4rem]" : "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]"}`} />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header HUD Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center justify-between gap-4 mb-16 p-4 rounded-2xl backdrop-blur-2xl ${isDark ? "bg-white/[0.02] border border-white/10" : "bg-slate-100 border border-slate-300 shadow-sm"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className={`text-xs tracking-widest font-bold uppercase ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
              {lang === "EN" ? "INTERSTELLAR_COMMS // PROTOCOL_v4.8" : "اتصالات بين النجوم // بروتوكول 4.8"}
            </span>
          </div>
          <div className={`flex items-center gap-2 text-xs ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
            <Radio size={14} className={`animate-pulse ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <span>{lang === "EN" ? "ENCRYPTION: QUANTUM_SECURE" : "التشفير: آمن كمياً"}</span>
            <span className={isDark ? "text-zinc-600" : "text-slate-400"}>|</span>
            <span className={`font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>{lang === "EN" ? "STATUS: ONLINE" : "الحالة: متصل"}</span>
          </div>
        </motion.div>

        {/* Main Grid: Telemetry Panel (Left) + Terminal/Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Wing: Deep Telemetry & Rich Profile Data (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Mission Bio / Status Card */}
            <div className={`p-6 rounded-3xl backdrop-blur-3xl shadow-2xl relative overflow-hidden ${isDark ? "bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10" : "bg-slate-50 border border-slate-300"}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl border ${isDark ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-cyan-100 border-cyan-300 text-cyan-600"}`}>
                  <Terminal size={22} />
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border ${isDark ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" : "bg-cyan-100 text-cyan-700 border-cyan-300"}`}>
                  {lang === "EN" ? "ACTIVE_SECTOR" : "القطاع النشط"}
                </span>
              </div>

              <h3 className={`text-xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {lang === "EN" ? "Mission Commander & Architect" : "قائد المهمة والمهندس المعماري"}
              </h3>
              <p className={`text-xs leading-relaxed mb-6 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                {lang === "EN" 
                  ? "Ready for full-scale engineering deployments, high-performance web architecture, and avant-garde UI design missions across the digital expanse."
                  : "مستعد لعمليات التطوير الهندسي الكاملة، هندسة الويب عالية الأداء، ومهمات تصميم واجهات المستخدم المتطورة عبر الفضاء الرقمي."}
              </p>

              {/* Rich Stack Matrix */}
              <div className={`space-y-3 pt-4 border-t text-xs ${isDark ? "border-white/10" : "border-slate-300"}`}>
                <div className={`flex items-center justify-between ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                  <span className="flex items-center gap-2"><Cpu size={14} className={isDark ? "text-cyan-400" : "text-cyan-600"} /> {lang === "EN" ? "Core Engine:" : "محرك الأساس:"}</span>
                  <span className={`font-mono ${isDark ? "text-cyan-300" : "text-cyan-600"}`}>React / Next.js 15</span>
                </div>
                <div className={`flex items-center justify-between ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                  <span className="flex items-center gap-2"><Layout size={14} className={isDark ? "text-purple-400" : "text-purple-600"} /> {lang === "EN" ? "UI System:" : "نظام الواجهات:"}</span>
                  <span className={`font-mono ${isDark ? "text-purple-300" : "text-purple-600"}`}>Tailwind / Framer</span>
                </div>
                <div className={`flex items-center justify-between ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                  <span className="flex items-center gap-2"><Database size={14} className={isDark ? "text-green-400" : "text-green-600"} /> {lang === "EN" ? "Backend Sync:" : "مزامنة الخادم:"}</span>
                  <span className={`font-mono ${isDark ? "text-green-300" : "text-green-600"}`}>Node.js / Distributed</span>
                </div>
              </div>
            </div>

            {/* Direct Comms Links */}
            <div className="grid grid-cols-1 gap-4">
              <a
                href="mailto:ai3048192@gmail.com"
                className={`group flex items-center justify-between p-4 rounded-2xl backdrop-blur-xl transition-all ${isDark ? "bg-white/[0.03] border border-white/10 hover:border-cyan-500/50" : "bg-slate-50 border border-slate-300 hover:border-cyan-400"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${isDark ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-cyan-100 border-cyan-300 text-cyan-600"}`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{lang === "EN" ? "Quantum Mail" : "البريد الإلكتروني"}</h4>
                    <p className={`text-[11px] ${isDark ? "text-zinc-400" : "text-slate-600"}`}>ai3048192@gmail.com</p>
                  </div>
                </div>
                <span className={`text-xs transition-colors ${isDark ? "text-zinc-500 group-hover:text-cyan-400" : "text-slate-500 group-hover:text-cyan-600"}`}>CONNECT →</span>
              </a>

              <a
                href="https://wa.me/201026377928"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-4 rounded-2xl backdrop-blur-xl transition-all ${isDark ? "bg-white/[0.03] border border-white/10 hover:border-green-500/50" : "bg-slate-50 border border-slate-300 hover:border-green-400"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${isDark ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-green-100 border-green-300 text-green-600"}`}>
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{lang === "EN" ? "Subspace WhatsApp" : "واتساب الفضاء الفرعي"}</h4>
                    <p className={`text-[11px] ${isDark ? "text-zinc-400" : "text-slate-600"}`}>+20 102 637 7928</p>
                  </div>
                </div>
                <span className={`text-xs transition-colors ${isDark ? "text-zinc-500 group-hover:text-green-400" : "text-slate-500 group-hover:text-green-600"}`}>CONNECT →</span>
              </a>
            </div>

          </motion.div>

          {/* Right Wing: Holographic Transmission Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:col-span-7 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 relative overflow-hidden ${isDark ? "bg-[#050510]/90 border border-purple-500/20 shadow-[0_0_60px_rgba(0,0,0,0.9)]" : "bg-slate-50 border border-slate-300 shadow-xl"}`}
          >
            {/* Top Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />

            {/* Tab Switcher */}
            <div className={`flex items-center justify-between mb-8 pb-4 border-b ${isDark ? "border-white/10" : "border-slate-300"}`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "form" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30" : isDark ? "bg-white/5 text-zinc-400 hover:text-white" : "bg-slate-200 text-slate-700 hover:text-slate-900"}`}
                >
                  {lang === "EN" ? "TRANSMIT_FORM" : "نموذج الإرسال"}
                </button>
                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "telemetry" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30" : isDark ? "bg-white/5 text-zinc-400 hover:text-white" : "bg-slate-200 text-slate-700 hover:text-slate-900"}`}
                >
                  {lang === "EN" ? "SYSTEM_TELEMETRY" : "قياسات النظام"}
                </button>
              </div>
              <span className={`text-[10px] font-mono hidden sm:inline-block ${isDark ? "text-zinc-500" : "text-slate-500"}`}>SYS.ID: 9842-AX</span>
            </div>

            {activeTab === "form" ? (
              <div>
                {status === "transmitting" ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center space-y-6">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                    <div className="space-y-1">
                      <h4 className={`font-bold text-sm tracking-widest ${isDark ? "text-white" : "text-slate-900"}`}>
                        {lang === "EN" ? "TRANSMITTING SIGNAL..." : "جاري إرسال الإشارة وقيد الحفظ..."}
                      </h4>
                      <p className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-600"}`}>
                        {lang === "EN" ? "Saving payload directly to database..." : "حفظ البيانات مباشرة إلى قاعدة البيانات..."}
                      </p>
                    </div>
                  </div>
                ) : status === "success" ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-1">
                      <h4 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                        {lang === "EN" ? "TRANSMISSION SUCCESSFUL!" : "تم حفظ الرسالة بنجاح!"}
                      </h4>
                      <p className={`text-xs max-w-sm mx-auto ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                        {lang === "EN" 
                          ? "Your message has been stored in the database dashboard successfully."
                          : "تم تخزين رسالتك في لوحة تحكم قاعدة البيانات بنجاح."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-[11px] mb-1.5 uppercase font-mono ${isDark ? "text-zinc-400" : "text-slate-700"}`}>
                          {lang === "EN" ? "Commander Name *" : "اسم القائد *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={lang === "EN" ? "e.g. Alex Vance" : "مثال: أحمد محمد"}
                          className={`w-full px-4 py-3 rounded-xl text-xs outline-none transition-all ${
                            isDark 
                              ? "bg-black/60 border border-white/10 text-white focus:border-purple-500 placeholder:text-zinc-600" 
                              : "bg-white border border-slate-300 text-slate-900 focus:border-purple-600 placeholder:text-slate-400 shadow-sm"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] mb-1.5 uppercase font-mono ${isDark ? "text-zinc-400" : "text-slate-700"}`}>
                          {lang === "EN" ? "Comms Frequency (Email) *" : "البريد الإلكتروني *"}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@cosmos.io"
                          className={`w-full px-4 py-3 rounded-xl text-xs outline-none transition-all ${
                            isDark 
                              ? "bg-black/60 border border-white/10 text-white focus:border-purple-500 placeholder:text-zinc-600" 
                              : "bg-white border border-slate-300 text-slate-900 focus:border-purple-600 placeholder:text-slate-400 shadow-sm"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-[11px] mb-1.5 uppercase font-mono ${isDark ? "text-zinc-400" : "text-slate-700"}`}>
                        {lang === "EN" ? "Security Clearance Level" : "مستوى التصريح الأمني"}
                      </label>
                      <select
                        value={formData.clearance}
                        onChange={(e) => setFormData({ ...formData, clearance: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-xs outline-none transition-all cursor-pointer ${
                          isDark 
                            ? "bg-black/60 border border-white/10 text-white focus:border-purple-500" 
                            : "bg-white border border-slate-300 text-slate-900 focus:border-purple-600 shadow-sm"
                        }`}
                      >
                        <option value="Alpha">{lang === "EN" ? "Alpha - Full Stack Web Application" : "ألفا - تطبيق ويب متكامل"}</option>
                        <option value="Beta">{lang === "EN" ? "Beta - Frontend UI/UX Architecture" : "بيتا - هندسة واجهات المستخدم"}</option>
                        <option value="Gamma">{lang === "EN" ? "Gamma - General Consultation & Hiring" : "جاما - استشارة عامة وتوظيف"}</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-[11px] mb-1.5 uppercase font-mono ${isDark ? "text-zinc-400" : "text-slate-700"}`}>
                        {lang === "EN" ? "Mission Parameters & Message *" : "تفاصيل ورسالة المهمة *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={lang === "EN" ? "Detail your project scope, requirements, or objectives..." : "اكتب تفاصيل نطاق مشروعك، المتطلبات، أو الأهداف..."}
                        className={`w-full p-4 rounded-xl text-xs outline-none transition-all resize-none ${
                          isDark 
                            ? "bg-black/60 border border-white/10 text-white focus:border-purple-500 placeholder:text-zinc-600" 
                            : "bg-white border border-slate-300 text-slate-900 focus:border-purple-600 placeholder:text-slate-400 shadow-sm"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)] active:scale-[0.98] cursor-pointer"
                    >
                      <Send size={15} />
                      {lang === "EN" ? "Broadcast Transmission Packet" : "بث وحفظ حزمة الإرسال"}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="py-6 space-y-4 text-xs font-mono">
                <div className={`p-4 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-300 shadow-sm"}`}>
                  <span className="text-cyan-600 dark:text-cyan-400 block mb-1">&gt; SYSTEM_DIAGNOSTICS_RUNNING</span>
                  <p className={`text-[11px] ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                    {lang === "EN" 
                      ? "All circuits operational. Database listener active for incoming transmissions."
                      : "جميع الدوائر تعمل بكفاءة. مسجل قاعدة البيانات نشط لاستقبال الرسائل."}
                  </p>
                </div>
                <div className={`p-4 rounded-xl border space-y-2 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-300 shadow-sm"}`}>
                  <div className={`flex justify-between ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    <span>UPTIME_RATE:</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">99.98%</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    <span>DATABASE_TABLE:</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">messages</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    <span>SECURE_HANDSHAKE:</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">PASSED (RSA-4096)</span>
                  </div>
                </div>
              </div>
            )}

          </motion.div>

        </div>

      </div>

    </section>
  );
}