import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  FileDown,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { supabase } from "../lib/supabase"; 

type Props = {
  lang?: string; 
  isArabic?: boolean; 
  isDark?: boolean;
};

export default function Footer({ lang = "EN", isArabic, isDark = true }: Props) {
  const isAr = isArabic || lang?.toUpperCase() === "AR";

  const [whatsappNumber, setWhatsappNumber] = useState("+201234567890");
  const [cvFileUrl, setCvFileUrl] = useState("/cv.pdf");

  // جلب البيانات من جدول settings في Supabase عند تحميل الفوتر
  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("whatsapp, cv_file")
          .eq("id", 1)
          .single();

        if (error) throw error;

        if (data) {
          if (data.whatsapp) setWhatsappNumber(data.whatsapp);
          if (data.cv_file) setCvFileUrl(data.cv_file);
        }
      } catch (err) {
        console.error("Error fetching footer settings from DB:", err);
      }
    };

    fetchFooterSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = {
    EN: {
      rights: "All systems operational.",
      backToTop: "Return to Top",
      headline: "READY TO BUILD THE NEXT BIG THING?",
      tagline:
        "Combining clean architecture, futuristic UI, and high-performance code.",
      downloadCV: "ACCESS RESUME",
      cvSubtitle: "PDF CHIP • VERIFIED 2026",
      whatsappLabel: "DIRECT DISPATCH",
      whatsappSub: "Encrypted WhatsApp Line",
      status: "SYSTEM ONLINE • 100%",
      badge: "CYBER CORE",
      myName: "Ahmed_Ismail_Dev",
    },
    AR: {
      rights: "جميع الأنظمة تعمل بكفاءة عالية.",
      backToTop: "العودة للقمة",
      headline: "جاهز لبناء مشروعك القادم بأسلوب مستقبلي؟",
      tagline:
        "دمج بين الهندسة البرمجية النظيفة، واجهات المستقبل، والأداء الفائق.",
      downloadCV: "تحميل ملف CV",
      cvSubtitle: "نسخة PDF معتمدة • 2026",
      whatsappLabel: "الإرسال المباشر",
      whatsappSub: "قناة واتساب مشفرة",
      status: "النظام متصل • 100%",
      badge: "النواة الرقمية",
      myName: "أحمد إسماعيل",
    },
  };

  const t = isAr ? content.AR : content.EN;

  const formattedWhatsapp = whatsappNumber.replace(/\D/g, "");
  const finalCvUrl = cvFileUrl.startsWith("http") ? cvFileUrl : `/${cvFileUrl}`;

  return (
    <footer
      dir={isAr ? "rtl" : "ltr"}
      className={`relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#030508] text-zinc-400 border-t border-cyan-500/20" : "bg-slate-50 text-slate-600 border-t border-slate-300"}`}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#06b6d4]" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className={`mb-16 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? "bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-zinc-900/80 border border-zinc-800/80" : "bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300"}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl pointer-events-none" />

          <div className="text-center md:text-start">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${isDark ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "bg-cyan-100 border-cyan-300 text-cyan-600"}`}>
              <Zap size={14} className="animate-bounce" />
              <span>{t.badge}</span>
            </div>
            <h2 className={`text-xl md:text-3xl font-black tracking-wide ${isDark ? "text-white" : "text-slate-900"}`}>
              {t.headline}
            </h2>
          </div>

          <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl text-xs ${isDark ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-emerald-100 border border-emerald-300 text-emerald-600"}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{t.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-5 text-center lg:text-start">
            <h3 className={`text-3xl font-black tracking-wider flex items-center justify-center lg:justify-start gap-3 mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              {t.myName}
              <span className="text-cyan-500"></span>
            </h3>
            <p className={`text-sm leading-relaxed max-w-md mx-auto lg:mx-0 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
              {t.tagline}
            </p>
          </div>

          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <motion.a
              href={`https://wa.me/${formattedWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isDark ? "bg-zinc-900/90 border border-emerald-500/30 hover:border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]" : "bg-slate-100 border border-emerald-300 hover:border-emerald-400 shadow-sm hover:shadow-md"}`}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${isDark ? "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black" : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"}`}>
                <MessageCircle size={24} />
              </div>
              <div className="text-start">
                <span className={`text-xs font-mono block mb-0.5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                  {t.whatsappLabel}
                </span>
                <h4 className={`text-sm font-bold transition-colors ${isDark ? "text-white group-hover:text-emerald-400" : "text-slate-900 group-hover:text-emerald-600"}`}>
                  WhatsApp
                </h4>
                <p className={`text-[10px] ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{t.whatsappSub}</p>
              </div>
            </motion.a>
          </div>

          <div className="lg:col-span-4 flex items-center gap-3">
            <motion.a
              href={finalCvUrl}
              download="CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex-1 flex items-center justify-between p-4 rounded-2xl transition-all duration-300 overflow-hidden ${isDark ? "bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.12)]" : "bg-cyan-50 border border-cyan-300 hover:border-cyan-400 shadow-sm hover:shadow-md"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              <div className="flex items-center gap-3.5 relative z-10">
                <div className={`p-3 rounded-xl transition-all duration-300 ${isDark ? "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black" : "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white"}`}>
                  <FileDown size={22} />
                </div>
                <div className="text-start">
                  <div className={`flex items-center gap-1 text-[10px] font-mono mb-0.5 ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                    <ShieldCheck size={12} />
                    <span>{t.cvSubtitle}</span>
                  </div>
                  <h4 className={`text-sm font-black transition-colors ${isDark ? "text-white group-hover:text-cyan-300" : "text-slate-900 group-hover:text-cyan-600"}`}>
                    {t.downloadCV}
                  </h4>
                </div>
              </div>

              <Sparkles
                size={18}
                className={`transition-colors ${isDark ? "text-cyan-500/40 group-hover:text-cyan-400" : "text-cyan-400 group-hover:text-cyan-600"}`}
              />
            </motion.a>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`p-4 rounded-2xl shadow-lg transition-colors ${isDark ? "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10" : "bg-slate-200 border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-cyan-400 hover:bg-cyan-100"}`}
              aria-label={t.backToTop}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${isDark ? "border-zinc-900/80 text-zinc-500" : "border-slate-300 text-slate-500"}`}>
          <p>
            © {new Date().getFullYear()} — {t.rights}
          </p>
          <div className="flex items-center gap-2">
            <span>BUILT WITH</span>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-cyan-500" : "bg-cyan-400"}`} />
            <span className={`font-bold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>NEXT-GEN TECH</span>
          </div>
        </div>

      </div>
    </footer>
  );
}