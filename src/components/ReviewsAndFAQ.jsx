import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronDown, MessageSquare, HelpCircle, ThumbsUp } from 'lucide-react';
import { PRODUCT_DATA } from '../data/earbudsData';

export default function ReviewsAndFAQ({ lang }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="reviews" className="py-16 bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Customer Reviews Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'hi' ? 'अमेज़न वेरिफ़ाइड रिव्यूज' : 'Amazon Verified Customer Reviews'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {lang === 'hi' ? '18,450+ खुश ग्राहकों का भरोसा' : 'Trusted by 18,450+ Happy Gamers & Music Lovers'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCT_DATA.reviews.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
                    {rev.badge}
                  </span>
                </div>

                <h4 className="font-bold text-white text-base">
                  {lang === 'hi' ? rev.titleHi : rev.titleEn}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{lang === 'hi' ? rev.commentHi : rev.commentEn}"
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="font-semibold text-slate-200">{rev.name}</div>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="pt-8 border-t border-slate-800">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'hi' ? 'सामान्य सवाल और जवाब' : 'Frequently Asked Questions'}</span>
            </div>
            <h2 className="text-3xl font-black text-white">
              {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Got Questions? We Have Answers.'}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {PRODUCT_DATA.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm sm:text-base">
                    {lang === 'hi' ? faq.qHi : faq.qEn}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-200 ${openFaq === idx ? 'transform rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/50">
                    {lang === 'hi' ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
