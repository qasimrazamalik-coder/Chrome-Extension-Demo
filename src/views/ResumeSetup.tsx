import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Upload, 
  Clipboard, 
  Check, 
  FileText, 
  Trash2, 
  Plus,
  Rocket
} from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';
import { MOCK_USER } from '../mockData';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';

export function ResumeSetup({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const [resumeContent, setResumeContent] = useState(MOCK_USER.resumes[0].content);
  const [isSaved, setIsSaved] = useState(false);
  const [fileName, setFileName] = useState('Software_Eng_Resume.pdf');
  const fileInputRef = useState<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // In a real app, we'd parse the file here
      setResumeContent(`Content extracted from ${file.name}...\n\nExperience: Senior Software Engineer\nSkills: React, TypeScript, AI...`);
    }
  };

  const triggerFileUpload = () => {
    document.getElementById('resume-upload')?.click();
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-slate-50"
    >
      <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 bg-white sticky top-0 z-10 backdrop-blur">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => onNavigate('popup_home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Resume Profile</span>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card className="p-4 bg-white space-y-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center border-2 border-white shadow-sm">
                <span className="text-sm font-bold text-primary-700">AJ</span>
             </div>
             <div>
                <h3 className="text-sm font-bold text-slate-800">{MOCK_USER.name}</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{MOCK_USER.preferredRole}</p>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
             <Input label="Desired Role" defaultValue={MOCK_USER.preferredRole} />
             <div className="space-y-1.5">
               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</label>
               <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                 <option>Entry</option>
                 <option>Mid</option>
                 <option selected>Senior</option>
                 <option>Lead</option>
               </select>
             </div>
           </div>
        </Card>

        {/* Resume Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Resume</h3>
             <input 
               type="file" 
               id="resume-upload" 
               className="hidden" 
               accept=".pdf,.docx,.doc" 
               onChange={handleFileUpload}
             />
             <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-blue-600 uppercase" onClick={triggerFileUpload}>
               <Upload className="w-3 h-3 mr-1" />
               Upload New
             </Button>
          </div>
          
          <Card className="p-0 overflow-hidden border-2 border-dashed border-slate-200 bg-white">
            {!resumeContent ? (
              <div 
                className="flex flex-col items-center justify-center py-10 px-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={triggerFileUpload}
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm font-bold text-slate-700">Drop your resume here</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Supports PDF, DOCX (Max 10MB)</p>
                <Button variant="outline" size="sm" className="mt-4 h-8 text-[10px] uppercase font-black tracking-widest">
                  Browse Files
                </Button>
              </div>
            ) : (
              <>
                <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-600 truncate">{fileName}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => {setResumeContent(''); setFileName('');}}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <textarea 
                  className="w-full h-48 p-4 text-[11px] text-slate-600 font-medium leading-relaxed focus:outline-none resize-none bg-white font-mono"
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                  placeholder="Paste your resume text here for AI analysis..."
                />
                <div className="p-2 bg-slate-50 flex items-center justify-between border-t border-slate-100/50">
                  <span className="text-[9px] text-slate-400 font-medium">Last updated: May 12, 2024</span>
                  <Button size="sm" className="h-8 py-0 bg-blue-600 hover:bg-blue-700 font-bold text-[10px] uppercase" onClick={handleSave}>
                    {isSaved ? <Check className="w-3.5 h-3.5 mr-1" /> : <SaveIcon className="w-3.5 h-3.5 mr-1" />}
                    {isSaved ? 'Saved!' : 'Save changes'}
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Skills Tags */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">Core Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {MOCK_USER.skills.map(skill => (
              <Badge key={skill} variant="outline" className="bg-white hover:bg-slate-50 cursor-default">
                {skill}
                <button className="ml-1 text-slate-300 hover:text-red-400">×</button>
              </Badge>
            ))}
            <button className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-dashed border-slate-300 text-slate-400 hover:border-primary-500 hover:text-primary-500">
              + Add Skill
            </button>
          </div>
        </div>

        <div className="pt-4">
           <Card className="p-4 bg-primary-600 text-white border-none relative overflow-hidden">
             <div className="relative z-10 space-y-1">
                <h4 className="text-sm font-black">All set, Alex!</h4>
                <p className="text-[11px] text-primary-100 leading-tight">Your profile is ready. Go to any job post to start tailoring applications.</p>
                <div className="pt-3">
                  <Button variant="secondary" className="w-full bg-white text-primary-700 font-bold" onClick={() => onNavigate('popup_home')}>
                    Back to Copilot
                    <Rocket className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
             </div>
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500 rounded-full blur-3xl opacity-50" />
           </Card>
        </div>
      </div>
    </motion.div>
  );
}

function SaveIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
}
