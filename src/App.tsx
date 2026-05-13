import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  FileText, 
  Briefcase, 
  Settings as SettingsIcon, 
  BarChart2, 
  Zap, 
  Plus,
  LayoutDashboard,
  BrainCircuit,
  MessageSquare,
  ClipboardList,
  Send
} from 'lucide-react';
import { Card, Button, Badge } from './components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_USER, MOCK_USAGE } from './mockData';
import { cn } from './lib/utils';

// Views
import { PopupHome } from './views/PopupHome';
import { JobAnalysisView } from './views/JobAnalysis';
import { ResumeSetup } from './views/ResumeSetup';
import { CoverLetterGen } from './views/CoverLetterGen';
import { BulletImprover } from './views/BulletImprover';
import { RecruiterMessage } from './views/RecruiterMessage';
import { TrackerDashboard } from './views/TrackerDashboard';
import { SettingsView } from './views/Settings';
import { Onboarding } from './views/Onboarding';
import { PricingModal } from './views/PricingModal';

export type ActiveView = 
  | 'popup_home' 
  | 'job_analysis' 
  | 'resume_setup' 
  | 'cover_letter' 
  | 'bullet_improver' 
  | 'recruiter_msg' 
  | 'tracker' 
  | 'settings' 
  | 'onboarding'
  | 'pricing';

export default function App() {
  const [mode, setMode] = useState<'extension' | 'dashboard'>('extension');
  const [activeView, setActiveView] = useState<ActiveView>('onboarding');
  const [showPricing, setShowPricing] = useState(false);

  const navigateTo = (view: ActiveView) => setActiveView(view);

  // Layout for the Chrome Extension Preview
  const renderExtensionMode = () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-900/10 p-8">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary-500/20 blur-2xl rounded-full opacity-50" />
        <Card className="chrome-popup z-10 relative flex flex-col h-[600px] w-[320px] border-none shadow-2xl">
          {/* Extension Header */}
          <div className="px-4 py-3 bg-slate-900 flex items-center justify-between shrink-0 text-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <h1 className="text-xs font-bold tracking-tight">Copilot AI</h1>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400 hover:text-white" onClick={() => navigateTo('settings')}>
                <SettingsIcon className="w-3.5 h-3.5" />
              </Button>
              <button 
                onClick={() => setMode('dashboard')}
                className="p-1 hover:bg-white/10 rounded-full transition-colors group"
                title="Open Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Extension Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeView === 'onboarding' && <Onboarding onComplete={() => navigateTo('popup_home')} />}
              {activeView === 'popup_home' && <PopupHome onNavigate={navigateTo} />}
              {activeView === 'job_analysis' && <JobAnalysisView onNavigate={navigateTo} />}
              {activeView === 'resume_setup' && <ResumeSetup onNavigate={navigateTo} />}
              {activeView === 'cover_letter' && <CoverLetterGen onNavigate={navigateTo} />}
              {activeView === 'bullet_improver' && <BulletImprover onNavigate={navigateTo} />}
              {activeView === 'recruiter_msg' && <RecruiterMessage onNavigate={navigateTo} />}
              {activeView === 'settings' && <SettingsView onNavigate={navigateTo} />}
            </AnimatePresence>
          </div>

          {/* Extension Footer */}
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">LinkedIn Detected</span>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {MOCK_USAGE.remainingGenerations} / {MOCK_USAGE.totalGenerations} Free
                </span>
                <button 
                  onClick={() => setShowPricing(true)}
                  className="text-[10px] font-bold text-primary-600 hover:text-primary-700 bg-primary-100 px-2 py-1 rounded-md"
                >
                  UPGRADE
                </button>
             </div>
          </div>
        </Card>
      </div>
      
      {/* View Switcher Overlay for Demo */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-2xl flex flex-col gap-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Preview Mode</p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={mode === 'extension' ? 'primary' : 'outline'} 
              className="rounded-full"
              onClick={() => setMode('extension')}
            >
              Extension UI
            </Button>
            <Button 
              size="sm" 
              variant={mode === 'dashboard' ? 'primary' : 'outline'} 
              className="rounded-full"
              onClick={() => setMode('dashboard')}
            >
              Dashboard UI
            </Button>
          </div>
        </div>
      </div>

      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </div>
  );

  // Layout for the Main Dashboard
  const renderDashboardMode = () => (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden text-slate-900">
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Copilot AI</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Main</div>
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm transition-colors cursor-pointer">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-pointer" onClick={() => setActiveView('tracker')}>
            <Briefcase className="w-4 h-4" />
            Applications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-pointer" onClick={() => setActiveView('resume_setup')}>
            <FileText className="w-4 h-4" />
            Resume Profile
          </button>
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-2">Tools</div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-pointer" onClick={() => setActiveView('cover_letter')}>
            <MessageSquare className="w-4 h-4" />
            Cover Letter Gen
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-pointer" onClick={() => setActiveView('recruiter_msg')}>
            <Send className="w-4 h-4" />
            Message Writer
          </button>
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="bg-slate-900 rounded-xl p-4 text-white shadow-xl">
            <div className="text-xs text-slate-400 mb-1">Current Plan</div>
            <div className="font-bold mb-3 flex justify-between items-center text-sm">
              Free Plan 
              <Badge variant="outline" className="text-[9px] bg-blue-600 border-none text-white px-2 py-0.5">Basic</Badge>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mb-1">
              <div className="bg-blue-500 w-3/5 h-full rounded-full"></div>
            </div>
            <div className="text-[10px] text-slate-400">3 of 5 AI generations left</div>
            <button 
              onClick={() => setShowPricing(true)}
              className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-slate-400">Applications</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold">Overview</span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-slate-700">{MOCK_USER.name}</span>
                <button onClick={() => setMode('extension')} className="text-[10px] text-primary-600 font-bold hover:underline">Switch to Extension</button>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <span className="text-xs font-bold text-slate-500">AJ</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <TrackerDashboard onNavigate={navigateTo} />
        </div>
      </main>

      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
      
      {/* View Switcher Overlay for Demo */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-2xl flex flex-col gap-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Preview Mode</p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={mode === 'extension' ? 'primary' : 'outline'} 
              className="rounded-full"
              onClick={() => setMode('extension')}
            >
              Extension UI
            </Button>
            <Button 
              size="sm" 
              variant={mode === 'dashboard' ? 'primary' : 'outline'} 
              className="rounded-full"
              onClick={() => setMode('dashboard')}
            >
              Dashboard UI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return mode === 'extension' ? renderExtensionMode() : renderDashboardMode();
}
