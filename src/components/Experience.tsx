import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export default function Education() {
  const data = [
    {
      type: "education",
      title: "Computer Science / هندسة حاسب",
      org: "University Study",
      period: "2018 - 2022",
      desc: "دراسة علوم الحاسب، البرمجة، قواعد البيانات، وهندسة البرمجيات.",
    },
    {
      type: "certificate",
      title: "Full Stack Web Development",
      org: "Online Certification",
      period: "2023",
      desc: "React, TypeScript, PHP, MySQL, Tailwind CSS + مشاريع عملية.",
    },
    {
      type: "certificate",
      title: "Frontend Advanced Training",
      org: "Self Learning / Courses",
      period: "2024",
      desc: "Framer Motion + UI/UX + Performance Optimization + Design Systems.",
    },
  ];

  const iconMap = {
    education: <GraduationCap className="text-cyan-400" />,
    certificate: <Award className="text-yellow-400" />,
  };

  return (
    <section className="relative py-28 px-6 bg-[#05070F] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[160px] bottom-[-120px] right-[-120px]" />
      </div>

      {/* TITLE */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Education & <span className="text-cyan-400">Certificates</span>
        </h2>
        <p className="text-slate-400 mt-3">
          Academic journey + professional certifications
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-4xl mx-auto">

        {/* LINE */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-cyan-500/20" />

        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative mb-16 flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >

            {/* DOT */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            {/* CARD */}
            <div
              className="
                w-full md:w-[45%]
                p-6 rounded-2xl
                bg-gradient-to-b from-slate-900 to-slate-950
                border border-slate-800
                hover:border-cyan-500/50
                transition
              "
            >
              {/* ICON */}
              <div className="flex items-center gap-2 mb-3 text-lg">
                {iconMap[item.type]}
                <span className="text-white font-bold">
                  {item.title}
                </span>
              </div>

              <p className="text-cyan-400 font-mono text-sm">
                {item.period}
              </p>

              <p className="text-slate-300 font-medium mt-1">
                {item.org}
              </p>

              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}