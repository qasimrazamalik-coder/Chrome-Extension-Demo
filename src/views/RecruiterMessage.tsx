import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Copy, 
  Send, 
  Check, 
  Linkedin, 
  Mail, 
  UserCircle,
  ExternalLink,
  RefreshCcw,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { MOCK_JOB, MOCK_USER } from '../mockData';
import { useState, useEffect } from 'react';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';
import { generateText } from '../lib/gemini';

export function RecruiterMessage({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const [platform, setPlatform] = useState<'linkedin' | 'email'>('linkedin');
  const [version, setVersion] = useState<'short' | 'detailed'>('short');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generateMessage = async (p: 'linkedin' | 'email', v: 'short' | 'detailed') => {
    setIsGenerating(true);
    setError(null);

    const prompt = `
      Job: ${MOCK_JOB.title} at ${MOCK_JOB.company}
      Resume: ${MOCK_USER.resumes[0].content}
      Platform: ${p === 'linkedin' ? 'LinkedIn Message' : 'Email'}
      Length: ${v === 'short' ? 'Brief and punchy' : 'Professional and detailed'}

      Write a cold message or follow-up to a recruiter for this position.
      If Email, include a subject line at the top.
      The output should ONLY be the message text.
    `;

    try {
      const result = await generateText(prompt, "You are a professional networking expert. You help candidates write high-conversion outreach messages to recruiters and hiring managers.");
      setContent(result);
    } catch (err) {
      setError("Failed to generate message. Please check your AI connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateMessage(platform, version);
  }, [platform, version]);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRegenerate = () => {
    generateMessage(platform, version);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-slate-50"
    >
      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => onNavigate('job_analysis')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Outreach Assistant</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary-50 rounded-lg">
           <UserCircle className="w-3.5 h-3.5 text-primary-600" />
           <span className="text-[10px] font-bold text-primary-700">Recruiter Found</span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Platform Selection */}
        <div className="flex gap-2">
          <button 
            onClick={() => setPlatform('linkedin')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold border transition-all",
              platform === 'linkedin' ? "bg-white border-blue-200 text-blue-600 shadow-sm shadow-blue-100" : "bg-slate-50 border-transparent text-slate-400"
            )}
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
          <button 
            onClick={() => setPlatform('email')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold border transition-all",
              platform === 'email' ? "bg-white border-red-200 text-red-600 shadow-sm shadow-red-100" : "bg-slate-50 border-transparent text-slate-400"
            )}
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-1">
           <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setVersion('short')}
                className={cn("px-3 py-1 rounded text-[10px] font-bold transition-all", version === 'short' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400")}
              >
                SHORT
              </button>
              <button 
                onClick={() => setVersion('detailed')}
                className={cn("px-3 py-1 rounded text-[10px] font-bold transition-all", version === 'detailed' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400")}
              >
                DETAILED
              </button>
           </div>
           <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 text-primary-600" onClick={handleRegenerate} disabled={isGenerating}>
             <RefreshCcw className={cn("w-3 h-3", isGenerating && "animate-spin")} />
             REGENERATE
           </Button>
        </div>

        {/* Message Content */}
        <Card className="relative bg-white shadow-xl flex flex-col border-none ring-1 ring-slate-100 overflow-visible">
           <div className="p-4 pb-12">
              <div className="flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-lg">
                 <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">AI Generated for {MOCK_JOB.company}</p>
              </div>
              
              {isGenerating ? (
                <div className="space-y-3 py-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center text-center py-8 space-y-3 px-4">
                  <AlertCircle className="w-8 h-8 text-rose-500" />
                  <p className="text-xs font-bold text-slate-800">{error}</p>
                  <Button variant="outline" size="sm" onClick={handleRegenerate} className="h-8">Try Again</Button>
                </div>
              ) : (
                <div className="text-[12px] text-slate-700 font-medium leading-relaxed whitespace-pre-wrap min-h-[120px]">
                  {content}
                </div>
              )}
           </div>

           <div className="absolute -bottom-4 left-4 right-4 flex gap-2">
              <Button className="flex-1 shadow-lg h-9 bg-slate-900" onClick={handleCopy} disabled={isGenerating || !!error}>
                {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {isCopied ? 'Copied!' : 'Copy Message'}
              </Button>
              <Button className="w-12 h-9 bg-primary-600 text-white p-0 shadow-lg" title="Open LinkedIn Profile">
                <ExternalLink className="w-4 h-4" />
              </Button>
           </div>
        </Card>

        {/* Social Proof/Tips */}
        <div className="pt-8 space-y-4">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Tips for Outreach</p>
           <div className="grid grid-cols-1 gap-2">
              <div className="p-3 bg-white border border-slate-100 rounded-xl flex gap-3 items-start">
                 <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                 <p className="text-[11px] text-slate-600 font-medium leading-relaxed">Mention a specific project or value mentioned by the company recently.</p>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl flex gap-3 items-start">
                 <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                 <p className="text-[11px] text-slate-600 font-medium leading-relaxed">Always search for the "Recruiter" or "Engineering Manager" for the role.</p>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
