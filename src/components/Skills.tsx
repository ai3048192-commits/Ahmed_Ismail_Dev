import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Cpu, 
  Layout, 
  Database, 
  Wrench, 
  Gauge, 
  Terminal, 
  ShieldCheck, 
  Star
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function SkillsWheel({ lang = "EN", isDark = true }) {
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skills, setSkills] = useState([]);

  // المهارات الافتراضية الاحتياطية في حال عدم وجود اتصال أو بيانات

  // جلب البيانات من Supabase مع التحديث الحي
  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase.from("skills").select("*").order("id", { ascending: false });
      if (error) {
        console.error("Error fetching skills:", error.message);
        setSkills(defaultSkills);
      } else if (data && data.length > 0) {
        setSkills(data);
      } else {
        setSkills(defaultSkills);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setSkills(defaultSkills);
    }
  };

  useEffect(() => {
    fetchSkills();

    // الاستماع لأي تغيرات تحدث في جدول skills بقاعدة البيانات لتحديث الصفحة فوراً
    const channel = supabase
      .channel("public:skills")
      .on("postgres_changes", { event: "*", schema: "public", table: "skills" }, () => {
        fetchSkills();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = [
    { name: "All", icon: Sparkles, label: lang === "EN" ? "All Skills" : "جميع المهارات" },
    { name: "Frontend", icon: Cpu, label: lang === "EN" ? "Frontend" : "الواجهات الأمامية" },
    { name: "Design", icon: Layout, label: lang === "EN" ? "Design" : "التصميم" },
    { name: "Backend", icon: Database, label: lang === "EN" ? "Backend" : "الخوادم" },
    { name: "Tools", icon: Wrench, label: lang === "EN" ? "Tools" : "الأدوات" },
    { name: "Optimization", icon: Gauge, label: lang === "EN" ? "Optimization" : "الأداء" },
  ];

  const filteredSkills = activeTab === "All" 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  const avgLevel = skills.length > 0 ? Math.round(skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length) : 0;

  return (
    <section id="skills" className={`py-28 px-4 md:px-8 relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#07090F]" : "bg-white"}`}>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs mb-4 ${isDark ? "bg-[#12192B] border border-blue-500/30 text-blue-400" : "bg-blue-100 border border-blue-300 text-blue-600"}`}>
            <Terminal size={13} />
            <span>{lang === "EN" ? "SYSTEM_EXPERTISE // 2026" : "نظام الخبرات والمهارات"}</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            {lang === "EN" ? "Technical Arsenal" : "ترسانة التقنيات والمهارات"}
          </h2>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeTab === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                className={`relative px-5 py-2.5 rounded-xl font-medium text-xs md:text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? isDark ? "text-white bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50" : "text-blue-600 bg-blue-100 border border-blue-300"
                    : isDark ? "text-zinc-400 bg-[#0D111C]/80 border border-[#1E273F]" : "text-slate-600 bg-slate-100 border border-slate-300"
                }`}
              >
                <IconComp size={15} className={isActive ? "text-blue-400" : "text-zinc-500"} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const skillName = lang === "EN" ? skill.name_en : skill.name_ar;
              const skillDesc = lang === "EN" ? skill.desc_en : skill.desc_ar;
              const isHovered = hoveredSkill === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isDark ? "bg-[#0D111C]/90 border-[#1A2338]" : "bg-slate-50 border-slate-300"
                  }`}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: skill.color || "#3b82f6" }} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner"
                          style={{ backgroundColor: `${skill.color || "#3b82f6"}15`, borderColor: `${skill.color || "#3b82f6"}40`, color: skill.color || "#3b82f6" }}
                        >
                          <Star size={18} fill={isHovered ? (skill.color || "#3b82f6") : "none"} />
                        </div>
                        <div>
                          <h3 className={`font-semibold text-base ${isDark ? "text-white" : "text-slate-900"}`}>{skillName}</h3>
                          <span className={`text-[11px] font-mono uppercase ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{skill.category}</span>
                        </div>
                      </div>
                      
                      <div className="px-2.5 py-1 rounded-lg font-mono text-xs font-bold border" style={{ backgroundColor: `${skill.color || "#3b82f6"}15`, borderColor: `${skill.color || "#3b82f6"}30`, color: skill.color || "#3b82f6" }}>
                        {skill.level}%
                      </div>
                    </div>

                    <p className={`text-xs md:text-sm mb-6 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                      {skillDesc}
                    </p>
                  </div>

                  <div className="w-full bg-[#151D33] h-2 rounded-full overflow-hidden p-[1px] border border-[#232F4C]">
                    <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: skill.color || "#3b82f6" }} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* STATS BAR */}
        <div className={`mt-16 p-6 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? "bg-[#0B0F19]/90 border border-[#1A2338]" : "bg-slate-100 border border-slate-300"}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                {lang === "EN" ? "Continuous Growth & Learning" : "تطور واستمرار في التعلم المستمر"}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-400 font-mono">{skills.length}+</div>
              <div className={`text-[11px] uppercase ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{lang === "EN" ? "Total Skills" : "إجمالي المهارات"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-purple-400 font-mono">{avgLevel}%</div>
              <div className={`text-[11px] uppercase ${isDark ? "text-zinc-500" : "text-slate-500"}`}>{lang === "EN" ? "Overall Mastery" : "متوسط الكفاءة"}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}