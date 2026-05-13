import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  ExternalLink,
  Calendar,
  Building2,
  Trash2,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Briefcase,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/UI';
import { MOCK_TRACKER, MOCK_USER } from '../mockData';
import { ActiveView } from '../App';
import { cn } from '../lib/utils';

export function TrackerDashboard({ onNavigate }: { onNavigate: (v: ActiveView) => void }) {
  const stats = [
    { label: 'Applications', value: 12, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Interviews', value: 4, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Offers', value: 1, icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Waitlist', value: 2, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const getStatusVariant = (status: string): any => {
    switch (status) {
      case 'Applied': return 'default';
      case 'Interview': return 'warning';
      case 'Offer': return 'success';
      case 'Rejected': return 'error';
      default: return 'outline';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, {MOCK_USER.name.split(' ')[0]}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 flex flex-col gap-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Tracker Area */}
      <Card className="border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input placeholder="Search company or role..." className="pl-10 w-64 bg-slate-50 border-none" />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Filter className="w-3.5 h-3.5 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Company & Role</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Applied</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Step</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {MOCK_TRACKER.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.company}</p>
                        <p className="text-[11px] text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: `${item.matchScore}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{item.matchScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 uppercase">
                    {item.dateApplied || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(item.status)} className="px-2 py-0.5 low-rounded">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {item.followUpDate ? (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit uppercase tracking-wider">
                        Follow-up: {item.followUpDate}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 uppercase">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                       <Button variant="ghost" size="icon" className="w-7 h-7">
                         <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                       </Button>
                       <Button variant="ghost" size="icon" className="w-7 h-7 hover:text-red-600 hover:bg-red-50">
                         <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3 of 12 items</span>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-8 text-xs font-bold">Prev</Button>
               <Button variant="outline" size="sm" className="h-8 text-xs font-bold">Next</Button>
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="col-span-2 p-6 bg-slate-900 text-white flex justify-between items-center overflow-hidden relative">
            <div className="relative z-10 max-w-sm">
               <Badge className="bg-blue-600 text-white border-none mb-4">Pro Feature</Badge>
               <h3 className="text-xl font-bold mb-2">Automate your hunt with Browser Auto-tracker</h3>
               <p className="text-slate-400 text-sm mb-4">Instantly save jobs from LinkedIn, Indeed, and more with our Chrome extension.</p>
               <Button className="bg-white text-slate-900 border-none hover:bg-slate-100 text-xs font-bold">Install Extension</Button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-600/10 skew-x-12 translate-x-10" />
            <Zap className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-32 h-32 text-white/5" />
         </Card>
         
         <Card className="p-6">
            <h3 className="font-bold mb-4 text-sm tracking-tight text-slate-800">Job Search Health</h3>
            <div className="space-y-4">
               <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                     <span>App Frequency</span>
                     <span className="text-blue-600 font-bold">Weekly</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className="w-[65%] h-full bg-blue-600" />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                     <span>Interview Ratio</span>
                     <span className="text-emerald-600 font-bold">1:4</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className="w-[25%] h-full bg-emerald-500" />
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </motion.div>
  );
}
