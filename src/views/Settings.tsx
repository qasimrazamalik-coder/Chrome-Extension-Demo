import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Key, 
  Shield, 
  Database, 
  Moon, 
  Download, 
  Trash2, 
  Check,
  ChevronRight,
  User,
  Bell,
  CreditCard
} from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';
import { useState } from 'react';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';

export function SettingsView({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const [useMockAI, setUseMockAI] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex flex-col h-full bg-white"
    >
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => onNavigate('popup_home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Settings</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* Account Quick Status */}
        <Card className="p-4 bg-slate-50 border-none shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-400" />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-900">Alex Johnson</h3>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide">FREE TIER</p>
                 </div>
              </div>
              <Badge variant="outline" className="bg-white">v1.2.0</Badge>
           </div>
           <Button className="w-full text-[10px] uppercase font-bold tracking-widest h-9 bg-blue-600 hover:bg-blue-700">
             Manage Subscription
           </Button>
        </Card>

        {/* AI Configuration */}
        <div className="space-y-3">
           <div className="flex items-center gap-2 px-1">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Engine</h3>
           </div>
           
           <Card className="divide-y divide-slate-100">
              <div className="p-4 space-y-4">
                 <Input 
                   label="Gemini API Key" 
                   type="password" 
                   placeholder="Enter your key..." 
                   defaultValue="••••••••••••••••"
                   className="bg-white"
                 />
                 <p className="text-[9px] text-slate-400 leading-relaxed font-medium">
                   Stored locally on your device. We never see your keys.
                 </p>
              </div>

              <div className="p-4 flex items-center justify-between">
                 <div>
                    <h4 className="text-xs font-bold text-slate-700">Developer Mode</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Use mock responses for testing</p>
                 </div>
                 <button 
                   onClick={() => setUseMockAI(!useMockAI)}
                   className={cn(
                     "w-9 h-5 rounded-full transition-all relative",
                     useMockAI ? "bg-blue-600" : "bg-slate-200"
                   )}
                 >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      useMockAI ? "right-1" : "left-1"
                    )} />
                 </button>
              </div>
           </Card>
        </div>

        {/* Privacy & Data */}
        <div className="space-y-3">
           <div className="flex items-center gap-2 px-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Privacy</h3>
           </div>
           
           <Card className="divide-y divide-slate-100">
              <div className="p-4 flex items-center justify-between">
                 <div>
                    <h4 className="text-xs font-bold text-slate-700">Strict Sync</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Auto-backup between devices</p>
                 </div>
                 <button 
                   onClick={() => setPrivacyMode(!privacyMode)}
                   className={cn(
                     "w-9 h-5 rounded-full transition-all relative",
                     privacyMode ? "bg-blue-600" : "bg-slate-200"
                   )}
                 >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      privacyMode ? "right-1" : "left-1"
                    )} />
                 </button>
              </div>

              <button className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                 <div>
                    <h4 className="text-xs font-bold text-slate-700">Cloud Backup</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Export all data to JSON</p>
                 </div>
                 <Download className="w-4 h-4 text-slate-400" />
              </button>

              <button className="w-full p-4 flex items-center justify-between text-left hover:bg-rose-50 group transition-colors">
                 <div>
                    <h4 className="text-xs font-bold text-rose-600">Factory Reset</h4>
                    <p className="text-[10px] text-rose-300 font-medium">Wipe all local data</p>
                 </div>
                 <Trash2 className="w-4 h-4 text-rose-200 group-hover:text-rose-500 transition-colors" />
              </button>
           </Card>
        </div>

        {/* Footer info */}
        <div className="text-center py-6 space-y-1">
           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Build 2024.1102.A</p>
        </div>
      </div>
    </motion.div>
  );
}
