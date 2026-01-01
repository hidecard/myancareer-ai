
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillForm from './components/SkillForm';
import GuideResult from './components/GuideResult';
import TrendChart from './components/TrendChart';
import { generateCareerGuide } from './services/geminiService';
import { CareerGuide } from './types';

const STORAGE_KEY = 'myancareer_saved_guide';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [guide, setGuide] = useState<CareerGuide | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setGuide(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleStartAssessment = () => {
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (skills: string, interests: string) => {
    setIsLoading(true);
    try {
      const result = await generateCareerGuide(skills, interests);
      setGuide(result);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to generate guide:", error);
      alert("AI တွက်ချက်မှုတွင် အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့ပါသည်။ နောက်တစ်ကြိမ် ထပ်မံကြိုးစားပေးပါ။");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGuide(null);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-700">
      <Navbar onNav={handleNav} currentPage={currentPage} />

      <main className="flex-grow w-full">
        {currentPage === 'home' && (
          <div className="space-y-8 sm:space-y-10 md:space-y-16 lg:space-y-20">
            <Hero onStart={handleStartAssessment} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 no-print px-2 md:px-0">
               {[
                 { label: 'ကူညီပေးပြီးသူ', val: '၁၀,၀၀၀+', color: 'blue' },
                 { label: 'အလုပ်အကိုင် ကဏ္ဍ', val: '၂၅+', color: 'indigo' },
                 { label: 'ကျွမ်းကျင်မှု နယ်ပယ်', val: '၂၀၀+', color: 'emerald' },
                 { label: 'AI တိကျမှု', val: '၉၈%', color: 'amber' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-3 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col justify-center transition-all hover:shadow-lg hover:-translate-y-1">
                    <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-${stat.color}-600`}>{stat.val}</p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1.5 sm:mt-2">{stat.label}</p>
                 </div>
               ))}
            </div>

            <section id="trends" className="animate-fade-in scroll-mt-20">
              <TrendChart />
            </section>
            
            <section className="py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 bg-slate-900 rounded-none sm:rounded-[2rem] lg:rounded-[3rem] px-4 sm:px-6 md:px-10 lg:px-14 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-blue-600/10 blur-[60px] sm:blur-[80px] md:blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-28 sm:w-40 md:w-56 h-28 sm:h-40 md:h-56 bg-indigo-600/10 blur-[40px] sm:blur-[60px] md:blur-[80px] rounded-full"></div>
              
              <div className="max-w-3xl lg:max-w-4xl mx-auto text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 relative z-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight">အလုပ်အကိုင် အခွင့်အလမ်းများ</h2>
                <p className="text-slate-400 font-bold text-xs sm:text-sm md:text-base max-w-xl lg:max-w-2xl mx-auto">ကျွန်ုပ်တို့၏ AI သည် သင့်ကို အောက်ပါဝန်ဆောင်မှုများဖြင့် ကူညီပေးပါမည်</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 relative z-10">
                {[
                  { id: 1, color: 'blue', title: 'မြန်ဆန်သော ဆန်းစစ်မှု', desc: 'သင့်ရဲ့ ကျွမ်းကျင်မှုတွေကို မိနစ်ပိုင်းအတွင်းမှာပဲ AI က တိကျစွာ ခွဲခြမ်းစိတ်ဖြာပေးပါတယ်။' },
                  { id: 2, color: 'emerald', title: 'ပြည့်စုံသော လမ်းပြမြေပုံ', desc: 'သင်တက်လှမ်းလိုတဲ့ ရာထူးရောက်ဖို့ လိုအပ်တဲ့ အဆင့်တိုင်းကို သေချာဖော်ပြပေးပါတယ်။' },
                  { id: 3, color: 'purple', title: 'PDF အဖြစ် သိမ်းဆည်းနိုင်မှု', desc: 'သင့်ရဲ့ Career Guide ကို ဖုန်းထဲမှာပဲ အလွယ်တကူ သိမ်းဆည်းပြီး အချိန်မရွေး ပြန်ကြည့်နိုင်ပါတယ်။' }
                ].map((feature) => (
                  <div key={feature.id} className="group bg-white/5 p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-${feature.color}-500 rounded-xl sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-5 font-black text-lg sm:text-xl shadow-lg sm:shadow-xl shadow-${feature.color}-500/20 group-hover:scale-105 transition-transform`}>{feature.id}</div>
                    <h4 className="font-black text-base sm:text-lg md:text-xl mb-3">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-bold opacity-80">{feature.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16 text-center relative z-10">
                <button 
                  onClick={handleStartAssessment}
                  className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white text-slate-900 rounded-xl sm:rounded-xl font-black shadow-lg sm:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  အခုပဲ စတင်လိုက်ပါ
                </button>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'assessment' && (
          <div className="space-y-8 md:space-y-12 w-full">
            {!guide ? (
              <SkillForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            ) : (
              <GuideResult guide={guide} onReset={handleReset} />
            )}
          </div>
        )}

        {currentPage === 'trends' && (
          <div className="animate-fade-in w-full">
            <TrendChart />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 w-full no-print mt-8 md:mt-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 md:mb-16 lg:mb-20">
            <div className="sm:col-span-2 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-sm sm:text-lg shadow-lg shadow-blue-500/20">M</div>
                 <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MyanCareer AI</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-bold max-w-xs sm:max-w-sm">
                မြန်မာလူငယ်များအတွက် နည်းပညာနှင့် အသက်မွေးဝမ်းကျောင်းဆိုင်ရာ လမ်းပြမြေပုံများကို AI စနစ်သုံး၍ အခမဲ့ ဖန်တီးပေးနေသော Platform ဖြစ်ပါသည်။
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-black text-slate-900 uppercase tracking-wider text-[10px] sm:text-[11px] border-l-4 border-blue-600 pl-2 sm:pl-3">Links</h5>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-bold text-slate-500">
                <li><button onClick={() => handleNav('home')} className="hover:text-blue-600 transition-colors">ပင်မစာမျက်နှာ</button></li>
                <li><button onClick={() => handleNav('assessment')} className="hover:text-blue-600 transition-colors">လမ်းညွှန်ချက်ရယူရန်</button></li>
                <li><button onClick={() => handleNav('trends')} className="hover:text-blue-600 transition-colors">အလုပ်အကိုင် ရေစီးကြောင်း</button></li>
              </ul>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-black text-slate-900 uppercase tracking-wider text-[10px] sm:text-[11px] border-l-4 border-indigo-600 pl-2 sm:pl-3">Community</h5>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Facebook Page</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Discord Server</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 md:pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] md:text-[11px] text-slate-400 uppercase tracking-wider font-black text-center sm:text-left">
            <p className="order-2 sm:order-1">© ၂၀၂၅ MyanCareer AI. Empowering Myanmar Youth.</p>
            <div className="flex gap-4 sm:gap-6 lg:gap-8 order-1 sm:order-2">
              <a href="#" className="hover:text-slate-900 transition-colors">မူဝါဒများ</a>
              <a href="#" className="hover:text-slate-900 transition-colors">စည်းကမ်းချက်များ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
