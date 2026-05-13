import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Copy, 
  Sparkles, 
  Check, 
  TrendingUp,
  RefreshCcw,
  Plus,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/UI';
import { useState, useEffect } from 'react';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';
import { generateText } from '../lib/gemini';
import { MOCK_JOB, MOCK_USER } from '../mockData';

interface BulletItem {
  original: string;
  improved: string;
  score: number;
  isGenerating?: boolean;
}

export function BulletImprover({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const [selectedBullet, setSelectedBullet] = useState<number | null>(null);
  const [bullets, setBullets] = useState<BulletItem[]>([
    {
      original: "Responsible for developing the frontend of the company dashboard using React.",
      improved: "Architected and delivered a high-performance analytics dashboard using React and TypeScript, resulting in a 35% reduction in data latency and improved user experience for 50k+ active users.",
      score: 92
    },
    {
      original: "Fixed bugs and added new features to the existing mobile app.",
      improved: "Spearheaded the optimization of the React Native mobile application, identifying and resolving 12 critical performance bottlenecks that led to a 4.8/5 app store rating.",
      score: 88
    }
  ]);
  const [newBullet, setNewBullet] = useState('');
  const [globalError, setGlobalError] = useState<string | null>(null);

  const improveBullet = async (index: number) => {
    const updatedBullets = [...bullets];
    updatedBullets[index].isGenerating = true;
    setBullets(updatedBullets);
    setGlobalError(null);

    const bulletToImprove = updatedBullets[index].original;
    
    const prompt = `
      Target Job: ${MOCK_JOB.title} at ${MOCK_JOB.company}
      Resume Context: ${MOCK_USER.resumes[0].content}
      
      Original Bullet Point: "${bulletToImprove}"
      
      Please improve this resume bullet point. It should be:
      1. Action-oriented (start with strong verbs).
      2. Metrics-driven (include quantifiable results/KPIs if possible, or estimate realistic ones).
      3. Tailored to the target job and company.
      4. ATS-friendly.

      Response format:
      Return ONLY a JSON object with the following structure:
      {
        "improved": "The improved bullet point text",
        "score": 85 (a number representing the impact score from 0-100)
      }
    `;

    try {
      const result = await generateText(prompt, "You are an expert ATS optimization engine and resume writer. You specialize in turning weak statements into powerful, results-driven bullet points.");
      const parsed = JSON.parse(result.replace(/```json|```/g, ''));
      
      const finalizedBullets = [...bullets];
      finalizedBullets[index] = {
        ...finalizedBullets[index],
        improved: parsed.improved,
        score: parsed.score,
        isGenerating: false
      };
      setBullets(finalizedBullets);
    } catch (err) {
      setGlobalError("Failed to improve bullet. Please try again.");
      const failedBullets = [...bullets];
      failedBullets[index].isGenerating = false;
      setBullets(failedBullets);
    }
  };

  const handleAddBullet = async () => {
    if (!newBullet.trim()) return;
    
    const bulletIndex = bullets.length;
    const newItem: BulletItem = {
      original: newBullet,
      improved: '',
      score: 0,
      isGenerating: true
    };
    
    setBullets([...bullets, newItem]);
    setNewBullet('');
    setSelectedBullet(bulletIndex);
    
    await improveBullet(bulletIndex);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
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
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Bullet Improver</span>
        </div>
        <Badge variant="success">ATS Score: 85</Badge>
      </div>

      <div className="p-4 space-y-6">
        {/* Context info */}
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instructions</p>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Select a bullet point from your resume to transform into an achievement-oriented, metrics-driven statement tailored to this role.
          </p>
        </div>

        {/* Bullets List */}
        <div className="space-y-4">
          {bullets.map((bullet, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "p-4 transition-all border-2 cursor-pointer",
                selectedBullet === idx ? "border-primary-500 ring-4 ring-primary-500/5 bg-white scale-[1.02]" : "border-slate-100 bg-white hover:border-primary-200"
              )}
              onClick={() => setSelectedBullet(idx)}
            >
              <div className="space-y-3">
                 <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                       <span className="text-[10px] font-bold text-slate-500">{idx + 1}</span>
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-1">Original</p>
                       <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">"{bullet.original}"</p>
                    </div>
                 </div>

                 <div className="pt-2 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                          <p className="text-[10px] text-primary-700 font-bold uppercase tracking-tighter">AI Improved</p>
                       </div>
                       {bullet.score > 0 && <Badge variant="success" className="text-[9px] px-1.5">{bullet.score}% impact</Badge>}
                    </div>
                    
                    {bullet.isGenerating ? (
                      <div className="flex items-center gap-2 py-2">
                        <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                        <span className="text-[11px] text-slate-400 font-bold animate-pulse">Polishing your bullet...</span>
                      </div>
                    ) : (
                      <p className="text-[12px] text-slate-800 leading-relaxed font-bold">
                         {bullet.improved || "No improvement generated yet."}
                      </p>
                    )}
                 </div>

                 {selectedBullet === idx && !bullet.isGenerating && bullet.improved && (
                    <div className="flex gap-2 pt-2">
                       <Button size="sm" className="flex-1 h-8 text-[10px] bg-slate-900" onClick={() => handleCopy(bullet.improved)}>
                          <Copy className="w-3 h-3 mr-1.5" />
                          Copy Improved
                       </Button>
                       <Button variant="outline" size="sm" className="flex-1 h-8 text-[10px]" onClick={() => improveBullet(idx)}>
                        <RefreshCcw className="w-3 h-3 mr-1.5" />
                        Regenerate
                       </Button>
                    </div>
                 )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add more button */}
        <Card className="p-4 bg-slate-50 border-2 border-dashed border-slate-200">
           <div className="flex gap-2">
              <Input 
                placeholder="Paste a bullet point to improve..." 
                className="bg-white text-xs h-10"
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
              />
              <Button size="icon" className="h-10 w-10 shrink-0 bg-blue-600" onClick={handleAddBullet}>
                 <Plus className="w-5 h-5" />
              </Button>
           </div>
           {globalError && (
             <div className="mt-2 flex items-center gap-1.5 text-rose-500">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">{globalError}</span>
             </div>
           )}
        </Card>

        {/* Bottom Banner */}
        <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <h4 className="text-sm font-bold">ATS Optimized</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              These bullets are keywords-matched for the <span className="text-white font-bold">{MOCK_JOB.title}</span> role at <span className="text-white font-bold">{MOCK_JOB.company}</span>.
            </p>
            <div className="pt-2">
              <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-500 border-none">
                Update Resume in Profile
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
