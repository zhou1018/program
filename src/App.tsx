/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, 
  Pill, 
  Baby, 
  Activity, 
  Heart,
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  X,
  QrCode,
  Sparkles,
  PlayCircle,
  Award,
  Medal,
  Users,
  Info,
  ExternalLink,
  MessageCircle,
  Stethoscope,
  Smile,
  BellRing,
  History,
  Calendar,
  Clock,
  ArrowRight,
  Wind,
  CheckCircle2,
  Frown,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MEDICINE_GUIDE, 
  NOSE_WASH_STEPS, 
  SYMPTOMS_OPTIONS, 
  MYTHS, 
  TRAFFIC_LIGHTS,
  HEALING_MESSAGES,
  MedicineInfo
} from './constants';

// --- Components ---

type Section = 'home' | 'medicine' | 'wash' | 'tracker' | 'corner';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [babyName, setBabyName] = useState(() => localStorage.getItem('baby_name') || '宝宝');

  useEffect(() => {
    localStorage.setItem('baby_name', babyName);
  }, [babyName]);

  useEffect(() => {
    const hasSeen = localStorage.getItem('has_seen_welcome_v1');
    if (!hasSeen) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showWelcome && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleCloseWelcome();
    }
    return () => clearTimeout(timer);
  }, [showWelcome, countdown]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('has_seen_welcome_v1', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={handleCloseWelcome}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 text-center shadow-2xl border border-white/20 overflow-hidden"
            >
              {/* Progress bar for countdown */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 15, ease: "linear" }}
                  className="h-full bg-mint-600"
                />
              </div>

              <button 
                onClick={handleCloseWelcome}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-8 py-4">
                <div className="w-20 h-20 bg-mint-50 rounded-[2rem] mx-auto flex items-center justify-center text-mint-600 shadow-inner">
                  <ShieldCheck size={40} className="text-mint-600" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    陪你度过<br />
                    <span className="text-mint-600">抗敏长跑</span>
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-serif">
                    科学、专业、温暖的抗敏助手，<br />
                    陪您和宝宝一起度过这段特殊的时光。
                  </p>
                </div>

                <button 
                  onClick={handleCloseWelcome}
                  className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-all text-xs tracking-widest flex items-center justify-center gap-2 group"
                >
                  <span>开启守护之路</span>
                  <span className="opacity-40 text-[10px] bg-white/10 px-2 py-0.5 rounded-full group-hover:bg-white/20 transition-colors">
                    {countdown}s
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-bottom border-mint-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-mint-600 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Baby size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-slate-800">宝宝鼻卫士</h1>
              <p className="text-[10px] text-mint-600 font-medium tracking-wider uppercase">Medical Grade Care</p>
            </div>
          </button>
          
          <nav className="hidden md:flex items-center gap-6">
            <NavItems current={activeSection} setSection={setActiveSection} />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 pb-12">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dashboard setSection={setActiveSection} />
            </motion.div>
          )}
          {activeSection === 'medicine' && (
            <motion.div key="medicine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MedicineLib onBack={() => setActiveSection('home')} />
            </motion.div>
          )}
          {activeSection === 'wash' && (
            <motion.div key="wash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WashGuide onBack={() => setActiveSection('home')} />
            </motion.div>
          )}
          {activeSection === 'tracker' && (
            <motion.div key="tracker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SymptomTracker 
                babyName={babyName} 
                setBabyName={setBabyName} 
                onBack={() => setActiveSection('home')} 
                onShowHistory={() => setShowHistory(true)}
              />
            </motion.div>
          )}
          {activeSection === 'corner' && (
            <motion.div key="corner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ParentsCorner onBack={() => setActiveSection('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Disclaimer Bubble */}
      <div className="max-w-4xl mx-auto w-full px-4 mb-8">
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-start gap-3 shadow-sm shadow-orange-100/50">
          <AlertTriangle size={20} className="text-orange-500 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-orange-800/80 font-medium">
            免责声明：本工具基于医学循证指南开发，旨在辅助日常护理。它不能替代医生的面对面诊断。如遇病情剧变，请务必以线下医嘱为准。
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-6 px-4 mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-slate-400">
           <p className="text-[10px] font-bold tracking-widest text-slate-300">宝宝鼻卫士更懂你</p>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-mint-100 px-4 py-3 flex items-center justify-between z-50">
        <NavItems current={activeSection} setSection={setActiveSection} isMobile />
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setShowQRModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-8 text-center shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowQRModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-6 pt-4">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl mx-auto flex items-center justify-center text-orange-500 shadow-inner">
                  <QrCode size={32} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-slate-900">加入抱团抗敏群</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-serif">
                    微信扫码或搜索 <span className="font-bold text-slate-800">[抗敏小助手]</span><br />
                    专家在线指导，宝妈抱团互助
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="aspect-square bg-white rounded-xl shadow-sm flex items-center justify-center relative group">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/google-gemini" 
                      alt="QR Code"
                      className="w-full h-full p-2 opacity-80"
                    />
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] group-hover:opacity-0 transition-opacity pointer-events-none" />
                  </div>
                  <p className="mt-4 text-[10px] text-slate-400 font-medium">长按识别二维码或截图分享</p>
                </div>

                <button 
                  onClick={() => setShowQRModal(false)}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-all text-xs tracking-widest"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Timeline */}
      <HistoryTimeline isOpen={showHistory} onClose={() => setShowHistory(false)} />

      {/* Floating Action Button - Contrast Color */}
      <motion.button 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-4 bottom-24 bg-orange-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2 z-40 hover:bg-orange-600 transition-colors"
        onClick={() => setShowQRModal(true)}
      >
        <MessageCircle size={24} />
        <span className="hidden sm:inline font-bold">加入抱团抗敏群</span>
      </motion.button>
    </div>
  );
}

function NavItems({ current, setSection, isMobile = false }: { current: Section, setSection: (s: Section) => void, isMobile?: boolean }) {
  const items: { id: Section, icon: any, label: string }[] = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'medicine', icon: Pill, label: '查指南' },
    { id: 'wash', icon: PlayCircle, label: '洗鼻术' },
    { id: 'tracker', icon: Activity, label: '记成长' },
    { id: 'corner', icon: Heart, label: '心安处' },
  ];

  return items.map(item => (
    <button
      key={item.id}
      onClick={() => setSection(item.id)}
      className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${
        current === item.id ? 'text-mint-600 font-bold' : 'text-slate-400'
      }`}
    >
      <item.icon size={isMobile ? 22 : 20} strokeWidth={current === item.id ? 2.5 : 2} />
      <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
      {!isMobile && current === item.id && (
        <motion.div layoutId="nav-pill" className="w-1 h-1 bg-mint-600 rounded-full hidden md:block" />
      )}
    </button>
  ));
}

// --- Section Components ---

function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white shadow-soft rounded-full text-mint-600 text-[10px] font-bold tracking-widest uppercase border border-mint-50"
        >
          <ShieldCheck size={14} />
          <span>Evidence-Based Medicine</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-[1.1]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-600 to-baby-blue-600 font-serif">陪宝宝顺畅呼吸</span><br />
          每一夜
        </h2>

      </div>

      {/* Action Cards Grid - Bento Layout */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <HomeCard 
          icon={Activity} 
          title="宝宝记成长" 
          desc="点滴好转看得见，记录变化实时获取个性化健康建议" 
          color="bg-orange-50/50"
          iconColor="text-orange-600"
          className="col-span-2 shadow-orange-100/50"
          onClick={() => setSection('tracker')}
        />
        <HomeCard 
          icon={Heart} 
          title="家长心安处" 
          desc="你不孤单，此时此刻，全国有 1,208 位家长正和你一样在台灯下默默守护" 
          color="bg-mint-100/50"
          iconColor="text-mint-600"
          className="col-span-2 shadow-mint-100/50"
          onClick={() => setSection('corner')}
        />
        <HomeCard 
          icon={Pill} 
          title="查指南" 
          desc="用药量查指南" 
          color="bg-mint-100/50"
          iconColor="text-mint-600"
          className="col-span-1"
          onClick={() => setSection('medicine')}
        />
        <HomeCard 
          icon={PlayCircle} 
          title="洗鼻术" 
          desc="温和不哭闹" 
          color="bg-mint-100/50"
          iconColor="text-mint-600"
          className="col-span-1"
          onClick={() => setSection('wash')}
        />
      </div>

      {/* Standalone Guardian Map Banner */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="bg-mint-50/50 rounded-[2.5rem] p-8 md:p-10 text-slate-900 border border-mint-100/50 relative overflow-hidden shadow-sm group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint-400 opacity-[0.08] blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-baby-blue-400 opacity-[0.08] blur-[60px] -ml-16 -mb-16" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-slate-900">守护者地图</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                此时此刻，全国共有 <span className="font-bold text-mint-600">1,208</span> 位家长正和你一样，在台灯下默默守护宝宝。
              </p>
            </div>
          </div>
          <button 
            onClick={() => alert('抱抱！你并不孤单。')}
            className="w-full md:w-auto bg-mint-600 hover:bg-mint-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <span>发送云抱抱</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HomeCard({ icon: Icon, title, desc, color, iconColor, onClick, className = "" }: { icon: any, title: string, desc: string, color: string, iconColor: string, onClick: () => void, className?: string }) {
  return (
    <motion.button
      whileHover={{ y: -4, shadow: "0 15px 30px -5px rgb(0 0 0 / 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden group p-6 rounded-[2rem] bg-white border border-slate-100/80 shadow-sm flex flex-col justify-between text-left transition-all ${className}`}
    >
      <div className={`absolute -right-6 -top-6 w-32 h-32 ${color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="space-y-4 relative z-10">
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center ${iconColor} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-mint-600 transition-colors leading-snug">{title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">{desc}</p>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 relative z-10">
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-mint-50 group-hover:text-mint-600 transition-colors">
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.button>
  );
}

function MedicineLib({ onBack }: { onBack: () => void }) {
  const [selectedMed, setSelectedMed] = useState<MedicineInfo | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">用药指南库</h2>
          <p className="text-xs text-mint-600 font-semibold tracking-widest mt-0.5 uppercase">Evidence-Based Medicine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEDICINE_GUIDE.map(item => (
          <motion.button
            key={item.id}
            whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMed(item)}
            className="medical-card p-8 bg-white text-left flex flex-col justify-between group relative overflow-hidden transition-all border-none shadow-sm hover:ring-2 hover:ring-mint-100"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-mint-600 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400">
                     <Activity size={12} />
                     <p className="text-[10px] font-black uppercase tracking-widest leading-none">Recommended Duration</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{item.duration}</p>
                </div>
                <span className="px-4 py-1.5 bg-mint-50 text-mint-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                  {item.status}
                </span>
              </div>

              <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 flex gap-3">
                <div className="text-slate-300 shrink-0"><Info size={16} /></div>
                <p className="text-xs text-slate-500 leading-relaxed font-serif line-clamp-2 italic">
                  {item.endorsement}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between relative z-10 pt-6 border-t border-slate-50">
               <span className="text-[10px] text-mint-600 font-black uppercase tracking-widest">Detail View</span>
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-mint-50 group-hover:text-mint-600 transition-colors">
                  <ChevronRight size={16} />
               </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-mint-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity blur-3xl pointer-events-none" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedMed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMed(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-mint-600 to-baby-blue-600" />
              <button 
                onClick={() => setSelectedMed(null)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">{selectedMed.name}</h3>
                    <p className="text-[10px] text-mint-600 font-black uppercase tracking-widest mt-1">Specialized Care Guide</p>
                  </div>
                  <span className="px-4 py-1.5 bg-mint-50 text-mint-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                    {selectedMed.status}
                  </span>
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex gap-4">
                    <div className="text-mint-600 shrink-0"><MessageCircle size={20} /></div>
                    <p className="text-base text-slate-700 leading-relaxed font-serif">
                       {selectedMed.practicalTips}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">循证医学背景 Background</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-serif">
                      {selectedMed.endorsement}。建议按规定周期足量服药，切莫见好就收。
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedMed(null)}
                    className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-colors"
                  >
                    我知道了
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WashGuide({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<'intro' | 'breathing' | 'timeline'>('intro');
  const [countdown, setCountdown] = useState(10);

  // Auto-transition breathing to timeline
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === 'breathing') {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setMode('timeline');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">洗鼻舒缓导引</h2>
          <p className="text-xs text-mint-600 font-semibold tracking-widest mt-0.5 uppercase">Nose Wash Protocol</p>
        </div>
        {mode === 'timeline' && (
          <button 
            onClick={() => setMode('intro')}
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-mint-600 transition-colors"
          >
            返回准备
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {mode === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="medical-card !p-12 space-y-10 relative overflow-hidden"
          >
             <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-mint-50 rounded-[2rem] flex items-center justify-center text-mint-600 shadow-sm">
                   <Smile size={40} />
                 </div>
                 <div>
                   <span className="text-mint-600 font-black text-4xl opacity-20">00</span>
                   <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">{NOSE_WASH_STEPS[0].title}</h3>
                 </div>
               </div>
               
               <p className="text-lg text-slate-600 leading-relaxed font-serif">
                 {NOSE_WASH_STEPS[0].desc}
               </p>

               <div className="pt-4 space-y-4">
                 <button 
                   onClick={() => setMode('breathing')}
                   className="w-full py-5 bg-mint-600 text-white rounded-2xl font-bold hover:bg-mint-700 transition-all flex items-center justify-center gap-3 shadow-warm group"
                 >
                   <Wind size={20} className="group-hover:rotate-12 transition-transform" />
                   呼吸调整准备 (10s)
                 </button>
                 <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                   Breathing Adjustment Entry
                 </p>
               </div>
             </div>
             <div className="absolute -bottom-10 -right-5 text-[180px] font-black text-slate-50 pointer-events-none select-none">00</div>
          </motion.div>
        )}

        {mode === 'breathing' && (
          <motion.div 
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="medical-card !p-12 flex flex-col items-center justify-center text-center space-y-12 min-h-[450px]"
          >
            <div className="relative flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-mint-400 rounded-full blur-3xl"
              />
              <div className="w-48 h-48 border-4 border-mint-100 rounded-full flex items-center justify-center relative">
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-mint-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-5xl font-display font-black text-mint-600">{countdown}s</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-slate-900">白噪音冥想准备</h3>
              <p className="text-slate-500 font-serif leading-relaxed">
                听，那是静谧森林的呼吸声。<br />
                长吸气，慢呼气，让身体彻底放松。
              </p>
            </div>

            <div className="flex gap-1 items-end h-8">
              {[0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [`${20 + h * 10}%`, `${60 + h * 10}%`, `${20 + h * 10}%`] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 bg-mint-200 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {mode === 'timeline' && (
          <motion.div 
            key="timeline"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-mint-50/50 p-6 rounded-3xl border border-mint-100/50 flex items-center gap-4 mb-8">
               <div className="w-10 h-10 bg-mint-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                 <CheckCircle2 size={20} />
               </div>
               <p className="text-sm text-mint-800 font-bold">呼吸准备已完成，请按照以下 5 个步骤开始洗鼻</p>
            </div>

            <div className="relative pl-8 space-y-10">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100" />
              
              {NOSE_WASH_STEPS.slice(1).map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={step.id} 
                  className="relative group"
                >
                  <div className="absolute -left-8 top-0 w-7 h-7 bg-white border-2 border-mint-600 rounded-full z-10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-[10px] font-black text-mint-600">0{step.id}</span>
                  </div>
                  
                  <div className="medical-card !p-8 space-y-4 hover:shadow-warm transition-all group-hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                      <div className="w-8 h-8 rounded-lg bg-mint-50 flex items-center justify-center text-mint-600">
                        <PlayCircle size={18} />
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed font-serif">
                      {step.desc}
                    </p>
                    <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 flex gap-3">
                      <AlertTriangle size={14} className="text-orange-500 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-orange-800 font-medium leading-relaxed">
                        {step.pitfall}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <button 
                onClick={onBack}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all font-display tracking-widest text-xs"
              >
                全部完成，守护宝宝
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SymptomTracker({ babyName, setBabyName, onBack, onShowHistory }: { babyName: string, setBabyName: (n: string) => void, onBack: () => void, onShowHistory: () => void }) {
  const [level, setLevel] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [cooperationLevel, setCooperationLevel] = useState(1); // 0: Low, 1: Medium, 2: High
  const [showResult, setShowResult] = useState(false);
  const [showMedal, setShowMedal] = useState(false);
  const [starCount, setStarCount] = useState(() => parseInt(localStorage.getItem('star_count') || '0'));
  const [showStarFlow, setShowStarFlow] = useState(false);

  useEffect(() => {
    localStorage.setItem('star_count', starCount.toString());
  }, [starCount]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getStatusReport = () => {
    const hasCritical = selectedSymptoms.includes('night_cough') || level >= 2;
    if (selectedSymptoms.length > 5 || level === 3) return TRAFFIC_LIGHTS[2]; // Red
    if (hasCritical) return TRAFFIC_LIGHTS[1]; // Yellow
    return TRAFFIC_LIGHTS[0]; // Green
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    if (cooperationLevel >= 1) {
      setTimeout(() => setShowMedal(true), 1500);
    }
  };

  const handleStarClick = () => {
    setShowStarFlow(true);
    setTimeout(() => {
      setStarCount(prev => prev + 1);
      setShowStarFlow(false);
      setShowMedal(false);
      setShowResult(false);
      setLevel(1);
      setSelectedSymptoms([]);
      setCooperationLevel(1);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">宝宝记成长</h2>
          <button 
            onClick={onShowHistory}
            className="flex items-center gap-0.5 text-mint-600 text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity mt-1"
          >
            历史记录 <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl w-fit border border-slate-100">
            <input 
              type="text" 
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-transparent border-none focus:ring-0 w-24"
              placeholder="宝宝昵称"
            />
            <span className="text-[10px] text-slate-400 font-bold px-2">的小助手</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-soft border border-slate-50">
             <Award size={18} className="text-mint-600 fill-mint-600/20" />
             <span className="text-sm font-black text-slate-800">{starCount} / 7</span>
          </div>
        </div>
      </div>

      {!showResult ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Slider Card */}
          <div className="medical-card p-10 space-y-10">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">鼻塞程度 Intensity</label>
                <span className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                  level === 0 ? 'text-mint-600 bg-mint-50' :
                  level === 1 ? 'text-yellow-600 bg-yellow-50' :
                  level === 2 ? 'text-orange-600 bg-orange-50' :
                  'text-red-600 bg-red-50'
                }`}>
                  {['顺畅', '轻微', '明显', '完全用嘴'][level]}
                </span>
              </div>
              <div className="px-2 relative group pb-4">
                {/* Background track visualization */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-1.5 rounded-full bg-slate-100 overflow-hidden flex">
                  <div className="h-full bg-mint-400 w-1/4 opacity-40" />
                  <div className="h-full bg-yellow-400 w-1/4 opacity-40" />
                  <div className="h-full bg-orange-400 w-1/4 opacity-40" />
                  <div className="h-full bg-red-400 w-1/4 opacity-40" />
                </div>
                
                <input 
                  type="range" min="0" max="3" step="1" 
                  value={level} 
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                  className={`w-full h-3 transparent rounded-full appearance-none cursor-pointer relative z-10 transition-all focus:outline-none 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg 
                    ${
                      level === 0 ? '[&::-webkit-slider-thumb]:bg-mint-500' :
                      level === 1 ? '[&::-webkit-slider-thumb]:bg-yellow-500' :
                      level === 2 ? '[&::-webkit-slider-thumb]:bg-orange-500' :
                      '[&::-webkit-slider-thumb]:bg-red-500'
                    }`}
                />
                
                <div className="flex justify-between mt-4 px-1">
                  {['0', '1', '2', '3'].map((n) => (
                    <div key={n} className={`w-1 h-1 rounded-full ${parseInt(n) <= level ? 'bg-slate-300' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">主要症状 Symptoms</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SYMPTOMS_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleSymptom(opt.id)}
                    className={`px-4 py-4 rounded-2xl text-xs font-bold transition-all border text-center ${
                      selectedSymptoms.includes(opt.id)
                      ? 'bg-mint-600 text-white border-mint-600 shadow-warm'
                      : 'bg-white text-slate-500 border-slate-100 hover:border-mint-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cooperative Level Selector */}
          <div className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-soft space-y-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-800">今日小勇士表现</h3>
              <p className="text-sm text-slate-500 font-serif">记录孩子在治疗过程中的配合度</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { 
                  level: 0, 
                  label: '需要抱抱', 
                  desc: '情绪小怪兽', 
                  icon: Frown, 
                  color: 'text-orange-500 bg-orange-50', 
                  active: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_20px_40px_-5px_rgba(234,88,12,0.4)]' 
                },
                { 
                  level: 1, 
                  label: '表现很棒', 
                  desc: '听话乖宝宝', 
                  icon: Smile, 
                  color: 'text-mint-600 bg-mint-50', 
                  active: 'bg-gradient-to-br from-mint-400 to-mint-600 text-white shadow-[0_20px_40px_-5px_rgba(5,150,105,0.4)]' 
                },
                { 
                  level: 2, 
                  label: '超级英雄', 
                  desc: '勇敢不害怕', 
                  icon: Zap, 
                  color: 'text-yellow-600 bg-yellow-50', 
                  active: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-[0_20px_40px_-5px_rgba(202,138,4,0.4)]' 
                },
              ].map((opt) => (
                <button
                  key={opt.level}
                  type="button"
                  onClick={() => setCooperationLevel(opt.level)}
                  className={`flex flex-col items-center gap-4 p-5 rounded-[2.5rem] transition-all duration-500 border-4 relative group overflow-hidden ${
                    cooperationLevel === opt.level 
                    ? `${opt.active} border-white/60 scale-105 z-10 -translate-y-2` 
                    : `${opt.color} border-transparent opacity-80 hover:opacity-100 hover:bg-white`
                  }`}
                  style={{ perspective: '1200px' }}
                >
                  {/* Subtle highlight sheen for 2.5D effect */}
                  {cooperationLevel === opt.level && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                  )}

                  <motion.div 
                    animate={{ 
                      y: cooperationLevel === opt.level ? -8 : 0,
                      rotateX: cooperationLevel === opt.level ? 10 : 0,
                      rotateY: cooperationLevel === opt.level ? -10 : 0,
                      scale: cooperationLevel === opt.level ? 1.2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                      cooperationLevel === opt.level 
                      ? 'bg-white/30 text-white backdrop-blur-md shadow-inner' 
                      : 'bg-white text-inherit'
                    }`}
                  >
                    <opt.icon size={36} strokeWidth={2.5} className={cooperationLevel === opt.level ? 'drop-shadow-lg' : ''} />
                  </motion.div>
                  
                  <div className="space-y-1 relative z-10">
                    <p className={`text-sm font-black whitespace-nowrap transition-colors ${cooperationLevel === opt.level ? 'text-white' : 'text-slate-800'}`}>
                      {opt.label}
                    </p>
                    <p className={`text-[9px] font-black uppercase tracking-[0.1em] transition-colors ${cooperationLevel === opt.level ? 'text-white/70' : 'text-slate-400'}`}>
                      {opt.desc}
                    </p>
                  </div>

                  {/* 2.5D Shadow platform */}
                  {cooperationLevel === opt.level && (
                    <motion.div 
                      layoutId="active-platform"
                      className="absolute -bottom-1 left-2 right-2 h-4 bg-black/10 rounded-full blur-xl -z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-6 rounded-[2rem] shadow-xl text-lg hover:bg-slate-800 transition-all hover:tracking-widest"
          >
            提交日志并获取报告
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Status Card */}
          <div className={`medical-card p-10 border-none relative overflow-hidden ${getStatusReport().level === 'Red' ? 'bg-red-50' : getStatusReport().level === 'Yellow' ? 'bg-yellow-50' : 'bg-mint-50'}`}>
            {/* Background Icon Decoration */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              {getStatusReport().icon === 'smile' && <Smile size={240} />}
              {getStatusReport().icon === 'alert' && <AlertTriangle size={240} />}
              {getStatusReport().icon === 'alarm' && <BellRing size={240} />}
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
               <div className={`w-20 h-20 ${getStatusReport().color} rounded-3xl flex items-center justify-center text-white shrink-0 shadow-lg relative`}>
                 {getStatusReport().icon === 'smile' && <Smile size={40} />}
                 {getStatusReport().icon === 'alert' && <AlertTriangle size={40} />}
                 {getStatusReport().icon === 'alarm' && <BellRing size={40} />}
                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full animate-ping opacity-20" />
               </div>
               <div className="space-y-6 w-full">
                 <div>
                   <h3 className={`text-3xl font-display font-bold ${getStatusReport().level === 'Red' ? 'text-red-700' : getStatusReport().level === 'Yellow' ? 'text-yellow-700' : 'text-mint-800'}`}>
                     今日 {babyName} 评估报告
                   </h3>
                   <div className="flex items-center gap-2 mt-2">
                     <span className={`w-3 h-1 rounded-full ${getStatusReport().color}`} />
                     <p className="text-[10px] font-black opacity-40 uppercase tracking-[2px]">{getStatusReport().title}</p>
                   </div>
                 </div>
                 
                 <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white/50 shadow-inner">
                    <p className="text-base text-slate-800 leading-relaxed font-bold">
                      “{getStatusReport().feedback}”
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">状态指征 Indicators</p>
                     <p className="text-sm text-slate-700 leading-relaxed font-serif">{getStatusReport().indicator}</p>
                   </div>
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">专家建议 Suggestion</p>
                     <p className="text-sm text-slate-800 leading-relaxed font-bold">{getStatusReport().action}</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Results Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 medical-card p-10 text-center space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">病情好转趋势 Trend</p>
              <div className="h-32 w-full flex items-end justify-between px-4 gap-3">
                 {[40, 60, 45, 80, 70, 95].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ delay: 0.1 * i, type: "spring" }}
                     className={`w-full rounded-2xl ${i === 5 ? 'bg-mint-600' : 'bg-mint-100/50'}`}
                   />
                 ))}
              </div>
              <p className="text-sm text-slate-500 font-serif">"看来最近的护理非常有成效，继续坚持！"</p>
            </div>
            
            <div className="medical-card bg-slate-900 border-none p-10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                <Smile size={32} />
              </div>
              <p className="text-white font-bold leading-tight">坚持就是胜利</p>
              <p className="text-slate-400 text-xs leading-relaxed">每一个细心的动作，都在为宝宝的呼吸森林添砖加瓦。</p>
            </div>
          </div>

          <button 
            onClick={() => setShowResult(false)}
            className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-all text-xs tracking-widest"
          >
            MODFY RECORD
          </button>
        </motion.div>
      )}

      {/* Gamification Overlay */}
      <AnimatePresence>
        {showMedal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden"
            >
              <div className="relative z-10 space-y-8">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-32 h-32 bg-mint-50 rounded-[2.5rem] mx-auto flex items-center justify-center text-mint-600 shadow-inner relative"
                >
                  <Baby size={64} fill="currentColor" />
                  <motion.div 
                    animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-3 -right-3 bg-mint-600 text-white p-3 rounded-full shadow-lg"
                  >
                    <ShieldCheck size={28} fill="currentColor" />
                  </motion.div>
                </motion.div>
                
                <div className="space-y-3">
                  <h3 className="text-3xl font-display font-bold text-slate-900 leading-tight">哇！捕获一颗勇气星星！</h3>
                  <p className="text-slate-500 font-serif text-sm leading-relaxed px-4">
                    “{babyName}” 小英雄，你今天勇敢地打败了鼻涕怪！快伸出手指，点亮这枚“呼吸勋章”，把它存进你的宝库吧！
                  </p>
                </div>

                <div className="pt-8">
                  {!showStarFlow && (
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleStarClick}
                      className="w-24 h-24 bg-mint-600 rounded-full mx-auto flex items-center justify-center text-white shadow-warm border-4 border-white animate-pulse"
                    >
                      <Award size={44} fill="currentColor" />
                    </motion.button>
                  )}
                  {showStarFlow && (
                    <motion.div 
                      layoutId="star"
                      className="w-24 h-24 bg-mint-600 rounded-full mx-auto flex items-center justify-center text-white"
                    >
                       <Award size={44} fill="currentColor" />
                    </motion.div>
                  )}
                  <p className="text-[10px] text-slate-400 mt-6 uppercase font-black tracking-[3px]">Tap to Collect</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Weekend Coupon (Mock) */}
      <AnimatePresence>
        {starCount >= 7 && (
           <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-900/50 backdrop-blur-md" />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="relative bg-white p-1 rounded-3xl overflow-hidden shadow-2xl"
             >
               <div className="bg-mint-600 p-8 text-center text-white space-y-4">
                 <h3 className="text-3xl font-bold">全明星大满贯！</h3>
                 <p className="text-mint-100">“不可思议！你已经连续守护了‘鼻子森林’ 7 天。现在的你，拥有最强大的呼吸力量！”</p>
               </div>
               <div className="p-8 text-center space-y-6">
                 <div className="py-6 border-2 border-dashed border-mint-200 rounded-2xl bg-mint-50">
                   <p className="text-4xl font-display font-bold text-mint-600 tracking-tighter">超级愿望奖励</p>
                   <p className="text-xs font-bold text-mint-600/60 mt-2">快找爸爸/妈妈领取你的超级愿望吧！</p>
                 </div>
                 <button 
                  onClick={() => setStarCount(0)}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg"
                 >
                   领取并重新开始
                 </button>
               </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PitfallsSection({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-display font-bold text-slate-900">避坑清单</h2>
        <div className="text-[10px] text-mint-600 font-black tracking-widest uppercase">Evidence-Based TRUTH</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MYTHS.map((myth, i) => (
          <div key={i} className="medical-card p-10 bg-white border-slate-50 relative overflow-hidden group">
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                  <X size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">流言 Myth</p>
                  <h4 className="text-xl font-bold text-slate-900 leading-tight">{myth.q}</h4>
                </div>
              </div>
              <div className="bg-mint-50/50 p-6 rounded-2xl border border-mint-100 flex gap-4">
                <div className="text-mint-600 shrink-0"><ShieldCheck size={20} /></div>
                <div className="space-y-1">
                  <p className="text-[10px] text-mint-600 font-black uppercase tracking-widest">真相 Truth</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-serif">{myth.a}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <ShieldCheck size={120} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ParentsCorner({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-16 pb-12"
    >
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 space-y-1">
            <span className="block text-mint-600 text-[10px] font-black tracking-[4px] uppercase mb-2">Parent's Sanctuary</span>
            家长心安处
          </h2>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block">
           Sharing is healing
        </div>
      </div>

      {/* Healing Barrage - Staggered Rows */}
      <div className="relative h-64 overflow-hidden -mx-4 flex flex-col justify-center gap-4">
        {[
          { speed: 45, direction: 'normal', color: 'bg-mint-50/80', offset: '0%' },
          { speed: 35, direction: 'reverse', color: 'bg-slate-50/80', offset: '10%' },
          { speed: 55, direction: 'normal', color: 'bg-mint-100/50', offset: '5%' }
        ].map((row, rowIdx) => (
          <div key={rowIdx} className="relative h-14 w-full">
            <motion.div 
              animate={{ x: row.direction === 'normal' ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: row.speed, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 items-center whitespace-nowrap absolute top-0 left-0"
              style={{ marginLeft: row.offset }}
            >
              {[...HEALING_MESSAGES, ...HEALING_MESSAGES].map((msg, i) => (
                <div 
                  key={i} 
                  className={`${row.color} backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-mint-100/30 text-sm text-slate-700 font-serif`}
                >
                   {msg}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Section 1: Science vs Guilt - HORIZONTAL */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-mint-600" />
            <h4 className="font-black text-slate-400 uppercase tracking-[3px] text-[10px]">病因溯源</h4>
          </div>
          <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1">
            Swipe <ChevronRight size={10} />
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 no-scrollbar snap-x snap-mandatory -mx-4 sm:mx-0">
          {[
            { title: "文明的副作用", content: "随着城市化和卫生条件的改善，免疫系统因为“太闲”而变得过于敏感。这不是你的错，而是进化的代价。" },
            { title: "卫生假说", content: "科学研究表明，越是干净的环境，过敏概率越高。家长无需过度自责照顾不周。" },
            { title: "长跑预期", content: "免疫系统在 3、6、12 岁会经历质的飞跃。我们是在陪孩子稳步跑过这段发育“阵痛期”。" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="min-w-[280px] sm:min-w-[320px] snap-center"
            >
              <QuoteCard title={item.title} content={item.content} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 2: Traffic Light Cards - HORIZONTAL */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-mint-600" />
            <h4 className="font-black text-slate-400 uppercase tracking-[3px] text-[10px]">症状红绿灯</h4>
          </div>
          <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Health Indicators</div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 no-scrollbar snap-x snap-mandatory -mx-4 sm:mx-0">
          {TRAFFIC_LIGHTS.map((light, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -5 }}
               className="min-w-[300px] sm:min-w-[350px] snap-center medical-card !p-8 flex flex-col justify-between space-y-8 relative overflow-hidden"
             >
                <div className={`absolute top-0 right-0 w-32 h-32 ${light.color} opacity-5 rounded-full blur-3xl -mr-16 -mt-16`} />
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${light.color} rounded-2xl shadow-lg flex items-center justify-center text-white ring-4 ring-white/50`}>
                      {light.icon === 'smile' && <Smile size={24} />}
                      {light.icon === 'alert' && <AlertTriangle size={24} />}
                      {light.icon === 'alarm' && <BellRing size={24} />}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xl">{light.title}</h5>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed font-serif">{light.indicator}</p>
                    <p className="text-sm text-slate-800 font-bold leading-relaxed">{light.action}</p>
                  </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>

      {/* Final Support Banner */}
      <div className="bg-mint-600 rounded-[3rem] p-10 text-center text-white space-y-6 relative overflow-hidden shadow-xl">
         <div className="relative z-10 space-y-2">
            <h4 className="text-3xl font-display font-bold">我不孤单</h4>
            <p className="opacity-90 max-w-sm mx-auto text-sm leading-relaxed">
              在这个宁静的深夜，全国共有 <span className="font-bold">1,208</span> 位家长正和你一样，在台灯下守护宝宝。在这场抗敏长跑里，你从来不是一个人。
            </p>
         </div>
         <button 
           onClick={() => alert('已向全国 1,208 位家长发送了你的温暖拥抱！')}
           className="relative z-10 bg-white text-mint-600 px-10 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform text-sm active:scale-95"
         >
           点击发送一个云抱抱
         </button>
         {/* Background pattern */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 scale-150"><Users size={120} /></div>
         </div>
      </div>
    </motion.div>
  );
}

{/* History Timeline Component */}
function HistoryTimeline({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-0 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-mint-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-mint-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <History size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900">守护历程</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Growth History Timeline</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-slate-900 transition-colors bg-white rounded-xl shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {[
                { date: '今天', time: '09:30', status: '好转中', level: '轻微', symptoms: ['清鼻涕'], action: '建议继续洗鼻', color: 'bg-mint-500', icon: Smile },
                { date: '2024.05.05', time: '20:15', status: '较重', level: '明显', symptoms: ['黄脓涕', '夜咳'], action: '建议配合口服药', color: 'bg-yellow-500', icon: AlertTriangle },
                { date: '2024.05.04', time: '08:45', status: '严重', level: '完全用嘴', symptoms: ['鼻塞严重', '夜咳', '发热'], action: '建议及时就医', color: 'bg-red-500', icon: BellRing },
                { date: '2024.05.03', time: '19:20', status: '平稳', level: '轻微', symptoms: ['偶见喷嚏'], action: '坚持生理盐水喷雾', color: 'bg-mint-500', icon: Smile },
              ].map((log, i) => (
                <div key={i} className="relative pl-10 group">
                  {i !== 3 && (
                    <div className="absolute left-[1.125rem] top-10 bottom-[-2.5rem] w-0.5 bg-slate-100" />
                  )}
                  
                  <div className={`absolute left-0 top-0 w-9 h-9 rounded-xl ${log.color} flex items-center justify-center text-white shadow-lg z-10 scale-90 group-hover:scale-100 transition-transform`}>
                    <log.icon size={18} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-900">{log.date}</span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {log.time}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white ${log.color}`}>
                        {log.status}
                      </span>
                    </div>

                    <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 space-y-3 group-hover:bg-white group-hover:shadow-soft transition-all">
                      <div className="flex flex-wrap gap-2">
                        {log.symptoms.map((s, si) => (
                          <span key={si} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-600 font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-start gap-2 pt-2 border-t border-slate-200/50">
                        <div className="text-mint-600 mt-0.5"><Info size={12} /></div>
                        <p className="text-[11px] text-slate-700 leading-relaxed font-serif">
                          <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 block mb-1">建议 Suggestion</span>
                          {log.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-slate-100 bg-white">
              <button 
                onClick={onClose}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-slate-800 transition-all text-sm tracking-widest flex items-center justify-center gap-2"
              >
                继续守护宝宝
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function QuoteCard({ title, content }: { title: string, content: string }) {
  return (
    <div className="medical-card border-mint-100/30 p-10 space-y-6 bg-white flex flex-col justify-between h-full hover:bg-mint-50/10 transition-colors group">
      <div className="space-y-4">
        <h5 className="font-display font-bold text-slate-900 text-xl border-b border-mint-100/50 pb-4 group-hover:text-mint-600 transition-colors leading-tight">{title}</h5>
        <p className="text-sm text-slate-500 leading-relaxed font-serif">
          “{content}”
        </p>
      </div>
      <div className="flex justify-end pt-2">
        <ShieldCheck size={16} className="text-mint-100 group-hover:text-mint-600 transition-colors" />
      </div>
    </div>
  );
}
