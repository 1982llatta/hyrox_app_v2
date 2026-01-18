
import React, { useState } from 'react';
import { TrainingPlan, UserProfile, TrainingSession, TrainingGoal } from '../types';
import { generateTrainingPlan } from '../services/gemini';
// Add missing Trophy import
import { Sparkles, Loader2, Calendar, Clock, CheckCircle2, ChevronRight, Dumbbell, Zap, Timer, Flame, ArrowRight, Target, Activity, ShieldCheck, Trophy } from 'lucide-react';
import { SESSION_TYPE_CONFIG } from '../constants';

interface TrainingPlansProps {
  athlete: UserProfile;
  sessions: TrainingSession[];
  currentPlan: TrainingPlan | null;
  onUpdatePlan: (plan: TrainingPlan) => void;
  // Add missing onLogWorkout prop
  onLogWorkout: () => void;
}

const TrainingPlans: React.FC<TrainingPlansProps> = ({ athlete, sessions, currentPlan, onUpdatePlan, onLogWorkout }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [selectedGoal, setSelectedGoal] = useState<TrainingGoal>(TrainingGoal.RACE_PEAK);
  const [showGoalSelector, setShowGoalSelector] = useState(!currentPlan);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowGoalSelector(false);
    try {
      const newPlan = await generateTrainingPlan(athlete, sessions, selectedGoal);
      onUpdatePlan(newPlan);
      setActiveDay(0);
    } catch (error) {
      console.error("Failed to generate plan", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center space-y-12 animate-in fade-in duration-1000">
        <div className="relative inline-block">
          <div className="w-32 h-32 border-[12px] border-white rounded-[3rem] shadow-xl animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Synthesizing Protocol</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-300"></span>
            </div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Analyzing Biometric Data Flow...</p>
          </div>
        </div>
        <div className="max-w-md mx-auto p-8 bg-white/50 rounded-[2rem] border border-white italic text-xs text-gray-500 font-medium">
          "Coach Alex is correlating your last {sessions.length} sessions with current Hyrox World Championship benchmarks to identify performance gaps."
        </div>
      </div>
    );
  }

  if (showGoalSelector) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom duration-1000">
        <div className="text-center space-y-4">
           <h2 className="text-6xl font-black tracking-tighter uppercase">Objective Definition</h2>
           <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black">Define your current training focus</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(TrainingGoal).map((goal) => (
            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`p-10 rounded-[3rem] border-4 text-left transition-all group relative overflow-hidden ${
                selectedGoal === goal 
                  ? 'border-accent bg-white shadow-2xl ring-8 ring-accent/5' 
                  : 'border-transparent bg-white/50 hover:bg-white hover:border-gray-100'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${selectedGoal === goal ? 'bg-accent text-black' : 'bg-[#F7F4E9] text-gray-400'}`}>
                {goal.includes('Race') ? <Trophy size={24} /> : goal.includes('Strength') ? <Dumbbell size={24} /> : goal.includes('Aerobic') ? <Activity size={24} /> : <Zap size={24} />}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">{goal}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Target Focus</p>
              {selectedGoal === goal && <div className="absolute top-8 right-8 text-accent animate-in zoom-in"><ShieldCheck size={32} /></div>}
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-8">
           <button 
             onClick={handleGenerate}
             className="bg-[#1A1A1A] text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-accent hover:text-black transition-all flex items-center gap-4 group"
           >
             Synthesize Protocol <Sparkles size={20} className="group-hover:animate-spin" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-1000 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase">Active Protocol</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-accent uppercase tracking-widest font-black">Goal: {currentPlan?.goal}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Cycle Initiated {new Date(currentPlan!.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <button 
          onClick={() => setShowGoalSelector(true)}
          className="bg-white border border-[#E5E1D3] text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-soft hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center gap-3"
        >
          <Target size={16} /> New Objective
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Nav */}
        <div className="lg:col-span-4">
           <div className="bg-white rounded-[3rem] p-6 shadow-soft border border-gray-100">
              <div className="space-y-2">
                 {currentPlan?.days.map((day, idx) => (
                   <button
                     key={idx}
                     onClick={() => setActiveDay(idx)}
                     className={`w-full flex items-center gap-5 p-5 rounded-[2rem] transition-all group ${
                       activeDay === idx ? 'bg-[#1A1A1A] text-white shadow-xl translate-x-2' : 'hover:bg-[#F9F9F9] text-gray-600'
                     }`}
                   >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${
                        activeDay === idx ? 'bg-white/10' : (SESSION_TYPE_CONFIG as any)[day.type]?.color || 'bg-gray-100'
                      }`}>
                         {(SESSION_TYPE_CONFIG as any)[day.type]?.icon || <Calendar size={18} />}
                      </div>
                      <div className="flex-1 text-left">
                         <p className={`text-[10px] font-black uppercase tracking-widest ${activeDay === idx ? 'text-accent' : 'text-gray-400'}`}>
                           {day.day}
                         </p>
                         <p className="text-sm font-bold truncate tracking-tight">{day.title}</p>
                      </div>
                      <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeDay === idx ? 'opacity-100' : ''}`} />
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Protocol Detail */}
        <div className="lg:col-span-8">
           <div className="bg-white rounded-[3.5rem] p-12 shadow-soft border border-gray-100 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 text-[#FDFDFD] -z-0"><Activity size={200} /></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                   <div className="space-y-2">
                      <div className="flex items-center gap-3">
                         <span className="bg-accent text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                           {currentPlan?.days[activeDay].day}
                         </span>
                         <span className="text-gray-300 font-black tracking-[0.2em] text-[10px] uppercase">
                           Session Architecture
                         </span>
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
                         {currentPlan?.days[activeDay].title}
                      </h2>
                   </div>
                   <div className="bg-[#F9F9F9] p-6 rounded-[2rem] text-center border border-gray-50 min-w-[140px]">
                      <div className="flex items-center justify-center gap-2 mb-1">
                         <Clock size={16} className="text-accent" />
                         <span className="text-2xl font-black tracking-tighter">{currentPlan?.days[activeDay].duration}</span>
                      </div>
                      <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Total Workload</p>
                   </div>
                </div>

                <div className="relative z-10 flex-1 space-y-12">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Strategy Analysis</h4>
                      <p className="text-gray-600 font-medium leading-loose bg-[#F9F9F9] p-10 rounded-[2.5rem] border border-gray-50 italic text-sm">
                        "{currentPlan?.days[activeDay].description}"
                      </p>
                   </div>

                   {currentPlan?.days[activeDay].exercises && currentPlan.days[activeDay].exercises!.length > 0 && (
                     <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Exercise Sequence</h4>
                          <span className="text-[9px] font-black text-gray-300 uppercase">{currentPlan.days[activeDay].exercises!.length} MODALITIES</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {currentPlan.days[activeDay].exercises!.map((ex, i) => (
                             <div key={i} className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-accent transition-all group hover:shadow-lg">
                                <div className="w-10 h-10 rounded-xl bg-[#F9F9F9] flex items-center justify-center text-[10px] font-black group-hover:bg-accent group-hover:text-black transition-colors">
                                   {i + 1}
                                </div>
                                <span className="text-xs font-bold text-gray-700 tracking-tight leading-snug">{ex}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>

                <div className="relative z-10 pt-12 mt-12 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                         <ShieldCheck size={28} />
                      </div>
                      <div>
                         <p className="text-sm font-black uppercase tracking-tight">Log Completion</p>
                         <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Mark as Synced</p>
                      </div>
                   </div>
                   <button 
                     onClick={onLogWorkout}
                     className="bg-[#1A1A1A] text-white p-6 rounded-[2rem] hover:bg-accent hover:text-black transition-all shadow-xl group"
                   >
                      <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlans;
