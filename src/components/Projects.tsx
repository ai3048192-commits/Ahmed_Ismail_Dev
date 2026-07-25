import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderGit2, Search, ArrowUpRight, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Projects({ lang = "EN", isDark = true }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All", label: lang === "EN" ? "All Projects" : "كل المشاريع" },
    { name: "Dashboards", label: lang === "EN" ? "Dashboards" : "لوحات التحكم" },
    { name: "E-Commerce", label: lang === "EN" ? "E-Commerce" : "المتاجر" },
    { name: "Platforms", label: lang === "EN" ? "Platforms" : "المنصات" },
    { name: "Systems", label: lang === "EN" ? "Systems" : "الأنظمة" },
    { name: "Applications", label: lang === "EN" ? "Applications" : "التطبيقات" },
  ];

  // جلب المشاريع من Supabase عند التحميل
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  // فلترة المشاريع بناءً على الفئة وحقل البحث واللغة الحالية
  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    
    // التحقق من اسم ووصف المشروع باللغة النشطة حالياً
    const currentName = (lang === "EN" ? p.name_en : p.name_ar) || p.name_en || "";
    const currentDesc = (lang === "EN" ? p.desc_en : p.desc_ar) || p.desc_en || "";

    const matchesSearch = currentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          currentDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className={`py-28 px-4 md:px-8 relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#07090F]" : "bg-white"}`}>
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs mb-4 ${isDark ? "bg-[#12192B] border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "bg-cyan-100 border border-cyan-300 text-cyan-600 shadow-sm"}`}>
            <FolderGit2 size={13} />
            <span>{lang === "EN" ? "PORTFOLIO // SUPABASE SYNCED" : "معرض الأعمال المربوط بقاعدة البيانات"}</span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            {lang === "EN" ? "Featured Projects" : "أبرز أعمالي البرمجية"}
          </h2>
          <p className={`text-sm md:text-base font-normal ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
            {lang === "EN"
              ? "Explore a selection of real-world applications and web systems fetched live from database."
              : "استكشف مجموعة من التطبيقات والأنظمة البرمجية المحدثة مباشرة من قاعدة البيانات."}
          </p>
        </motion.div>

        {/* FILTERS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveFilter(cat.name)}
                  className={`
                    px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? isDark ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "bg-cyan-100 text-cyan-600 border border-cyan-300 shadow-sm"
                      : isDark ? "bg-[#0D111C] text-zinc-400 border border-[#1E273F] hover:border-zinc-700 hover:text-zinc-200" : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"}
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder={lang === "EN" ? "Search projects..." : "ابحث عن مشروع..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none transition-all shadow-inner ${isDark ? "bg-[#0D111C] border border-[#1E273F] text-white placeholder-zinc-500 focus:border-cyan-500/60" : "bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-cyan-400"}`}
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={36} className="animate-spin text-cyan-500" />
            <p className={`text-sm ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
              {lang === "EN" ? "Loading projects from database..." : "جاري تحميل المشاريع من قاعدة البيانات..."}
            </p>
          </div>
        ) : (
          <>
            {/* PROJECTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, i) => {
                  const title = lang === "EN" ? (p.name_en || p.name) : (p.name_ar || p.name);
                  const description = lang === "EN" ? (p.desc_en || p.desc) : (p.desc_ar || p.desc);
                  const projectTags = lang === "EN" ? p.tags_en : p.tags_ar;

                  return (
                    <motion.a
                      key={p.id || p.name_en}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl ${isDark ? "bg-[#0D111C]/90 border border-[#1A2338] hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]" : "bg-slate-50 border border-slate-300 hover:border-cyan-400 hover:shadow-md"}`}
                    >
                      {/* Image Container */}
                      <div className={`relative h-52 overflow-hidden ${isDark ? "bg-[#12192B]" : "bg-slate-200"}`}>
                        <img
                          src={p.image || "../assets/projects/default.png"}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className={`absolute inset-0 via-transparent opacity-60 ${isDark ? "bg-gradient-to-t from-[#0D111C]" : "bg-gradient-to-t from-slate-300"}`} />
                        
                        <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                          <ArrowUpRight size={16} className="text-cyan-400" />
                        </div>

                        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                          {p.category}
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className={`font-bold text-lg mb-2 transition-colors flex items-center justify-between ${isDark ? "text-white group-hover:text-cyan-400" : "text-slate-900 group-hover:text-cyan-600"}`}>
                            <span>{title}</span>
                          </h3>
                          <p className={`text-xs md:text-sm leading-relaxed mb-4 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                            {description}
                          </p>
                        </div>

                        {/* Tags and Link URL footer */}
                        <div className={`pt-4 border-t flex items-center justify-between ${isDark ? "border-[#1E273F]/60" : "border-slate-300/60"}`}>
                          <div className="flex flex-wrap gap-1.5">
                            {projectTags?.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isDark ? "bg-[#151D33] text-zinc-400 border border-[#232F4C]" : "bg-slate-200 text-slate-600 border border-slate-300"}`}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className={`text-xs font-mono flex items-center gap-1 group-hover:underline ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                            {lang === "EN" ? "Live Demo" : "معاينة حية"} <ExternalLink size={12} />
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className={`text-center py-20 rounded-2xl ${isDark ? "bg-[#0D111C]/50 border border-[#1A2338]" : "bg-slate-100 border border-slate-300"}`}>
                <p className={`text-sm ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                  {lang === "EN" ? "No projects found matching your search." : "لا توجد مشاريع تطابق بحثك الحالي."}
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}