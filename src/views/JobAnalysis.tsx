import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles,
  ChevronRight,
  ClipboardCheck,
  Target,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { MOCK_JOB, MOCK_ANALYSIS } from '../mockData';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';

export function JobAnalysisView({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const matchScore = MOCK_ANALYSIS.matchScore;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex flex-col h-full bg-white"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => onNavigate('popup_home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Match Analysis</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={364}
                strokeDashoffset={364 - (364 * matchScore) / 100}
                strokeLinecap="round"
                className={cn("transition-all duration-1000 ease-out", getScoreColor(matchScore))}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-3xl font-bold tracking-tight", getScoreColor(matchScore))}>{matchScore}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match</span>
            </div>
          </div>
          <Badge variant={matchScore >= 80 ? 'success' : 'warning'} className="px-4 py-1">
            {matchScore >= 80 ? 'Perfect Fit' : 'Possible Fit'}
          </Badge>
        </div>

        {/* Comparison Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-400" />
                Keyword Coverage
              </h3>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {MOCK_ANALYSIS.skillsFound.length} / {MOCK_ANALYSIS.skillsFound.length + MOCK_ANALYSIS.missingKeywords.length}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {MOCK_ANALYSIS.skillsFound.map(skill => (
                <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-bold border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {skill}
                </div>
              ))}
              {MOCK_ANALYSIS.missingKeywords.map(skill => (
                <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-[11px] font-bold border border-rose-100">
                  <XCircle className="w-3.5 h-3.5" />
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <Card className="p-4 bg-slate-50 border border-slate-200">
             <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Growth Plan</h4>
             </div>
             <ul className="space-y-3">
                {MOCK_ANALYSIS.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-[11px] text-slate-600 leading-relaxed font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
             </ul>
             <Button variant="outline" size="sm" className="w-full mt-4 h-9 text-[10px] uppercase font-bold" onClick={() => onNavigate('bullet_improver')}>
                Fix Resume Bullets
             </Button>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="space-y-2 pt-4">
           <Button className="w-full justify-between h-12 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('cover_letter')}>
             <div className="flex items-center gap-3">
               <FileText className="w-4 h-4" />
               <span className="text-sm font-bold">Tailor Cover Letter</span>
             </div>
             <ChevronRight className="w-4 h-4 opacity-50" />
           </Button>
           <Button variant="outline" className="w-full justify-between h-12" onClick={() => onNavigate('recruiter_msg')}>
             <div className="flex items-center gap-3">
               <MessageSquare className="w-4 h-4 text-slate-400" />
               <span className="text-sm font-bold">Write AI Message</span>
             </div>
             <ChevronRight className="w-4 h-4 opacity-50" />
           </Button>
        </div>
      </div>
    </motion.div>
  );
}
