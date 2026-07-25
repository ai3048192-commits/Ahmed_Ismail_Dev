import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import {
  Terminal,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type Props = {
  lang?: string;
  isDark?: boolean;
};

export default function Hero({ lang = "EN", isDark = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isArabic = lang === "AR";

  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) {
        setHeroData(data[0]);
      }
    } catch (error) {
      console.error("Error fetching hero content:", error);
    } finally {
      setLoading(false);
    }
  };

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      ref={containerRef}
      dir={isArabic ? "rtl" : "ltr"}
      className={`relative min-h-[92vh] w-full flex items-center justify-center px-6 lg:px-20 py-24 overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      {/* خلفية بتصميم مهندس محترف (Modern Aura Gradients) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن / الأيسر: النصوص والـ CTA بتخطيط نظيف ومباشر */}
        <div className="lg:col-span-7 flex flex-col items-start text-start">
          
          {/* شارة إنجاز أو حالة حديثة */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-6 ${
              isDark
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                : "bg-blue-50 border-blue-200 text-blue-700"
            }`}
          >
            <Sparkles size={14} className="text-blue-400" />
            <span>{isArabic ? "متاح للمشاريع والوظائف التقنية" : "Available for Full-Stack & Frontend Roles"}</span>
          </motion.div>

          {/* العنوان الرئيسي المستمد من Supabase */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {loading ? (
              <span className="animate-pulse opacity-40">Loading...</span>
            ) : isArabic ? (
              <span>{heroData?.title_ar || heroData?.title || "هندسة منتجات رقمية بأكواد واجهات استثنائية."}</span>
            ) : (
              <span>{heroData?.title_en || heroData?.title || "Architecting Digital Products with Elite Frontend Code."}</span>
            )}
          </motion.h1>

          {/* الوصف المستمد من Supabase */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {loading ? (
              <span className="animate-pulse opacity-40">...</span>
            ) : isArabic ? (
              heroData?.description_ar || heroData?.description || "مهندس واجهات أمامية وخبير تقني، أركز على بناء تطبيقات وتجارب ويب عالية الأداء ومصممة بدقة متناهية باستخدام React وأحدث المعايير البرمجية."
            ) : (
              heroData?.description_en || heroData?.description || "Frontend Engineer & Tech Architect focused on building high-performance, accessible, and meticulously designed web applications using React and modern architecture standards."
            )}
          </motion.p>

          {/* مميزات سريعة بنقاط تفصيلية */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-4 mb-10 text-xs font-medium"
          >
            <div className={`flex items-center gap-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <CheckCircle2 size={16} className="text-blue-500" />
              <span>{isArabic ? "كود نظيف وقابل للتوسع" : "Clean & Scalable Code"}</span>
            </div>
            <div className={`flex items-center gap-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <CheckCircle2 size={16} className="text-blue-500" />
              <span>{isArabic ? "تصميم متجاوب بالكامل" : "Fully Responsive UI"}</span>
            </div>
            <div className={`flex items-center gap-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <CheckCircle2 size={16} className="text-blue-500" />
              <span>{isArabic ? "أداء فائق السرعة" : "High Performance"}</span>
            </div>
          </motion.div>

          {/* أزرار التفاعل الـ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const element = document.querySelector("#projects");
                if (element) {
                  const navHeight = 90;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-blue-600/25 cursor-pointer"
            >
              <span>{isArabic ? "استكشاف المشاريع" : "Explore Projects"}</span>
              <ArrowIcon size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  const navHeight = 90;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className={`px-7 py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer border ${
                isDark
                  ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                  : "bg-white border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 shadow-sm"
              }`}
            >
              <span>{isArabic ? "تواصل معي" : "Get in Touch"}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* الجانب الأيسر: بطاقة مهارات متقدمة ومستقلة بتصميم بطاقات متداخلة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 grid grid-cols-1 gap-4 w-full"
        >
          <div className={`p-6 rounded-3xl border transition-all hover:border-blue-500/40 ${
            isDark ? "bg-slate-900/40 border-slate-800 backdrop-blur-xl shadow-2xl" : "bg-white border-slate-200 shadow-xl"
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Code2 size={22} />
              </div>
              <div className="text-start">
                <h5 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                  {isArabic ? "معمارية برمجية متطورة" : "Advanced Tech Stack"}
                </h5>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  React, Next.js, Tailwind CSS
                </p>
              </div>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
              <div className="h-full bg-blue-500 w-[95%]" />
            </div>
          </div>

          <div className={`p-6 rounded-3xl border transition-all hover:border-indigo-500/40 ${
            isDark ? "bg-slate-900/40 border-slate-800 backdrop-blur-xl shadow-2xl" : "bg-white border-slate-200 shadow-xl"
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Cpu size={22} />
              </div>
              <div className="text-start">
                <h5 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                  {isArabic ? "الأداء وتحسين محركات البحث" : "Performance & SEO"}
                </h5>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  100% Lighthouse Optimization
                </p>
              </div>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
              <div className="h-full bg-indigo-500 w-[90%]" />
            </div>
          </div>

          <div className={`p-6 rounded-3xl border transition-all hover:border-cyan-500/40 ${
            isDark ? "bg-slate-900/40 border-slate-800 backdrop-blur-xl shadow-2xl" : "bg-white border-slate-200 shadow-xl"
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Layers size={22} />
              </div>
              <div className="text-start">
                <h5 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                  {isArabic ? "قواعد البيانات والتخزين" : "Database & Backend Sync"}
                </h5>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Supabase & REST APIs
                </p>
              </div>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
              <div className="h-full bg-cyan-500 w-[92%]" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}