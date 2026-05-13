import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  BrainCircuit, 
  FileSearch, 
  Sparkles,
  ChevronRight,
  Linkedin,
  Rocket
} from 'lucide-react';
import { Button, Card } from '../components/UI';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Copilot",
      desc: "Apply smarter. Tailor applications directly from any job post with AI-powered insights.",
      icon: BrainCircuit,
      color: "text-primary-600",
      bg: "bg-primary-50"
    },
    {
      title: "Sync Your Resume",
      desc: "Paste or upload your current resume. We'll use it as the base for all tailoring.",
      icon: FileSearch,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "One-Click Context",
      desc: "Open any job board like LinkedIn. Our AI will automatically detect the role and company.",
      icon: LinkIcon,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Ready to Spark?",
      desc: "Join thousands of job seekers who landed interviews using AI-powered insights.",
      icon: Sparkles,
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    }
  ];

  const current = steps[step];

  return (
    <div className="h-full bg-white flex flex-col p-6 text-center">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Progress dots */}
        <div className="flex gap-1.5">
           {steps.map((_, i) => (
             <div key={i} className={cn("h-1 rounded-full transition-all duration-300", step === i ? "w-8 bg-primary-600" : "w-2 bg-slate-100")} />
           ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn("w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl relative", current.bg)}>
            <current.icon className={cn("w-10 h-10", current.color)} />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
               <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="space-y-3 px-4">
             <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{current.title}</h2>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">{current.desc}</p>
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        <Button 
          className="w-full py-6 text-base font-black rounded-2xl shadow-xl shadow-primary-500/20"
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
        >
          {step === steps.length - 1 ? 'Start Matching' : 'Next Step'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
        {step < steps.length - 1 && (
          <button onClick={onComplete} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest py-2">
            Skip Onboarding
          </button>
        )}
      </div>
    </div>
  );
}

function LinkIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
}
