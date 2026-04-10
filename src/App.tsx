/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  X, 
  Plus, 
  Minus,
  Utensils,
  Heart,
  Activity,
  Baby,
  Users,
  Star
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from './data';

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-bottom border-[#5A5A40]/10 py-4 px-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white">
          <Utensils size={20} />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-[#5A5A40] leading-none">阿爸的家園</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#5A5A40]/60 mt-1">Healthy Nutrition Center</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5A5A40]/80">
        <a href="#menu" className="hover:text-[#5A5A40] transition-colors">營養菜單</a>
        <a href="#about" className="hover:text-[#5A5A40] transition-colors">關於我們</a>
        <div className="flex items-center gap-2 bg-[#5A5A40] text-white px-4 py-2 rounded-full">
          <Phone size={14} />
          <span>0906-000-923</span>
        </div>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-[#f5f5f0] pt-16 pb-24 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 bg-[#FF6321]/10 text-[#FF6321] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
          讓身體成為你想要的樣子
        </span>
        <h2 className="text-5xl md:text-7xl font-serif font-black text-[#5A5A40] leading-[1.1] mb-6">
          專屬您的<br />
          <span className="text-[#FF6321]">營養管家</span>
        </h2>
        <p className="text-lg text-[#5A5A40]/70 mb-8 max-w-md">
          不只是便當，更是對健康的承諾。根據您的需求，量身打造每一口營養。
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#menu" className="bg-[#5A5A40] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4a4a35] transition-all flex items-center gap-2 shadow-lg shadow-[#5A5A40]/20">
            立即訂餐 <ChevronRight size={18} />
          </a>
          <div className="flex items-center gap-3 px-6 py-4 bg-white border border-[#5A5A40]/10 rounded-full">
            <div className="w-10 h-10 bg-[#FF6321] rounded-full flex items-center justify-center text-white animate-pulse">
              <Star size={18} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#5A5A40]">體驗價 $49</p>
              <p className="text-[10px] text-[#5A5A40]/60">每人限體驗乙次</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3">
          <img 
            src="https://picsum.photos/seed/healthy-bento-box/800/800" 
            alt="Healthy Bento Box" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-[#5A5A40]/5 max-w-[200px] -rotate-3">
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#FF6321" color="#FF6321" />)}
          </div>
          <p className="text-sm font-medium text-[#5A5A40]">「自從吃了阿爸的便當，體脂真的下降了！」</p>
          <p className="text-[10px] text-[#5A5A40]/40 mt-2">— 忠實顧客 林小姐</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "增肌減脂": return <Activity size={20} />;
    case "調整腸胃": return <Heart size={20} />;
    case "運動營養補充": return <Activity size={20} />;
    case "孕期營養": return <Baby size={20} />;
    case "銀髮族保養": return <Users size={20} />;
    case "兒童健康長高營養": return <Star size={20} />;
    default: return <Utensils size={20} />;
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "全部") return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === itemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#5A5A40] font-sans selection:bg-[#FF6321]/20 selection:text-[#FF6321]">
      <Header />
      
      <main>
        <Hero />

        {/* Categories */}
        <section id="menu" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold mb-4">選擇您的營養目標</h3>
            <div className="w-20 h-1 bg-[#FF6321] mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setSelectedCategory("全部")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${selectedCategory === "全部" ? "bg-[#5A5A40] text-white shadow-lg" : "bg-white text-[#5A5A40]/60 hover:bg-[#5A5A40]/5 border border-[#5A5A40]/10"}`}
            >
              全部菜單
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${selectedCategory === cat ? "bg-[#5A5A40] text-white shadow-lg" : "bg-white text-[#5A5A40]/60 hover:bg-[#5A5A40]/5 border border-[#5A5A40]/10"}`}
              >
                <CategoryIcon category={cat} />
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-[#5A5A40]/5 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-serif font-bold">{item.name}</h4>
                      <span className="text-lg font-bold text-[#FF6321]">${item.price}</span>
                    </div>
                    <p className="text-sm text-[#5A5A40]/60 mb-6 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-[#5A5A40]/40 border border-[#5A5A40]/10 px-2 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full py-4 rounded-2xl bg-[#f5f5f0] text-[#5A5A40] font-bold hover:bg-[#5A5A40] hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      加入購物車 <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Info Section */}
        <section id="about" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#FF6321]/10 rounded-2xl flex items-center justify-center text-[#FF6321]">
                <MapPin size={24} />
              </div>
              <h5 className="text-xl font-serif font-bold">門市地點</h5>
              <p className="text-[#5A5A40]/60 leading-relaxed">
                台北市大同區承德路一段23號1樓<br />
                (中山捷運站 / 台北火車站旁)
              </p>
              <button className="text-sm font-bold text-[#FF6321] flex items-center gap-1 hover:gap-2 transition-all">
                開啟地圖導航 <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#FF6321]/10 rounded-2xl flex items-center justify-center text-[#FF6321]">
                <Clock size={24} />
              </div>
              <h5 className="text-xl font-serif font-bold">營業時間</h5>
              <p className="text-[#5A5A40]/60 leading-relaxed">
                週一至週五 07:30 - 11:30<br />
                其他時間請來電預約
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#FF6321]/10 rounded-2xl flex items-center justify-center text-[#FF6321]">
                <Phone size={24} />
              </div>
              <h5 className="text-xl font-serif font-bold">聯絡我們</h5>
              <p className="text-[#5A5A40]/60 leading-relaxed">
                吳秉洋 先生<br />
                0906-000-923 / 02-25236643
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#00B900] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">LINE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#5A5A40] text-white py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
            <Utensils size={20} />
            <span className="font-serif font-bold text-lg">阿爸的家園</span>
          </div>
          <p className="text-sm opacity-40">© 2026 阿爸的家園 Healthy Nutrition Center. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Button */}
      {cart.length > 0 && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#FF6321] text-white rounded-full shadow-2xl flex items-center justify-center z-[60] hover:scale-110 transition-transform"
        >
          <ShoppingBag size={24} />
          <span className="absolute -top-1 -right-1 bg-[#5A5A40] text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
            {cart.reduce((sum, i) => sum + i.quantity, 0)}
          </span>
        </motion.button>
      )}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-[#5A5A40]/5 flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold">您的購物車</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#f5f5f0] rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.map(item => (
                  <div key={item.item.id} className="flex gap-4">
                    <img src={item.item.image} alt={item.item.name} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h5 className="font-bold">{item.item.name}</h5>
                        <button onClick={() => removeFromCart(item.item.id)} className="text-[#5A5A40]/30 hover:text-red-500">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-[#5A5A40]/40 mb-3">{item.item.category}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-[#f5f5f0] px-3 py-1 rounded-full">
                          <button onClick={() => updateQuantity(item.item.id, -1)} className="hover:text-[#FF6321]"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.item.id, 1)} className="hover:text-[#FF6321]"><Plus size={14} /></button>
                        </div>
                        <span className="font-bold text-[#FF6321]">${item.item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-[#f5f5f0]/50 border-t border-[#5A5A40]/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#5A5A40]/60">總計金額</span>
                  <span className="text-3xl font-serif font-bold text-[#FF6321]">${totalAmount}</span>
                </div>
                <button className="w-full py-5 bg-[#5A5A40] text-white rounded-2xl font-bold shadow-xl shadow-[#5A5A40]/20 hover:bg-[#4a4a35] transition-all">
                  確認訂購
                </button>
                <p className="text-[10px] text-center text-[#5A5A40]/40 mt-4 uppercase tracking-widest">
                  取餐地點：台北市大同區承德路一段23號1樓
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
