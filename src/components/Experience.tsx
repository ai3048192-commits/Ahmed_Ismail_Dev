import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Award,
  Sparkles,
  Calendar,
  X,
  ArrowRight,
  Loader2
} from "lucide-react";
import { supabase } from "../lib/supabase";

type Props = {
  lang?: "EN" | "AR";
  isDark?: boolean;
};

type EducationItem = {
  id: number;
  type: string;
  title_ar: string;
  title_en: string;
  org_ar: string;
  org_en: string;
  period: string;
  badge_ar: string;
  badge_en: string;
  image?: string;
  desc_ar: string;
  desc_en: string;
};

export default function Education({ lang = "EN", isDark = true }: Props) {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    org: string;
    period: string;
    desc: string;
    image?: string;
    badge: string;
  } | null>(null);

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching education items:", error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  return (
    <section
      id="experience"
      className={`relative min-h-screen w-full px-4 sm:px-6 lg:px-12 py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#050508]" : "bg-white"
      }`}
    >
      {/* Immersive Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#050508] to-[#050508]"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-white to-white"
        }`}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4 backdrop-blur-xl shadow-lg ${
              isDark
                ? "bg-white/[0.04] border border-white/10 text-purple-400"
                : "bg-purple-100 border border-purple-300 text-purple-600"
            }`}
          >
            <Sparkles size={13} />
            <span>
              {lang === "EN"
                ? "TRACK RECORD & CREDENTIALS"
                : "المسار الأكاديمي والشهادات"}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {lang === "EN"
              ? "Education & Certificates"
              : "التعليم والاعتمادات الرسمية"}
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            {lang === "EN"
              ? "A cinematic exploration of my verified qualifications and professional achievements."
              : "جولة بصرية في مؤهلاتي الأكاديمية والشهادات الاحترافية الموثقة."}
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            <p className={`text-sm font-mono ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
              {lang === "EN" ? "Loading credentials..." : "جاري تحميل المؤهلات والشهادات..."}
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-400"}`}>
              {lang === "EN" ? "No records found." : "لا توجد سجلات مضافة حالياً."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const title = lang === "EN" ? (item.title_en || item.title_ar) : (item.title_ar || item.title_en);
              const org = lang === "EN" ? (item.org_en || item.org_ar) : (item.org_ar || item.org_en);
              const badge = lang === "EN" ? (item.badge_en || item.badge_ar) : (item.badge_ar || item.badge_en);
              const desc = lang === "EN" ? (item.desc_en || item.desc_ar) : (item.desc_ar || item.desc_en);

              const formattedItem = {
                title,
                org,
                period: item.period,
                desc,
                image: item.image,
                badge
              };

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  onClick={() => setSelectedItem(formattedItem)}
                  className={`group relative backdrop-blur-2xl rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2.5 ${
                    isDark
                      ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]"
                      : "bg-slate-50 border border-slate-300 hover:border-purple-400 hover:shadow-lg"
                  }`}
                >
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-all pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div
                        className={`p-3 rounded-2xl border backdrop-blur-md ${
                          item.type === "education"
                            ? isDark
                              ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                              : "bg-blue-100 border-blue-300 text-blue-600"
                            : isDark
                            ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                            : "bg-purple-100 border-purple-300 text-purple-600"
                        }`}
                      >
                        {item.type === "education" ? (
                          <GraduationCap size={22} />
                        ) : (
                          <Award size={22} />
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-mono tracking-wider px-3 py-1 rounded-full ${
                          isDark
                            ? "bg-white/5 border border-white/10 text-purple-300"
                            : "bg-purple-100 border border-purple-300 text-purple-600"
                        }`}
                      >
                        {badge}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 font-mono text-xs mb-2 ${
                        isDark ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      <Calendar size={12} className="text-purple-400" />
                      <span>{item.period}</span>
                    </div>

                    <h3
                      className={`font-bold text-xl transition-colors mb-2 leading-snug ${
                        isDark
                          ? "text-white group-hover:text-purple-300"
                          : "text-slate-900 group-hover:text-purple-600"
                      }`}
                    >
                      {title}
                    </h3>

                    <p
                      className={`font-mono text-xs mb-4 ${
                        isDark ? "text-purple-400/90" : "text-purple-600"
                      }`}
                    >
                      {org}
                    </p>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 ${
                        isDark ? "text-zinc-400" : "text-slate-600"
                      }`}
                    >
                      {desc}
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between transition-colors ${
                      isDark
                        ? "border-white/10 text-zinc-300 group-hover:text-white"
                        : "border-slate-300 text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    <span className="text-xs font-medium font-mono">
                      {lang === "EN" ? "View Credential" : "معاينة الوثيقة"}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                        isDark
                          ? "bg-white/5 border-white/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500"
                          : "bg-purple-100 border-purple-300 text-purple-600 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600"
                      }`}
                    >
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cinematic Modal Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className={`fixed inset-0 z-50 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 ${
              isDark ? "bg-black/85" : "bg-slate-900/60"
            }`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`border rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[92vh] ${
                isDark
                  ? "bg-[#0b0c14] border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.2)] text-white"
                  : "bg-white border-purple-300 shadow-2xl text-slate-900"
              }`}
            >
              <div
                className={`flex items-center justify-between gap-4 mb-5 pb-4 border-b ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-2xl border ${
                      isDark
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-purple-100 text-purple-600 border-purple-300"
                    }`}
                  >
                    <Award size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border ${
                          isDark
                            ? "text-purple-300 bg-purple-500/10 border-purple-500/20"
                            : "text-purple-600 bg-purple-100 border-purple-300"
                        }`}
                      >
                        {selectedItem.badge}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          isDark ? "text-zinc-400" : "text-slate-500"
                        }`}
                      >
                        • {selectedItem.period}
                      </span>
                    </div>
                    <h3
                      className={`text-xl sm:text-2xl font-black tracking-tight ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {selectedItem.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className={`p-3 rounded-full border transition-all shrink-0 ${
                    isDark
                      ? "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border-white/10"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-300"
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {selectedItem.image && (
                <div
                  className={`relative w-full flex-1 min-h-[280px] sm:min-h-[400px] rounded-2xl overflow-hidden border flex items-center justify-center shadow-inner group ${
                    isDark
                      ? "border-white/10 bg-black/40"
                      : "border-slate-300 bg-slate-100"
                  }`}
                >
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="max-h-[62vh] w-auto object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              )}

              <div
                className={`mt-5 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <p
                  className={`text-xs sm:text-sm text-center sm:text-right leading-relaxed max-w-xl ${
                    isDark ? "text-zinc-400" : "text-slate-600"
                  }`}
                >
                  {selectedItem.desc}
                </p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-purple-600/30 shrink-0"
                >
                  {lang === "EN" ? "Close Preview" : "إغلاق المعاينة"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}