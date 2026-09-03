import React from 'react';
import { Headphones, ShieldCheck, ShoppingCart, Globe, Heart } from 'lucide-react';
import { AMAZON_PRODUCT_URL } from '../data/earbudsData';

export default function EarbudsFooter({ lang, setLang, onOpenDealModal }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">LASAVO AUDIO</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {lang === 'hi'
                ? 'लासावो ऑडियो प्रो TWS ईयरबड्स - 60 घंटे की पावरफुल बैटरी, 45ms अल्ट्रा-लो गेमिंग लेटेंसी, और टाइप-सी फास्ट चार्जिंग।'
                : 'Lasavo Audio Pro TWS Earbuds - Engineered with 60 Hours Total Battery, 45ms Gaming Latency, and Quad-Mic ENC Noise Cancellation.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>1 Year Official Brand Replacement Warranty on Amazon.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {lang === 'hi' ? 'क्विक लिंक्स' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#sound-simulator" className="hover:text-cyan-400 transition-colors">Sound Test Simulator</a></li>
              <li><a href="#customizer" className="hover:text-cyan-400 transition-colors">Color Variants</a></li>
              <li><a href="#battery" className="hover:text-cyan-400 transition-colors">Battery Calculator</a></li>
              <li><a href="#comparison" className="hover:text-cyan-400 transition-colors">Spec Comparison</a></li>
              <li><a href="#reviews" className="hover:text-cyan-400 transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Amazon Order Action */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {lang === 'hi' ? 'ऑर्डर करें' : 'Buy Now'}
            </h4>
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'hi' ? 'अमेज़न पर लें (₹1,299)' : 'Buy on Amazon (₹1,299)'}</span>
            </a>
            <p className="text-[11px] text-slate-500">
              ASIN: B0CXMHP7SH • Direct Fulfillment by Amazon.in
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Lasavo Audio. All rights reserved. Amazon.in product showcase.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Gamers & Music Enthusiasts</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
