import { motion } from "framer-motion";

// صورك (حطهم في assets زي ما شرحنا قبل كده)
import p1 from "../assets/projects/system.jpg.png";
import p2 from "../assets/projects/accounts.jpg.png";
import p3 from "../assets/projects/alashbal.jpg.png";
import p4 from "../assets/projects/homely.jpg.png";
import p5 from "../assets/projects/freestyle.jpg.png";
import p6 from "../assets/projects/perfected.jpg.png";

const projects = [
  {
    name: "System 74",
    url: "https://system74.netlify.app/",
    image: p1,
    desc: "نظام إدارة شامل (Dashboard & Control Panel)",
  },
  {
    name: "Accounts 74",
    url: "https://accounts74.netlify.app/",
    image: p2,
    desc: "نظام تسجيل دخول وإدارة حسابات المستخدمين",
  },
  {
    name: "Al Ashbal",
    url: "https://al-ashbal.pages.dev/",
    image: p3,
    desc: "منصة تعليمية وإدارة محتوى تعليمي",
  },
  {
    name: "Homely - العقارات 🏠",
    url: "https://homely-lfyy.vercel.app/",
    image: p4,
    desc: "موقع عقارات لعرض وبيع وتأجير الوحدات",
  },
  {
    name: "Free Style - الملابس 👕",
    url: "https://free-style-7v85.vercel.app/",
    image: p5,
    desc: "متجر ملابس عصري لعرض المنتجات والشراء",
  },
  {
    name: "Perfected App",
    url: "https://perfected-exemplify-liftoff.ngrok-free.dev/",
    image: p6,
    desc: "تطبيق ويب متكامل متعدد الوظائف",
  },
];

export default function Projects() {
  return (
    <section className="py-24 bg-slate-950 px-6">

      <h2 className="text-4xl font-bold text-white text-center mb-12">
        المشاريع
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.url}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="
              rounded-2xl overflow-hidden
              bg-slate-900 border border-slate-800
              hover:border-cyan-500
              transition
              group
            "
          >

            {/* IMAGE */}
            <div className="h-48 overflow-hidden">
              <img
                src={p.image}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h3 className="text-white font-bold text-lg">
                {p.name}
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                {p.desc}
              </p>

              <p className="text-cyan-400 text-xs mt-3 font-mono">
                {p.url}
              </p>

            </div>

          </motion.a>
        ))}

      </div>
    </section>
  );
}