import React, { useState } from 'react';
import { Palette, Check, Sparkles, ShoppingCart, ArrowRight } from 'lucide-react';
import { AMAZON_PRODUCT_URL, PRODUCT_DATA } from '../data/earbudsData';

export default function EarbudsColorCustomizer({ lang }) {
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0]);

  return (
    <section id="customizer" className="py-16 bg-gradient-to-b from-[#0B0F19] via-[#0E1422] to-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'hi' ? '360° कलर वेरिएंट्स' : 'Color Variants Showcase'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {lang === 'hi' ? 'अपना पसंदीदा स्टाइल चुनें' : 'Choose Your Gaming Style'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'hi' 
              ? 'चार प्रीमियम मैट और ग्लास फिनिश रंगों में उपलब्ध - अपनी पर्सनालिटी के अनुसार चुनें।' 
              : 'Available in four premium matte and metallic LED finishes. Pick the one that fits your aesthetic.'}
          </p>
        </div>

        {/* Customizer Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Visual Product Frame */}
          <div className="lg:col-span-7 relative">
            <div className={`p-8 rounded-3xl bg-gradient-to-b ${selectedColor.bgGradient} border border-slate-700/80 shadow-2xl relative overflow-hidden transition-all duration-500`}>
              
              {/* LED Glow Behind Product */}
              <div 
                className="absolute inset-0 opacity-30 blur-3xl pointer-events-none transition-all duration-500" 
                style={{ backgroundColor: selectedColor.accent }}
              />

              <img
                src={selectedColor.image}
                alt={selectedColor.nameEn}
                className="w-full h-80 object-contain rounded-2xl relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />

              {/* Active Color Badge */}
              <div className="mt-6 flex items-center justify-between relative z-10 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <span 
                    className="w-4 h-4 rounded-full ring-2 ring-white/40"
                    style={{ backgroundColor: selectedColor.hex }} 
                  />
                  <span className="font-bold text-white text-sm">
                    {lang === 'hi' ? selectedColor.nameHi : selectedColor.nameEn}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {lang === 'hi' ? 'स्टॉक में उपलब्ध' : 'In Stock on Amazon'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Palette Selector Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              <h3 className="text-xl font-bold text-white">
                {lang === 'hi' ? 'कलर वेरिएंट चुनें' : 'Select Color Finish'}
              </h3>

              {/* Color Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {PRODUCT_DATA.colors.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3.5 rounded-2xl flex items-center gap-3 border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-slate-800 border-cyan-400 ring-2 ring-cyan-400/20' 
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span 
                        className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center shrink-0 shadow"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </span>
                      <div className="text-left overflow-hidden">
                        <div className="text-xs font-bold text-white truncate">
                          {lang === 'hi' ? color.nameHi : color.nameEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Price & Buy Button for Selected Color */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-400 text-xs">{lang === 'hi' ? 'अमेज़न स्पेशल प्राइस' : 'Amazon Offer Price'}</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-cyan-300">₹{PRODUCT_DATA.discountPrice}</span>
                    <span className="text-xs text-slate-500 line-through ml-2">₹{PRODUCT_DATA.originalPrice}</span>
                  </div>
                </div>

                <a
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4 fill-slate-950" />
                  <span>
                    {lang === 'hi' 
                      ? `${selectedColor.nameHi} अमेज़न पर लें` 
                      : `Order ${selectedColor.nameEn} on Amazon`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
