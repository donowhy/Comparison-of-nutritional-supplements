import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Share2, Bookmark } from 'lucide-react';

export default async function PillarPage({ params }: { params: { keyword: string } }) {
  const keyword = decodeURIComponent(params.keyword);
  const [rows]: any = await db.execute(
    'SELECT * FROM seo_pillar_pages WHERE keyword = ?', 
    [keyword]
  );

  const page = rows[0];
  if (!page) notFound();

  return (
    <article className="pb-32">
      {/* Article Header */}
      <header className="pt-24 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 text-brand-500 font-black text-xs uppercase tracking-widest mb-8">
            <span className="px-2 py-0.5 bg-brand-50 rounded">In-depth Analysis</span>
            <span>•</span>
            <span>Nutrition & Synergy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 mb-10 leading-[1.1] text-balance">
            {page.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">NL</div>
              <div>
                <div className="font-bold text-slate-900">NutriLab Editorial Team</div>
                <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(page.updated_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 12 min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"><Share2 size={18} /></button>
              <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"><Bookmark size={18} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 pt-20">
        {/* Gemini가 생성한 HTML이 여기에 렌더링됨 */}
        <div 
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: page.content_html }} 
        />

        {/* Disclaimer */}
        <div className="mt-32 p-10 bg-slate-900 rounded-[40px] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-brand-500">Notice</span> Medical Disclaimer
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              본 콘텐츠는 정보 제공을 목적으로 하며 의학적 진단이나 치료를 대신할 수 없습니다. 
              새로운 영양제 섭취 전 반드시 전문 의료진과 상의하십시오. 데이터 분석 과정에서 AI가 활용되었으며, 
              일부 제휴 링크를 통해 수익이 발생할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
