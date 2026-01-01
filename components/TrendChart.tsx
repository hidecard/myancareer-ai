
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
    <div className="w-full bg-white p-4 md:p-6 rounded-none md:rounded-xl shadow-sm border border-slate-100">
      <div className="mb-4 md:mb-6 text-center sm:text-left">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">လက်ရှိ အလုပ်အကိုင် ဈေးကွက် လိုအပ်ချက်</h3>
        <p className="text-xs text-slate-500">မြန်မာနိုင်ငံရှိ နည်းပညာနှင့် ဖန်တီးမှု နယ်ပယ်များ၏ ၂၀၂၅ ခုနှစ်အတွင်း ဝယ်လိုအား ခန့်မှန်းချက်</p>
      </div>
      
      <div className="h-[200px] md:h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }}
              width={80}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 md:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
          <p className="text-[8px] text-green-700 font-medium uppercase tracking-wider mb-1">တိုးတက်မှု အမြန်ဆုံး</p>
          <p className="text-sm font-bold text-green-900">Content Creator</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-[8px] text-blue-700 font-medium uppercase tracking-wider mb-1">ဝင်ငွေ အကောင်းဆုံး</p>
          <p className="text-sm font-bold text-blue-900">Software Developer</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
          <p className="text-[8px] text-purple-700 font-medium uppercase tracking-wider mb-1">စွမ်းရည် လိုအပ်ချက်</p>
          <p className="text-sm font-bold text-purple-900">AI Basics</p>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-[8px] text-orange-700 font-medium uppercase tracking-wider mb-1">အလုပ်အကိုင် ပေါများမှု</p>
          <p className="text-sm font-bold text-orange-900">Remote Work</p>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
