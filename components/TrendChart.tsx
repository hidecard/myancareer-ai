
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Software Developer', value: 85, color: '#2563eb' },
  { name: 'Digital Marketer', value: 70, color: '#3b82f6' },
  { name: 'Graphic Designer', value: 65, color: '#60a5fa' },
  { name: 'UI/UX Designer', value: 75, color: '#93c5fd' },
  { name: 'Content Creator', value: 80, color: '#bfdbfe' },
];

const TrendChart: React.FC = () => {
  return (
    <div className="w-full bg-white p-5 md:p-10 rounded-none md:rounded-[2rem] lg:rounded-[3rem] shadow-sm border border-slate-100">
      <div className="mb-6 md:mb-10 text-center sm:text-left">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">လက်ရှိ အလုပ်အကိုင် ဈေးကွက် လိုအပ်ချက်</h3>
        <p className="text-slate-500 font-bold text-xs md:text-sm italic">မြန်မာနိုင်ငံရှိ နည်းပညာနှင့် ဖန်တီးမှု နယ်ပယ်များ၏ ၂၀၂၅ ခုနှစ်အတွင်း ဝယ်လိုအား ခန့်မှန်းချက်</p>
      </div>
      
      <div className="h-[300px] md:h-[400px] w-full -ml-4 md:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
              width={100}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="p-4 md:p-6 bg-green-50 rounded-2xl border border-green-100 transition-all hover:shadow-md hover:shadow-green-500/10">
          <p className="text-[9px] md:text-[10px] text-green-700 font-black mb-1.5 uppercase tracking-widest">တိုးတက်မှု အမြန်ဆုံး</p>
          <p className="text-sm md:text-lg font-black text-green-900">Content Creator</p>
        </div>
        <div className="p-4 md:p-6 bg-blue-50 rounded-2xl border border-blue-100 transition-all hover:shadow-md hover:shadow-blue-500/10">
          <p className="text-[9px] md:text-[10px] text-blue-700 font-black mb-1.5 uppercase tracking-widest">ဝင်ငွေ အကောင်းဆုံး</p>
          <p className="text-sm md:text-lg font-black text-blue-900">Software Developer</p>
        </div>
        <div className="p-4 md:p-6 bg-purple-50 rounded-2xl border border-purple-100 transition-all hover:shadow-md hover:shadow-purple-500/10">
          <p className="text-[9px] md:text-[10px] text-purple-700 font-black mb-1.5 uppercase tracking-widest">စွမ်းရည် လိုအပ်ချက်</p>
          <p className="text-sm md:text-lg font-black text-purple-900">AI Basics</p>
        </div>
        <div className="p-4 md:p-6 bg-orange-50 rounded-2xl border border-orange-100 transition-all hover:shadow-md hover:shadow-orange-500/10">
          <p className="text-[9px] md:text-[10px] text-orange-700 font-black mb-1.5 uppercase tracking-widest">အလုပ်အကိုင် ပေါများမှု</p>
          <p className="text-sm md:text-lg font-black text-orange-900">Remote Work</p>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
