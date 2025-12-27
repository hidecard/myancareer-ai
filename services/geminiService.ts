
import { GoogleGenAI, Type } from "@google/genai";
import { CareerGuide } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCareerGuide = async (currentSkills: string, interests: string): Promise<CareerGuide> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview", 
    contents: `လက်ရှိ ကျွမ်းကျင်မှု: "${currentSkills}" နှင့် စိတ်ဝင်စားမှု: "${interests}" တို့အပေါ် အခြေခံ၍ အသေးစိတ် Career Roadmap တစ်ခုကို မြန်မာဘာသာဖြင့် ရေးသားပေးပါ။ ထို့အပြင် ဤအရည်အချင်းများနှင့် ကိုက်ညီနိုင်သော အခြားအလုပ်အကိုင် ၂ ခုမှ ၃ ခုကိုလည်း အကြံပြုပေးပါ။`,
    config: {
      systemInstruction: "သင်သည် မြန်မာနိုင်ငံရှိ ထိပ်တန်း အသက်မွေးဝမ်းကျောင်း လမ်းညွှန်သူ (Career Strategist) တစ်ဦး ဖြစ်သည်။ အသုံးပြုသူ၏ အချက်အလက်များအပေါ် မူတည်၍ အောင်မြင်မှုရရှိစေမည့် အဆင့်ဆင့် လမ်းပြမြေပုံကို ပေးပါ။ ရလာဒ်အားလုံးကို မြန်မာဘာသာဖြင့်သာ ပေးရမည်။ JSON format ဖြင့်သာ ပြန်ပေးပါ။",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          matchScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High-level technical skills required for this role" },
          salaryRange: { type: Type.STRING },
          marketDemand: { type: Type.STRING },
          requiredExperience: { type: Type.STRING },
          softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          interviewTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          potentialCompanies: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendedCertifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          mentorshipAdvice: { type: Type.STRING },
          longTermGoal: { type: Type.STRING },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                skillsToAcquire: { type: Type.ARRAY, items: { type: Type.STRING } },
                toolsToMaster: { type: Type.ARRAY, items: { type: Type.STRING } },
                estimatedTime: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } },
                projectIdea: { type: Type.STRING },
                successMetrics: { type: Type.STRING },
                resources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      url: { type: Type.STRING }
                    },
                    required: ["title", "url"]
                  }
                }
              },
              required: ["title", "description", "skillsToAcquire", "toolsToMaster", "estimatedTime", "difficulty", "prerequisites", "projectIdea", "successMetrics", "resources"]
            }
          },
          relatedJobs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING }
              },
              required: ["title", "summary"]
            }
          }
        },
        required: [
          "jobTitle", "matchScore", "summary", "requiredSkills", "salaryRange", "marketDemand", 
          "requiredExperience", "softSkills", "interviewTips", 
          "potentialCompanies", "recommendedCertifications", "mentorshipAdvice", "longTermGoal", "roadmap", "relatedJobs"
        ]
      }
    },
  });

  const text = response.text;
  if (!text) throw new Error("AI ဆီမှ အချက်အလက်များ မရရှိနိုင်ပါ။");
  
  try {
    const data = JSON.parse(text);
    return {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      generatedAt: new Date().toISOString()
    } as CareerGuide;
  } catch (error) {
    throw new Error("AI ၏ တုံ့ပြန်မှုကို ဖတ်၍မရပါ။ ခဏနေမှ ထပ်ကြိုးစားကြည့်ပေးပါ။");
  }
};

export const chatWithMentor = async (history: {role: 'user' | 'model', parts: {text: string}[]}[], message: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: message }] }],
    config: {
      systemInstruction: "သင်သည် မြန်မာနိုင်ငံမှ နွေးထွေးဖော်ရွေသော Career Mentor တစ်ဦးဖြစ်သည်။ အသုံးပြုသူ၏ မေးခွန်းများကို မြန်မာဘာသာဖြင့် တိုတိုနှင့် လိုရင်းရောက်အောင် ဖြေကြားပေးပါ။",
    }
  });
  return response.text;
};

export const searchJobsInMyanmar = async (jobTitle: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `မြန်မာနိုင်ငံတွင် "${jobTitle}" နှင့် ပတ်သက်သော အလုပ်အကိုင် အခွင့်အလမ်း ၃ ခုမှ ၅ ခုအထိ ရှာဖွေပေးပါ။ အရင်းအမြစ် (Source) များကိုလည်း ဖော်ပြပေးပါ။ မြန်မာဘာသာဖြင့်သာ ရေးသားပါ။`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  return {
    text: response.text || "",
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
