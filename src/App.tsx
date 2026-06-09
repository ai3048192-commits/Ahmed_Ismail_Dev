import { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  // تعريف المراجع (Refs) لكل قسم
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // دالة التحريك للقسم المطلوب
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200">
      {/* تمرير دالة التنقل والمراجع للهيدر */}
      <Header 
        scrollTo={scrollToSection} 
        refs={{ heroRef, skillsRef, projectsRef, experienceRef, contactRef }} 
      />

      <main>
        <div ref={heroRef}><Hero /></div>
        <div ref={skillsRef}><Skills /></div>
        <div ref={projectsRef}><Projects /></div>
        <div ref={experienceRef}><Experience /></div>
        <div ref={contactRef}><Contact /></div>
      </main>

      <footer className="py-10 text-center border-t border-slate-800 text-slate-500 text-sm font-mono">
        © 2026 Ahmed Ismail | Built with React & Tailwind
      </footer>
    </div>
  );
}

export default App;