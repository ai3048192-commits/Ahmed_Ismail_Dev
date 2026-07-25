import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

type Props = {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  className?: string; // أضفنا هذه الخاصية للتحكم بالمكان عند الحاجة
};

export default function ThemeToggle({ isDark, setIsDark, className = "" }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDark(!isDark)}
      className={`p-3 rounded-xl border cursor-pointer shadow-md flex items-center justify-center z-50 transition-colors duration-300 ${
        isDark 
          ? "bg-zinc-800 border-zinc-700 text-amber-400 hover:bg-zinc-700 shadow-black/40" 
          : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 shadow-slate-300/50"
      } ${className}`}
      aria-label="Toggle Theme"
      type="button"
    >
      {isDark ? (
        <Sun size={18} className="text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={18} className="text-blue-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </motion.button>
  );
}