import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Bot, X, Send, Sparkles, User, ShieldCheck } from "lucide-react";

type Props = {
  lang?: string;
  isDark?: boolean;
};

export default function FloatingWidget({ lang = "EN", isDark = true }: Props) {
  const isAr = lang?.toUpperCase() === "AR";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: isAr
        ? "أهلاً بك! أنا المساعد الذكي الخاص بـ أحمد إسماعيل. كيف يمكنني خدمتك اليوم؟"
        : "Hello! I'm Ahmed Ismail's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      let aiReply = isAr
        ? "شكراً لتواصلك! يمكنك مناقشة أحمد مباشرة عبر زر واتساب بالأسفل، أو ترك تفاصيل مشروعك."
        : "Thanks for reaching out! You can discuss directly with Ahmed via WhatsApp below or share your project details.";

      if (userMessage.toLowerCase().includes("project") || userMessage.includes("مشروع")) {
        aiReply = isAr
          ? "أحمد متخصص في بناء وتطوير واجهات المستخدم وتطبيقات الويب الحديثة. هل ترغب في بدء مشروع جديد؟"
          : "Ahmed specializes in building modern UI and web apps. Would you like to start a new project?";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 1000);
  };

  return (
    <div className={`fixed top-20 sm:top-24 ${isAr ? "left-4 sm:left-8" : "right-4 sm:right-8"} z-50 font-sans`} dir={isAr ? "rtl" : "ltr"}>
      
      {/* نافذة الدردشة الذكية */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute top-16 ${
              isAr ? "left-0" : "right-0"
            } w-[320px] sm:w-[380px] h-[460px] sm:h-[500px] backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-300 ${
              isDark 
                ? "bg-[#050811]/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] text-white" 
                : "bg-white/95 border border-slate-300 shadow-xl text-slate-900"
            }`}
          >
            {/* الهيدر */}
            <div className={`p-4 border-b flex items-center justify-between ${isDark ? "bg-gradient-to-r from-zinc-900/90 via-cyan-950/30 to-zinc-900/90 border-cyan-500/20" : "bg-slate-100 border-slate-200"}`}>
              <div className="flex items-center gap-3">
                <div className={`relative p-2.5 rounded-2xl border shadow-inner ${isDark ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/40" : "bg-cyan-100 text-cyan-700 border-cyan-300"}`}>
                  <Bot size={20} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-black flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <span>Cyber AI Core</span>
                    <Sparkles size={13} className={`animate-spin ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
                  </h4>
                  <p className={`text-[10px] font-mono ${isDark ? "text-cyan-300/70" : "text-cyan-600"}`}>
                    {isAr ? "متصل ومؤمن بالكامل" : "Online & Secure"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-xl transition-all ${isDark ? "bg-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-800" : "bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300"}`}
              >
                <X size={18} />
              </button>
            </div>

            {/* رسائل الشات */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin ${isDark ? "bg-transparent" : "bg-slate-50/50"}`}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl text-xs flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                        : isDark 
                          ? "bg-zinc-900 border border-zinc-800 text-cyan-400" 
                          : "bg-white border border-slate-300 text-cyan-600 shadow-sm"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold rounded-tr-none shadow-md"
                        : isDark
                          ? "bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-none shadow-inner"
                          : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* زر الواتساب السريع داخل الشات */}
            <div className={`px-4 py-2.5 border-t flex items-center justify-between ${isDark ? "bg-zinc-900/60 border-zinc-800/80" : "bg-slate-100 border-slate-200"}`}>
              <span className={`text-[10px] font-mono flex items-center gap-1 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                <ShieldCheck size={12} className="text-emerald-500" />
                {isAr ? "محادثة مشفرة مباشرة" : "Direct encrypted chat"}
              </span>
              <a
                href="https://wa.me/201026377928"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isDark 
                    ? "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" 
                    : "bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-700"
                }`}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* إدخال النص */}
            <form onSubmit={handleSend} className={`p-3 border-t flex items-center gap-2 ${isDark ? "bg-zinc-950 border-cyan-500/30" : "bg-white border-slate-200"}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isAr ? "اكتب استفسارك هنا..." : "Type your inquiry..."}
                className={`flex-1 text-xs px-3.5 py-3 rounded-2xl outline-none transition-colors ${
                  isDark 
                    ? "bg-zinc-900 border border-zinc-800 focus:border-cyan-500 text-white placeholder:text-zinc-500" 
                    : "bg-slate-100 border border-slate-300 focus:border-cyan-600 text-slate-900 placeholder:text-slate-400"
                }`}
              />
              <button
                type="submit"
                className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:opacity-90 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* زر العائم الرئيسي */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center cursor-pointer transition-all border border-cyan-300/40"
        aria-label="AI Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>

        {isOpen ? <X size={22} className="text-black" /> : <Bot size={22} className="text-black" />}
      </motion.button>

    </div>
  );
}