
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
          <div className="space-y-8 md:space-y-12">
            <Hero onStart={handleStartAssessment} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 no-print px-2 md:px-0">
               {[
                 { label: 'ကူညီပေးပြီးသူ', val: '၁၀,၀၀၀+', color: 'blue' },
                 { label: 'အလုပ်အကိုင် ကဏ္ဍ', val: '၂၅+', color: 'indigo' },
                 { label: 'ကျွမ်းကျင်မှု နယ်ပယ်', val: '၂၀၀+', color: 'emerald' },
                 { label: 'AI တိကျမှု', val: '၉၈%', color: 'amber' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-slate-100 text-center flex flex-col justify-center transition-all hover:shadow-md">
                    <p className={`text-base md:text-lg lg:text-xl font-bold text-${stat.color}-600`}>{stat.val}</p>
                    <p className="text-[8px] md:text-[9px] text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                 </div>
               ))}
            </div>

            <section id="trends" className="animate-fade-in scroll-mt-16">
              <TrendChart />
            </section>
            
            <section className="py-8 md:py-12 bg-slate-900 rounded-none md:rounded-2xl px-4 md:px-6 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-blue-600/10 blur-[60px] md:blur-[80px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-24 md:w-36 h-24 md:h-36 bg-indigo-600/10 blur-[40px] md:blur-[60px] rounded-full"></div>
              
              <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10 relative z-10">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2">အလုပ်အကိုင် အခွင့်အလမ်းများ</h2>
                <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">ကျွန်ုပ်တို့၏ AI သည် သင့်ကို အောက်ပါဝန်ဆောင်မှုများဖြင့် ကူညီပေးပါမည်</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 relative z-10">
                {[
                  { id: 1, color: 'blue', title: 'မြန်ဆန်သော ဆန်းစစ်မှု', desc: 'သင့်ရဲ့ ကျွမ်းကျင်မှုတွေကို မိနစ်ပိုင်းအတွင်းမှာပဲ AI က တိကျစွာ ခွဲခြမ်းစိတ်ဖြာပေးပါတယ်။' },
                  { id: 2, color: 'emerald', title: 'ပြည့်စုံသော လမ်းပြမြေပုံ', desc: 'သင်တက်လှမ်းလိုတဲ့ ရာထူးရောက်ဖို့ လိုအပ်တဲ့ အဆင့်တိုင်းကို သေချာဖော်ပြပေးပါတယ်။' },
                  { id: 3, color: 'purple', title: 'PDF အဖြစ် သိမ်းဆည်းနိုင်မှု', desc: 'သင့်ရဲ့ Career Guide ကို ဖုန်းထဲမှာပဲ အလွယ်တကူ သိမ်းဆည်းပြီး အချိန်မရွေး ပြန်ကြည့်နိုင်ပါတယ်။' }
                ].map((feature) => (
                  <div key={feature.id} className="group bg-white/5 p-4 md:p-5 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10">
                    <div className={`w-8 h-8 md:w-10 md:h-10 bg-${feature.color}-500 rounded-lg flex items-center justify-center text-white mb-3 font-bold shadow-md`}>{feature.id}</div>
                    <h4 className="font-bold text-sm md:text-base mb-2">{feature.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-10 text-center relative z-10">
                <button 
                  onClick={handleStartAssessment}
                  className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white text-slate-900 rounded-lg font-medium shadow-md transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
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
