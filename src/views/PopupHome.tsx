import { motion } from 'motion/react';
import { Briefcase, FileText, Send, Save, BarChart3, ChevronRight, Zap } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { MOCK_JOB, MOCK_ANALYSIS } from '../mockData';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';

export function PopupHome({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="p-4 space-y-4"
    >
      {/* Current Page Status */}
      <div className="bg-blue-50/50 rounded-lg p-2.5 border border-blue-100/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Job Post Detected</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Job Info Card */}
      <Card className="p-4 border-none shadow-sm bg-slate-50">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-slate-900 leading-tight">{MOCK_JOB.title}</h2>
          <p className="text-xs font-medium text-slate-500">{MOCK_JOB.company}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between py-2 border-y border-slate-200/50">
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">AI Match Score</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{MOCK_ANALYSIS.matchScore}%</span>
        </div>

        <div className="mt-4 space-y-2">
          <Button className="w-full justify-between h-9 text-xs" onClick={() => onNavigate('job_analysis')}>
            Start Analysis
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full h-8 px-2 text-[10px]" onClick={() => onNavigate('tracker')}>
              <Save className="w-3 h-3 mr-1" />
              Save Job
            </Button>
            <Button variant="outline" size="sm" className="w-full h-8 px-2 text-[10px]" onClick={() => window.open(MOCK_JOB.url, '_blank')}>
              <Briefcase className="w-3 h-3 mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">AI Boosters</p>
        <div className="grid grid-cols-1 gap-2">
          <button 
            onClick={() => onNavigate('cover_letter')}
            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Cover Letter</p>
              <p className="text-[10px] text-slate-400">Tailored to this post</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-blue-500" />
          </button>

          <button 
             onClick={() => onNavigate('recruiter_msg')}
            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
              <Send className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Direct Message</p>
              <p className="text-[10px] text-slate-400">InMail & Outreach</p>
            </div>
             <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-blue-500" />
          </button>
        </div>
      </div>

      {/* Tip of the day */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <p className="text-[10px] text-slate-500 italic leading-relaxed">
          <span className="font-bold text-slate-700 not-italic uppercase tracking-tighter mr-1">Tip:</span> 
          Using a tailored cover letter increases interview rates by 40%.
        </p>
      </div>
    </motion.div>
  );
}
