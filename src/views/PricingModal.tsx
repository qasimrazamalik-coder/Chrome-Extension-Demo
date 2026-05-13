import { motion } from 'motion/react';
import { 
  X, 
  Check, 
  Zap, 
  Star, 
  Award, 
  ShieldCheck, 
  Infinity,
  Sparkles
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { cn } from '../lib/utils';

export function PricingModal({ onClose }: { onClose: () => void }) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Great for occasional job seekers',
      features: ['5 Analysis per week', 'Basic Cover Letter', 'Basic Resume Sync'],
      cta: 'Current Plan',
      variant: 'outline'
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/mo',
      popular: true,
      desc: 'For hardcore applicants',
      features: ['Unlimited AI Analysis', 'Full Tailored Letters', 'ATS Scoring', 'Priority Templates'],
      cta: 'Upgrade to Pro',
      variant: 'primary'
    },
    {
      name: 'Early Access',
      price: '$29',
      period: 'once',
      desc: 'Lifetime access for early believers',
      features: ['Lifetime Updates', 'All Pro Features', 'CSV Data Export', 'Early Beta Access'],
      cta: 'Claim Liftime Deal',
      variant: 'secondary'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-slate-50 w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[600px] md:h-auto"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-400">
           <X className="w-5 h-5" />
        </button>

        {/* Info Column */}
        <div className="w-full md:w-80 bg-slate-900 p-8 text-white flex flex-col">
           <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                 <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black leading-tight tracking-tight">Unlock Your High-Speed Career.</h2>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <Check className="w-5 h-5 text-primary-400 shrink-0" />
                    <p className="text-sm text-slate-400 font-medium">Beat the ATS with metrics-driven resume bullets.</p>
                 </div>
                 <div className="flex gap-3">
                    <Check className="w-5 h-5 text-primary-400 shrink-0" />
                    <p className="text-sm text-slate-400 font-medium">Triple your response rate with tailored emails.</p>
                 </div>
                 <div className="flex gap-3">
                    <Check className="w-5 h-5 text-primary-400 shrink-0" />
                    <p className="text-sm text-slate-400 font-medium">Save 10+ hours per week on manual tailoring.</p>
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                 ))}
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Join 4,000+ users</p>
           </div>
        </div>

        {/* Plans Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-slate-50">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, idx) => (
                <Card key={plan.name} className={cn(
                  "p-6 flex flex-col h-full bg-white transition-all relative overflow-visible flex-1 min-w-[220px]",
                  plan.popular ? "ring-2 ring-primary-500 shadow-xl shadow-primary-500/10 scale-105" : "border-slate-100 shadow-sm"
                )}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg uppercase tracking-widest whitespace-nowrap">
                       Most Recommended
                    </div>
                  )}
                  
                  <div className="mb-6 space-y-1">
                    <h3 className="text-base font-black text-slate-800">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{plan.period}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium leading-tight">{plan.desc}</p>
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                     {plan.features.map(f => (
                       <li key={f} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-primary-500 mt-0.5 shrink-0" />
                          <span className="text-[11px] text-slate-600 font-bold whitespace-nowrap">{f}</span>
                       </li>
                     ))}
                  </ul>

                  <Button 
                    variant={plan.variant as any} 
                    className={cn("w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest", plan.variant === 'primary' ? "bg-primary-600" : "")}
                    disabled={idx === 0}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ))}
           </div>

           <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-6 mb-4">
                 <div className="flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4 text-slate-400" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Secure Payment</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Infinity className="w-4 h-4 text-slate-400" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase">30-day Guarantee</span>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium max-w-md mx-auto">
                By upgrading, you agree to our Terms and Privacy Policy. Subscriptions can be canceled at any time from your dashboard.
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
