import { Mail, MessageCircle, User, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative py-28 px-6 bg-slate-950 overflow-hidden">
      {/* خلفية glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[400px] h-[400px] bg-cyan-500 blur-3xl rounded-full top-[-120px] left-[-120px]" />
        <div className="absolute w-[300px] h-[300px] bg-purple-500 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          خلينا نبدأ مشروعك 🚀
        </h2>
        <p className="text-slate-400 text-center mb-14">
          اكتب رسالتك أو تواصل معي مباشرة
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* الفورم */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
            <h3 className="text-white font-bold text-xl mb-6">
              أرسل رسالة
            </h3>

            <form className="space-y-5">
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="اسمك"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="الإيميل"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <textarea
                placeholder="اكتب رسالتك..."
                rows={5}
                className="w-full p-4 rounded-xl bg-slate-900/50 border border-white/10 text-white outline-none focus:border-cyan-500"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition"
              >
                <Send size={18} />
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* الكروت */}
          <div className="space-y-6">
            {/* Email */}
            <a
              href="mailto:ai3048192@gmail.com"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Mail />
              </div>
              <div>
                <h4 className="text-white font-bold">الإيميل</h4>
                <p className="text-slate-400 text-sm">
                  رد خلال 24 ساعة
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201026377928" target="_blank"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/50 transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <MessageCircle />
              </div>
              <div>
                <h4  className="text-white font-bold">واتساب</h4>
                <p className="text-slate-400 text-sm">
                  رد فوري وسريع
                </p>
              </div>
            </a>

            <div className="text-slate-500 text-sm mt-6">
              متاح لمشاريع:
              <br />
              React • Next.js • UI Design • Frontend  *  Backend   
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}