import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Copy, 
  RefreshCcw, 
  Download, 
  Send, 
  Sparkles,
  Check,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { MOCK_JOB, MOCK_USER } from '../mockData';
import { useState, useEffect } from 'react';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';
import { generateText } from '../lib/gemini';

export function CoverLetterGen({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const [tone, setTone] = useState('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generateLetter = async (selectedTone: string) => {
    setIsGenerating(true);
    setError(null);
    
    const prompt = `
      User Resume Content: ${MOCK_USER.resumes[0].content}
      Job Title: ${MOCK_JOB.title}
      Company: ${MOCK_JOB.company}
      Job Description: ${MOCK_JOB.description}
      Tone: ${selectedTone}

      Generate a tailored cover letter for this job application. Keep it around 250-300 words.
      The output should ONLY be the cover letter text.
    `;

    const systemInstruction = "You are an expert career coach and professional writer specializing in tailoring cover letters to specific job descriptions. Your goal is to highlight the candidate's strengths and match them perfectly with the company's needs.";

    try {
      const result = await generateText(prompt, systemInstruction);
      setContent(result);
    } catch (err) {
      setError("Failed to generate cover letter. Please check your AI connection.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateLetter(tone);
  }, []);

  const handleRegenerate = () => {
    generateLetter(tone);
  };

  const handleToneChange = (newTone: string) => {
    setTone(newTone);
    generateLetter(newTone);
  };

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Cover Letter</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-[9px] lowercase opacity-50">Draft v1</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Tone Selector */}
        <div className="grid grid-cols-3 gap-2">
           {['Professional', 'Friendly', 'Concise'].map(t => (
             <button
               key={t}
               onClick={() => handleToneChange(t)}
               className={cn(
                 "px-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight border transition-all",
                 tone === t 
                  ? "bg-primary-600 text-white border-primary-600 shadow-md" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-primary-300"
               )}
             >
               {t}
             </button>
           ))}
        </div>

        {/* AI Output Card */}
        <Card className="relative bg-white shadow-xl min-h-[400px] flex flex-col">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
             <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Tailored Content</span>
             </div>
             <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400" onClick={handleRegenerate} disabled={isGenerating}>
                  <RefreshCcw className={cn("w-3.5 h-3.5", isGenerating && "animate-spin")} />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400" onClick={handleCopy} disabled={isGenerating || !!error}>
                  {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
             </div>
          </div>
          
          <div className="flex-1 p-4">
            {isGenerating ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-1/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6">
                <AlertCircle className="w-8 h-8 text-rose-500" />
                <p className="text-xs font-bold text-slate-800">{error}</p>
                <Button variant="outline" size="sm" onClick={handleRegenerate} className="h-8">Try Again</Button>
              </div>
            ) : (
              <div className="text-[11px] text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-100 flex gap-2">
             <Button className="flex-1 h-9 bg-slate-900" size="sm">
               <Download className="w-3.5 h-3.5 mr-2" />
               Export PDF
             </Button>
             <Button variant="outline" className="flex-1 h-9" size="sm">
                <Send className="w-3.5 h-3.5 mr-2" />
                Easy Apply
             </Button>
          </div>
        </Card>

        {/* Pro Tip */}
        <div className="p-3 bg-primary-50 rounded-xl border border-primary-100 flex gap-3">
           <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-primary-600" />
           </div>
           <p className="text-[10px] text-primary-700 font-medium leading-relaxed">
             <span className="font-bold">Did you know?</span> Customizing just the first paragraph of your cover letter increases your chances of getting an interview by 2x.
           </p>
        </div>
      </div>
    </motion.div>
  );
}
