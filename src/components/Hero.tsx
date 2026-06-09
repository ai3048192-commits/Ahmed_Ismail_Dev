import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#05070F]">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[160px] bottom-[-120px] right-[-120px]" />
      </div>

      {/* FLOATING CODE BLOCKS */}
      <div className="absolute inset-0 overflow-hidden font-mono text-xs sm:text-sm text-cyan-300 opacity-20">

        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-10 bg-black/30 p-3 rounded-lg border border-cyan-500/20"
        >
{`const dev = {
  name: "Ahmed",
  skill: "React",
  level: "Pro"
}`}
        </motion.div>

        <motion.div
          animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-10 bg-black/30 p-3 rounded-lg border border-purple-500/20"
        >
{`function buildUI() {
  return "awesome app 🚀";
}`}
        </motion.div>

        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
        >
{`<React />
<Tailwind />
<Motion />`}
        </motion.div>

      </div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >

        {/* BADGE */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          AVAILABLE FOR FREELANCE
        </div>

        {/* TITLE */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
          I BUILD <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            REACT APPS
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
Full Stack Developer
أقوم بتطوير تطبيقات ويب متكاملة (Full Stack) باستخدام React في الواجهة الأمامية، مع بناء وإدارة الـ Backend وقواعد البيانات، مع التركيز على الأداء، تجربة المستخدم، والتصميم العصري
        
        </p>

{/* BUTTONS */}
<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
  
  <button
    onClick={() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:scale-105 transition"
  >
    View Projects
  </button>

  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition"
  >
    Contact Me
  </button>

</div>

      </motion.div>
    </section>
  );
}
