import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Cpu,
  Briefcase,
  Award,
  Globe,
  Sparkles,
  Terminal,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  currentLang?: string;
  setCurrentLang?: (lang: string) => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
};

export default function Header({
  currentLang = "EN",
  setCurrentLang,
  isDark,
  setIsDark,
}: HeaderProps) {
  const [active, setActive] = useState("Home");
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    {
      name: "Home",
      arName: currentLang === "AR" ? "الرئيسية" : "Home",
      icon: Home,
      badge: "01",
      href: "#home",
    },
    {
      name: "Skills",
      arName: currentLang === "AR" ? "المهارات" : "Skills",
      icon: Cpu,
      badge: "02",
      href: "#skills",
    },
    {
      name: "Projects",
      arName: currentLang === "AR" ? "المشاريع" : "Projects",
      icon: Briefcase,
      badge: "03",
      href: "#projects",
    },
    {
      name: "Experience",
      arName: currentLang === "AR" ? "الخبرات" : "Experience",
      icon: Award,
      badge: "04",
      href: "#experience",
    },
  ];

  return (
    <>
      {/* ================= DESKTOP SCI-FI NEBULA EXECUTIVE HEADER ================= */}
      <div className="hidden lg:flex justify-center sticky top-6 z-50 px-8">
        <header
          className={`
          w-full max-w-6xl
          backdrop-blur-xl
          rounded-2xl
          px-8 py-4
          flex items-center justify-between
          relative
          transition-colors duration-300
          ${
            isDark
              ? "bg-[#07090F]/95 border border-[#1F263B]/80 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]"
              : "bg-white/95 border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)]"
          }
        `}
        >
          {/* Ambient Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          {/* Background Flares */}
          <div className="absolute -left-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* BRAND / LOGO */}
          <div className="flex items-center gap-4 cursor-pointer group z-10">
            <div className="flex flex-col justify-center">
              <h1
                className={`font-semibold text-base tracking-tight flex items-center gap-2 transition-colors ${
                  isDark ? "text-zinc-100" : "text-slate-900"
                }`}
              >
                {currentLang === "AR" ? "أحمد إسماعيل" : "Ahmed_Ismail_Dev "}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <Terminal size={12} className="text-blue-500" />
                <p
                  className={`text-xs font-mono tracking-wide ${
                    isDark ? "text-blue-300/80" : "text-blue-600/80"
                  }`}
                >
                  {currentLang === "AR"
                    ? "مهندس واجهات أمامية"
                    : "Frontend Architect"}
                </p>
              </div>
            </div>
          </div>

          {/* SPACIOUS CYBER NAVIGATION */}
          <nav
            className={`flex items-center gap-2 p-1.5 rounded-xl border relative z-10 transition-colors ${
              isDark
                ? "bg-[#0D111C]/90 border-[#1A2236]"
                : "bg-slate-100/90 border-slate-200"
            }`}
          >
            {navItems.map((item) => {
              const isActive = active === item.name;
              const IconComp = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={(e) => {
                    setActive(item.name);
                    scrollToSection(e, item.href);
                  }}
                  onMouseEnter={() => setIsHovered(item.name)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`
                    relative px-5 py-2.5 rounded-lg text-sm font-medium 
                    flex items-center gap-2.5 transition-colors duration-200 z-10 cursor-pointer
                    ${
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-slate-900"
                        : isDark
                          ? "text-zinc-400 hover:text-zinc-200"
                          : "text-slate-600 hover:text-slate-900"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sciFiActiveTab"
                      className={`absolute inset-0 rounded-lg border shadow-sm ${
                        isDark
                          ? "bg-gradient-to-r from-[#172138] to-[#11192E] border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                          : "bg-white border-blue-500/40 shadow-blue-500/5"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 30,
                      }}
                    />
                  )}

                  {!isActive && isHovered === item.name && (
                    <motion.div
                      layoutId="sciFiHoverTab"
                      className={`absolute inset-0 rounded-lg border ${
                        isDark
                          ? "bg-[#141B2D]/50 border-zinc-700/50"
                          : "bg-slate-200/50 border-slate-300/50"
                      }`}
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  <IconComp
                    size={16}
                    className={`relative z-10 transition-colors ${
                      isActive
                        ? "text-blue-500"
                        : isDark
                          ? "text-zinc-500"
                          : "text-slate-400"
                    }`}
                  />
                  <span className="relative z-10">{item.arName}</span>

                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-blue-500/20 text-blue-500"
                        : isDark
                          ? "bg-[#141B2D] text-zinc-600"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* CONTROLS (Theme + Language) */}
          <div className="flex items-center gap-4 relative z-50">
            {/* Theme Toggle Component (Desktop) */}
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

            {/* LANGUAGE SELECTOR */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`
                  flex items-center gap-2.5 px-4 py-2.5 rounded-xl 
                  border font-mono text-xs 
                  transition-all duration-200 cursor-pointer select-none
                  shadow-sm
                  ${
                    isDark
                      ? `bg-[#0D111C] ${isLangMenuOpen ? "border-blue-500/50" : "border-[#1E273F]"} text-zinc-300 hover:border-blue-500/40 hover:bg-[#12192B]`
                      : `bg-slate-50 ${isLangMenuOpen ? "border-blue-500/50" : "border-slate-200"} text-slate-700 hover:border-blue-500/40 hover:bg-slate-100`
                  }
                `}
              >
                <Globe size={15} className="text-blue-500" />
                <span>{currentLang === "EN" ? "EN / AR" : "AR / EN"}</span>
                <Sparkles
                  size={12}
                  className={`text-purple-500 ml-0.5 transition-transform duration-300 ${isLangMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <>
                    <div
                      onClick={() => setIsLangMenuOpen(false)}
                      className="fixed inset-0 z-40"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 top-full mt-3 w-40 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-2xl border ${
                        isDark
                          ? "bg-[#0D111C] border-[#232F4C] shadow-black/80"
                          : "bg-white border-slate-200 shadow-slate-300/50"
                      }`}
                    >
                      <div
                        className={`absolute -top-1.5 right-6 w-3 h-3 rotate-45 border-l border-t ${
                          isDark
                            ? "bg-[#0D111C] border-[#232F4C]"
                            : "bg-white border-slate-200"
                        }`}
                      />

                      <div className="relative z-10 flex flex-col gap-1">
                        <button
                          onClick={() => {
                            setCurrentLang?.("EN");
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                            currentLang === "EN"
                              ? "bg-blue-600/20 text-blue-500 border border-blue-500/30 font-bold"
                              : isDark
                                ? "text-zinc-400 hover:bg-[#151D33] hover:text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span>English</span>
                          <span className="text-[10px] bg-blue-500/20 px-1 py-0.5 rounded text-blue-500">
                            EN
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentLang?.("AR");
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                            currentLang === "AR"
                              ? "bg-blue-600/20 text-blue-500 border border-blue-500/30 font-bold"
                              : isDark
                                ? "text-zinc-400 hover:bg-[#151D33] hover:text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span>العربية</span>
                          <span className="text-[10px] bg-blue-500/20 px-1 py-0.5 rounded text-blue-500">
                            AR
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
      </div>

      {/* ================= MOBILE SCI-FI BOTTOM BAR ================= */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <div
          className={`
          backdrop-blur-2xl
          rounded-2xl p-2
          flex items-center justify-between gap-1
          relative
          overflow-visible
          transition-colors duration-300
          ${
            isDark
              ? "bg-[#07090F]/95 border border-[#1F263B] shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
              : "bg-white/95 border border-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
          }
        `}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* Navigation Links (Mobile) */}
          <div className="flex items-center flex-1 justify-around">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = active === item.name;
              return (
                <button
                  key={item.name}
                  onClick={(e) => {
                    setActive(item.name);
                    scrollToSection(e, item.href);
                  }}
                  className={`
                    relative flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? isDark
                          ? "text-white font-medium"
                          : "text-slate-900 font-medium"
                        : isDark
                          ? "text-zinc-400"
                          : "text-slate-500"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileSciFiTab"
                      className={`absolute inset-0 rounded-xl border ${
                        isDark
                          ? "bg-gradient-to-b from-[#17223B] to-[#11192E] border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                          : "bg-slate-100 border-blue-500/40 shadow-sm"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <IconComponent
                    size={18}
                    className={`relative z-10 ${
                      isActive
                        ? "text-blue-500"
                        : isDark
                          ? "text-zinc-500"
                          : "text-slate-400"
                    }`}
                  />
                  <span className="text-[10px] mt-1 relative z-10 font-medium tracking-tight">
                    {item.arName}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`w-[1px] h-8 mx-1 ${
              isDark ? "bg-[#1F263B]" : "bg-slate-200"
            }`}
          />

          {/* Mobile Controls (Theme + Language) */}
          <div className="flex items-center gap-1.5 pr-1">
            <div className="scale-90 origin-right">
              <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            </div>

            <button
              onClick={() =>
                setCurrentLang?.(currentLang === "EN" ? "AR" : "EN")
              }
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl border font-mono text-[10px] active:scale-95 transition-transform cursor-pointer ${
                isDark
                  ? "bg-[#0D111C] border-[#1E273F] text-blue-400"
                  : "bg-slate-50 border-slate-200 text-blue-600"
              }`}
            >
              <Globe size={14} className="text-blue-500 mb-0.5" />
              <span className="font-bold">{currentLang}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}