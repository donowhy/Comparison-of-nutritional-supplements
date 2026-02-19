import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriLab 2026 | 프리미엄 영양제 분석",
  description: "AI가 분석하는 영양제 성분 시너지 가이드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100/50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-100">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Nutri<span className="text-emerald-500">Lab</span></span>
            </Link>
            <div className="hidden md:flex gap-10 text-sm font-bold text-slate-500">
              <Link href="/" className="hover:text-emerald-600 transition-colors">리포트</Link>
              <Link href="/synergy" className="hover:text-emerald-600 transition-colors">궁합 분석</Link>
            </div>
            <button className="px-6 py-2.5 bg-slate-950 text-white text-sm font-bold rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
              로그인
            </button>
          </div>
        </nav>
        <div className="pt-20 min-h-screen">
          {children}
        </div>
        <footer className="mt-40 border-t border-slate-100 bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
              <div className="max-w-sm">
                <span className="text-2xl font-bold text-slate-800">NutriLab</span>
                <p className="mt-4 text-slate-500 leading-relaxed font-medium">
                  2026년 최신 AI 기술을 활용하여 당신의 건강을 위한 가장 정밀한 영양 성분 시너지 데이터를 제공합니다.
                </p>
              </div>
              <div className="flex gap-20">
                <div>
                  <h4 className="font-bold mb-6 text-slate-900">서비스</h4>
                  <ul className="space-y-4 text-sm font-medium text-slate-500">
                    <li className="hover:text-emerald-600 cursor-pointer">성분 분석</li>
                    <li className="hover:text-emerald-600 cursor-pointer">궁합 리포트</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6 text-slate-900">법적 고지</h4>
                  <ul className="space-y-4 text-sm font-medium text-slate-500">
                    <li className="hover:text-emerald-600 cursor-pointer">이용약관</li>
                    <li className="hover:text-emerald-600 cursor-pointer">개인정보처리방침</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-400 font-bold border-t border-slate-50 pt-8">
              © {currentYear} NutriLab Research Group. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
