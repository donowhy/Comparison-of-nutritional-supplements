import { db } from '@/lib/db';
import Link from 'next/link';
import { ArrowRight, Zap, Microscope, Activity } from 'lucide-react';

export default async function Home() {
  const [rows]: any = await db.execute('SELECT keyword, title, updated_at FROM seo_pillar_pages ORDER BY updated_at DESC');
  
  const featured = rows[0];
  const others = rows.slice(1);

  return (
    <main className="pb-32">
      {/* 1. Hero Section (Premium Editorial Look) */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-50/50 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm mb-8">
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-slate-600 tracking-tight">2026 AI-DRIVEN WELLNESS DATA</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tight leading-[0.95] mb-10 text-balance">
              The Future of <br/>
              <span className="text-brand-500">Nutrition</span> Analysis.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mb-12">
              우리는 데이터로 영양제를 검증합니다. AI가 분석한 수만 개의 성분 데이터를 통해 당신에게 가장 필요한 최적의 조합을 발견하세요.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#featured" className="px-10 py-5 bg-slate-950 text-white font-bold rounded-2xl hover:bg-brand-500 transition-all flex items-center gap-3 group shadow-2xl shadow-slate-200">
                무료 리포트 확인하기 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex -space-x-3 items-center">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                ))}
                <span className="pl-6 text-sm font-bold text-slate-500">+1.2k 연구 데이터 수집됨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Article (Big Card) */}
      <section id="featured" className="section-container mt-12 scroll-mt-32">
        {featured ? (
          <Link href={`/pillar/${encodeURIComponent(featured.keyword)}`} className="group">
            <div className="premium-card p-1 md:p-2 overflow-hidden flex flex-col lg:flex-row h-full lg:h-[500px]">
              <div className="lg:w-1/2 h-64 lg:h-full bg-slate-100 rounded-[28px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-9xl">🌿</div>
              </div>
              <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-black text-brand-500 uppercase tracking-widest">Featured Report</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-xs font-bold text-slate-400">12 min read</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 group-hover:text-brand-500 transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-lg text-slate-500 mb-8 line-clamp-2">
                  #{featured.keyword} 에 대한 2026년 최신 데이터와 AI 기반의 정밀 분석 결과를 지금 바로 확인하세요.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">NL</div>
                  <div className="text-sm font-bold">NutriLab Editorial Team</div>
                </div>
              </div>
            </div>
          </Link>
        ) : null}
      </section>

      {/* 3. Grid Section */}
      <section className="section-container mt-24">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-black text-slate-950">Latest Insights</h3>
          <Link href="#" className="text-sm font-bold text-slate-400 hover:text-slate-950 transition-colors underline decoration-2 underline-offset-8">전체 보기</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {others.map((page: any) => (
            <Link key={page.keyword} href={`/pillar/${encodeURIComponent(page.keyword)}`} className="group">
              <div className="premium-card p-8 h-full flex flex-col">
                <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-8 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
                  🧬
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded text-[10px] font-black uppercase tracking-widest">Analysis</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-500 transition-colors line-clamp-2">
                  {page.title}
                </h4>
                <div className="mt-auto pt-8 flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>{new Date(page.updated_at).toLocaleDateString()}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Feature Highlights */}
      <section className="section-container mt-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-20 border-y border-slate-100">
          {[
            { icon: <Zap className="text-brand-500" />, title: "Real-time Data", desc: "쿠팡과 아이허브의 실시간 가격과 재고 데이터를 반영합니다." },
            { icon: <Microscope className="text-brand-500" />, title: "AI Validation", desc: "성분 함량과 흡수율을 Gemini 2.0 모델이 정밀하게 검증합니다." },
            { icon: <Activity className="text-brand-500" />, title: "Synergy Focus", desc: "단일 성분이 아닌 함께 먹었을 때의 시너지를 우선시합니다." },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-brand-50 rounded-2xl">{item.icon}</div>
              <h5 className="text-xl font-bold mb-3">{item.title}</h5>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
