
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
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden">
      <Navbar onNav={handleNav} currentPage={currentPage} />

      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 md:py-12 max-w-7xl">
        {currentPage === 'home' && (
          <div className="space-y-12 md:space-y-24">
            <Hero onStart={handleStartAssessment} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 no-print px-2 md:px-0">
               {[
                 { label: 'ကူညီပေးပြီးသူ', val: '၁၀,၀၀၀+', color: 'blue' },
                 { label: 'အလုပ်အကိုင် ကဏ္ဍ', val: '၂၅+', color: 'indigo' },
                 { label: 'ကျွမ်းကျင်မှု နယ်ပယ်', val: '၂၀၀+', color: 'emerald' },
                 { label: 'AI တိကျမှု', val: '၉၈%', color: 'amber' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-5 md:p-10 rounded-3xl shadow-sm border border-slate-100 text-center flex flex-col justify-center transition-all hover:shadow-xl hover:-translate-y-1">
                    <p className={`text-xl md:text-4xl font-black text-${stat.color}-600`}>{stat.val}</p>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-3">{stat.label}</p>
                 </div>
               ))}
            </div>

            <section id="trends" className="animate-fade-in scroll-mt-24">
              <TrendChart />
            </section>
            
            <section className="py-12 md:py-28 bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
              
              <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">အလုပ်အကိုင် အခွင့်အလမ်းများ</h2>
                <p className="text-slate-400 font-bold text-base md:text-lg max-w-2xl mx-auto">ကျွန်ုပ်တို့၏ AI သည် သင့်ကို အောက်ပါဝန်ဆောင်မှုများဖြင့် ကူညီပေးပါမည်</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                {[
                  { id: 1, color: 'blue', title: 'မြန်ဆန်သော ဆန်းစစ်မှု', desc: 'သင့်ရဲ့ ကျွမ်းကျင်မှုတွေကို မိနစ်ပိုင်းအတွင်းမှာပဲ AI က တိကျစွာ ခွဲခြမ်းစိတ်ဖြာပေးပါတယ်။' },
                  { id: 2, color: 'emerald', title: 'ပြည့်စုံသော လမ်းပြမြေပုံ', desc: 'သင်တက်လှမ်းလိုတဲ့ ရာထူးရောက်ဖို့ လိုအပ်တဲ့ အဆင့်တိုင်းကို သေချာဖော်ပြပေးပါတယ်။' },
                  { id: 3, color: 'purple', title: 'PDF အဖြစ် သိမ်းဆည်းနိုင်မှု', desc: 'သင့်ရဲ့ Career Guide ကို ဖုန်းထဲမှာပဲ အလွယ်တကူ သိမ်းဆည်းပြီး အချိန်မရွေး ပြန်ကြည့်နိုင်ပါတယ်။' }
                ].map((feature) => (
                  <div key={feature.id} className="group bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20">
                    <div className={`w-14 h-14 md:w-16 md:h-16 bg-${feature.color}-500 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-white mb-8 font-black text-2xl shadow-xl shadow-${feature.color}-500/20 group-hover:scale-110 transition-transform`}>{feature.id}</div>
                    <h4 className="font-black text-xl md:text-2xl mb-4">{feature.title}</h4>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed font-bold opacity-80">{feature.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-20 md:mt-32 text-center relative z-10">
                <button 
                  onClick={handleStartAssessment}
                  className="px-12 py-5 bg-white text-slate-900 rounded-2xl md:rounded-[1.5rem] font-black shadow-2xl transition-all hover:scale-110 active:scale-95 text-lg"
                >
                  အခုပဲ စတင်လိုက်ပါ
                </button>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'assessment' && (
          <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto w-full">
            {!guide ? (
              <SkillForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            ) : (
              <GuideResult guide={guide} onReset={handleReset} />
            )}
          </div>
        )}

        {currentPage === 'trends' && (
          <div className="animate-fade-in max-w-5xl mx-auto w-full">
            <TrendChart />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 pt-16 md:pt-24 pb-8 no-print mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">
            <div className="sm:col-span-2 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">M</div>
                 <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MyanCareer AI</span>
              </div>
              <p className="text-slate-500 text-sm md:text-base max-w-sm leading-relaxed font-bold">
                မြန်မာလူငယ်များအတွက် နည်းပညာနှင့် အသက်မွေးဝမ်းကျောင်းဆိုင်ရာ လမ်းပြမြေပုံများကို AI စနစ်သုံး၍ အခမဲ့ ဖန်တီးပေးနေသော Platform ဖြစ်ပါသည်။
              </p>
            </div>
            <div className="space-y-8">
              <h5 className="font-black text-slate-900 uppercase tracking-widest text-[11px] border-l-4 border-blue-600 pl-3">Links</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><button onClick={() => handleNav('home')} className="hover:text-blue-600 transition-colors">ပင်မစာမျက်နှာ</button></li>
                <li><button onClick={() => handleNav('assessment')} className="hover:text-blue-600 transition-colors">လမ်းညွှန်ချက်ရယူရန်</button></li>
                <li><button onClick={() => handleNav('trends')} className="hover:text-blue-600 transition-colors">အလုပ်အကိုင် ရေစီးကြောင်း</button></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="font-black text-slate-900 uppercase tracking-widest text-[11px] border-l-4 border-indigo-600 pl-3">Community</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Facebook Page</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Discord Server</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-[11px] text-slate-400 uppercase tracking-widest font-black text-center md:text-left">
            <p>© ၂၀၂၅ MyanCareer AI. Empowering Myanmar Youth.</p>
            <div className="flex gap-8">
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
