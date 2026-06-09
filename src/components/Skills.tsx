import { useState } from "react";
import { motion } from "framer-motion";

export default function SkillsWheel({ lang = "EN" }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: lang === "EN" ? "React" : "ريأكت", level: 95, category: "Frontend", color: "#06b6d4" },
    { name: lang === "EN" ? "JavaScript" : "جافا سكريبت", level: 90, category: "Frontend", color: "#fbbf24" },
    { name: lang === "EN" ? "TypeScript" : "تايب سكريبت", level: 85, category: "Frontend", color: "#3b82f6" },
    { name: lang === "EN" ? "CSS/Tailwind" : "سي إس إس", level: 92, category: "Design", color: "#a855f7" },
    { name: lang === "EN" ? "UI/UX Design" : "تصميم الواجهات", level: 88, category: "Design", color: "#ec4899" },
    { name: lang === "EN" ? "Figma" : "فيجما", level: 80, category: "Design", color: "#f97316" },
    { name: lang === "EN" ? "MySQL" : "ماي إس كيو إل", level: 75, category: "Backend", color: "#10b981" },
    { name: lang === "EN" ? "PHP" : "بي إتش بي", level: 70, category: "Backend", color: "#6366f1" },
    { name: lang === "EN" ? "Git" : "جيت", level: 85, category: "Tools", color: "#ef4444" },
    { name: lang === "EN" ? "Responsive Design" : "التصميم المتجاوب", level: 93, category: "Frontend", color: "#14b8a6" },
    { name: lang === "EN" ? "Animation" : "الحركات", level: 88, category: "Frontend", color: "#f43f5e" },
    { name: lang === "EN" ? "Performance" : "الأداء", level: 82, category: "Optimization", color: "#8b5cf6" },
  ];

  const radius = 200;
  const angleSlice = (360 / skills.length) * (Math.PI / 180);

  const categories = ["Frontend", "Design", "Backend", "Tools", "Optimization"];
  const categoryColors = {
    Frontend: "#06b6d4",
    Design: "#a855f7",
    Backend: "#10b981",
    Tools: "#ef4444",
    Optimization: "#8b5cf6",
  };

  const getSkillsInCategory = (category) => skills.filter(s => s.category === category);
  const getAvgLevel = (category) => {
    const categorySkills = getSkillsInCategory(category);
    return categorySkills.length > 0 
      ? Math.round(categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length)
      : 0;
  };

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0f172a, #0f1419, #0f172a)" }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 rounded-full blur-3xl" 
          style={{
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {lang === "EN" ? "My Expertise" : "مهاراتي"}
          </h2>
          <p className="text-slate-400 text-lg">
            {lang === "EN"
              ? "Interactive skill showcase"
              : "عرض تفاعلي للمهارات والقدرات"}
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* WHEEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* CENTER CIRCLE */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* SVG WHEEL */}
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-full"
                  style={{ filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.1))" }}
                >
                  {/* CIRCLES */}
                  <circle
                    cx="250"
                    cy="250"
                    r="150"
                    fill="none"
                    stroke="rgba(100, 116, 139, 0.3)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="100"
                    fill="none"
                    stroke="rgba(100, 116, 139, 0.2)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="50"
                    fill="none"
                    stroke="rgba(100, 116, 139, 0.2)"
                    strokeWidth="1"
                  />

                  {/* SKILLS SEGMENTS */}
                  {skills.map((skill, index) => {
                    const angle = angleSlice * index;
                    const x =
                      250 +
                      (radius * Math.cos(angle - Math.PI / 2)) *
                        (skill.level / 100);
                    const y =
                      250 +
                      (radius * Math.sin(angle - Math.PI / 2)) *
                        (skill.level / 100);

                    return (
                      <g key={index}>
                        {/* LINE FROM CENTER */}
                        <line
                          x1="250"
                          y1="250"
                          x2={x}
                          y2={y}
                          stroke={skill.color}
                          strokeWidth="0.5"
                          opacity="0.3"
                        />

                        {/* CIRCLE AT POSITION */}
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill={skill.color}
                          opacity={hoveredSkill === index ? 1 : 0.7}
                          style={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => setHoveredSkill(index)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        />
                      </g>
                    );
                  })}
                </svg>
              </motion.div>

              {/* CENTER DOT */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  style={{
                    position: "absolute",
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)",
                    filter: "blur(8px)"
                  }}
                />
                <div 
                  style={{
                    position: "absolute",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#0f172a",
                    border: "2px solid #06b6d4"
                  }}
                />
              </div>

              {/* SKILL LABELS */}
              {skills.map((skill, index) => {
                const angle = angleSlice * index;
                const labelRadius = radius + 80;
                const labelX =
                  250 + labelRadius * Math.cos(angle - Math.PI / 2);
                const labelY =
                  250 + labelRadius * Math.sin(angle - Math.PI / 2);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${labelX - 250}px), calc(-50% + ${labelY - 250}px))`,
                    }}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="cursor-pointer"
                  >
                    <motion.div
                      animate={
                        hoveredSkill === index
                          ? { scale: 1.15 }
                          : { scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-center"
                    >
                      <div
                        style={{
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "white",
                          backdropFilter: "blur(4px)",
                          border: `1px solid ${skill.color}66`,
                          backgroundColor: hoveredSkill === index ? skill.color + "dd" : skill.color + "99",
                          transition: "all 0.2s"
                        }}
                      >
                        {skill.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
                        {skill.level}%
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* STATS & INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* CATEGORIES */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                {lang === "EN" ? "Categories" : "التصنيفات"}
              </h3>
              <div className="space-y-3">
                {categories.map((category, idx) => {
                  const skillsInCategory = skills.filter(
                    (s) => s.category === category
                  );
                  const avgLevel =
                    skillsInCategory.length > 0
                      ? Math.round(
                          skillsInCategory.reduce((sum, s) => sum + s.level, 0) /
                            skillsInCategory.length
                        )
                      : 0;

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="group"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold text-sm">
                          {category}
                        </span>
                        <span 
                          className="text-sm font-bold"
                          style={{ color: categoryColors[category] }}
                        >
                          {avgLevel}%
                        </span>
                      </div>
                      <div style={{ 
                        height: "8px", 
                        background: "#1e293b", 
                        borderRadius: "9999px",
                        overflow: "hidden"
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${avgLevel}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          style={{
                            height: "100%",
                            borderRadius: "9999px",
                            background: `linear-gradient(to right, ${categoryColors[category]}, ${categoryColors[category]}dd)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* STATS */}
            <div style={{ paddingTop: "24px", borderTop: "1px solid #334155" }}>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "rgba(6, 182, 212, 0.1)",
                    border: "1px solid rgba(6, 182, 212, 0.3)"
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#06b6d4" }}>
                    {skills.length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {lang === "EN" ? "Skills" : "مهارة"}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "rgba(168, 85, 247, 0.1)",
                    border: "1px solid rgba(168, 85, 247, 0.3)"
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#a855f7" }}>
                    {Math.round(
                      skills.reduce((sum, s) => sum + s.level, 0) /
                        skills.length
                    )}
                    %
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {lang === "EN" ? "Avg Level" : "المتوسط"}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LEGEND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: "90px",
            padding: "24px",
            borderRadius: "10px",
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid #475569"
          }}
        >
          <p style={{ color: "#cbd5e1", fontSize: "14px", textAlign: "center" }}>
            {lang === "EN"
              ? "💡 Hover over the wheel to highlight skills. Distance from center = proficiency level"
              : "💡 حرك الماوس على الدائرة لتمييز المهارات. المسافة من المركز = مستوى الكفاءة"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}