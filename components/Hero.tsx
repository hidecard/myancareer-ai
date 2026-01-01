
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white w-full pt-6 pb-12 md:pt-8 md:pb-20 lg:pt-10 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[80px] opacity-60"></div>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight md:leading-[1.1]">
            သင့်ရဲ့ <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">အနာဂတ် အလုပ်အကိုင်</span> ကို AI နဲ့ ပုံဖော်လိုက်ပါ
          </h1>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium px-2 sm:px-4">
            ဘာကိုသင်ယူရမှန်း မသိဖြစ်နေသလား? မိမိမှာရှိတဲ့ စွမ်းရည်တွေနဲ့ ဘယ်အလုပ်က အကိုက်ညီဆုံးလဲဆိုတာကို MyanCareer AI က လမ်းညွှန်ပေးမှာပါ။
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-6">
            <button
              onClick={onStart}
              className="w-full sm:w-auto rounded-xl md:rounded-2xl bg-blue-600 px-6 md:px-10 py-3 md:py-4 text-sm md:text-lg font-black text-white shadow-lg md:shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              အခုပဲ စစ်ဆေးကြည့်မယ်
            </button>
            <a href="#trends" className="text-sm md:text-base font-bold leading-6 text-slate-900 hover:text-blue-600 transition-colors py-2.5 px-2 flex items-center gap-1">
              ပိုမိုလေ့လာရန် <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        
        <div className="mt-10 md:mt-16 lg:mt-20 w-full max-w-5xl mx-auto">
          <div className="relative -m-2 rounded-xl md:rounded-2xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-[2.5rem] lg:p-4 shadow-xl md:shadow-2xl">
            <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-xl bg-slate-200 aspect-[16/9] md:aspect-[16/10] lg:aspect-[2/1]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200&h=600"
                alt="Collaboration at workspace"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              
              {/* Floating badges for visual flair */}
              <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 animate-fade-in delay-300">
                <div className="bg-white/90 backdrop-blur px-3.5 py-2 rounded-lg md:rounded-xl shadow-lg border border-white/20 flex items-center gap-2.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-[9px] md:text-xs font-black text-slate-900 uppercase tracking-wider">AI Powered Strategy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
