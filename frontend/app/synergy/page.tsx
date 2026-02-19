import { db } from '@/lib/db';
import { Microscope, FlaskConical, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default async function SynergyPage() {
  const [rows]: any = await db.execute('SELECT * FROM ingredient_combinations ORDER BY synergy_score DESC');

  return (
    <main className="pb-32 bg-[#fcfcfc]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-50/50 to-transparent">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-6">
              <FlaskConical size={14} className="text-brand-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Scientific Synergy Matrix</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter leading-none mb-8">
              The Golden <br/>
              <span className="text-brand-500 italic">Combination.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              영양제도 '팀워크'가 중요합니다. AI가 분석한 성분별 시너지 점수와 전문가 가이드를 통해 최적의 섭취 계획을 세워보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Synergy Cards */}
      <section className="section-container mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rows.map((item: any) => (
            <div key={item.id} className="premium-card p-10 group relative overflow-hidden">
              {/* Decorative Icon */}
              <div className="absolute top-0 right-0 p-8 text-slate-50/50 group-hover:text-brand-50 transition-colors">
                <Microscope size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Synergy Pair</span>
                    <div className="flex items-center gap-3 text-3xl font-black text-slate-900">
                      <span>{item.name_a}</span>
                      <span className="text-brand-500">&</span>
                      <span>{item.name_b}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter border ${
                    item.synergy_type === 'GOOD' ? 'bg-brand-50 border-brand-200 text-brand-600' :
                    item.synergy_type === 'BAD' ? 'bg-rose-50 border-rose-200 text-rose-600' : 
                    'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {item.synergy_type === 'GOOD' ? '최상의 궁합' : item.synergy_type === 'BAD' ? '섭취 주의' : '일반 조합'}
                  </div>
                </div>

                <div className="mb-12">
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                    "{item.description}"
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-50">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Effectiveness</span>
                    <span className="text-xl font-black text-slate-900">{item.synergy_score * 20}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        item.synergy_type === 'GOOD' ? 'bg-brand-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${item.synergy_score * 20}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
