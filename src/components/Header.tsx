import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

// نضيف scrollTo و refs كـ props للمكون
export default function Header({ scrollTo, refs }) {
  const [lang, setLang] = useState("AR");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("الرئيسية");

  const toggleLang = () => {
    const html = document.documentElement;
    if (lang === "AR") {
      setLang("EN");
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    } else {
      setLang("AR");
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    }
  };

  const navLinks =
    lang === "AR"
      ? [
          { label: "الرئيسية", ref: refs.heroRef },
          { label: "المهارات", ref: refs.skillsRef },
          { label: "المشاريع", ref: refs.projectsRef },
          { label: "الخبرات", ref: refs.experienceRef },
          { label: "التواصل", ref: refs.contactRef },
        ]
      : [
          { label: "Home", ref: refs.heroRef },
          { label: "Skills", ref: refs.skillsRef },
          { label: "Projects", ref: refs.projectsRef },
          { label: "Experience", ref: refs.experienceRef },
          { label: "Contact", ref: refs.contactRef },
        ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-2xl bg-gradient-to-r from-[#070B14]/95 via-[#0B1220]/95 to-[#070B14]/95 border-b border-cyan-400/20 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold">{"</>"}</div>
            <div className={lang === "AR" ? "text-right" : "text-left"}>
              <h1 className="text-white font-bold text-lg">Ahmed Ismail</h1>
              <p className="text-xs text-cyan-400 font-mono">Frontend Developer</p>
            </div>
          </div>

          <nav className="hidden lg:flex gap-8">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActive(item.label);
                  scrollTo(item.ref);
                }}
                className="relative text-slate-300 hover:text-cyan-400 transition"
              >
                {item.label}
                <span className={`absolute left-0 -bottom-2 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-300 ${active === item.label ? "w-full" : "w-0"}`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="px-3 py-2 rounded-lg border border-cyan-500/30 bg-[#0F172A] text-cyan-400 font-mono text-sm hover:border-cyan-400 transition">
              {"</>"} {lang}
            </button>
            <a href="/Ahmed_Ismail_CV.pdf" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:scale-105 transition">
              <FileText size={16} /> CV
            </a>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden bg-[#070B14] border-t border-cyan-500/10">
            <div className="p-5 flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollTo(item.ref);
                    setIsMenuOpen(false);
                  }}
                  className="text-slate-300 hover:text-cyan-400 text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}