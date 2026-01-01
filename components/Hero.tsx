
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white w-full pt-5 pb-10 md:pt-8 md:pb-16">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[60px] opacity-60"></div>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-3 leading-tight">
            သင့်ရဲ့ <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">အနာဂတ် အလုပ်အကိုင်</span> ကို AI နဲ့ ပုံဖော်လိုက်ပါ
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
            ဘာကိုသင်ယူရမှန်း မသိဖြစ်နေသလား? မိမိမှာရှိတဲ့ စွမ်းရည်တွေနဲ့ ဘယ်အလုပ်က အကိုက်ညီဆုံးလဲဆိုတာကို MyanCareer AI က လမ်းညွှန်ပေးမှာပါ။
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="w-full sm:w-auto rounded-lg md:rounded-xl bg-blue-600 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-bold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
            >
              အခုပဲ စစ်ဆေးကြည့်မယ်
            </button>
            <a href="#trends" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors py-2 flex items-center gap-1">
              ပိုမိုလေ့လာရန် <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 w-full max-w-4xl mx-auto">
          <div className="relative -m-1.5 rounded-lg md:rounded-xl bg-slate-900/5 p-1.5 ring-1 ring-inset ring-slate-900/10 md:rounded-2xl md:p-2 shadow-lg">
            <div className="relative rounded-lg overflow-hidden shadow-md bg-slate-200 aspect-[16/9] md:aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200&h=600"
                alt="Collaboration at workspace"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              
              {/* Floating badges for visual flair */}
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 animate-fade-in delay-300">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <span className="text-[9px] font-bold text-slate-900 uppercase tracking-wider">AI Powered Strategy</span>
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
