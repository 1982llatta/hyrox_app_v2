
import React from 'react';
import { TrainingSession } from '../types';
import { SESSION_TYPE_CONFIG } from '../constants';
import { MoreHorizontal, Calendar, Clock, BarChart2 } from 'lucide-react';

interface HistoryProps {
  sessions: TrainingSession[];
  onDelete?: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ sessions, onDelete }) => {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-1000">
        <div className="w-20 h-20 bg-[#1A1A1A] rounded-3xl flex items-center justify-center mb-6 text-gray-600 border border-[#262626]">
          <BarChart2 size={40} />
        </div>
        <h2 className="text-xl font-bold mb-2">No Workouts Yet</h2>
        <p className="text-gray-500 max-w-xs">Start your training journey and see your history build up here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Workout History</h2>
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold mt-1">Consistency is the path to victory</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#1A1A1A] border border-[#262626] rounded-xl text-xs font-bold hover:border-accent transition-all">Filter</button>
          <button className="px-4 py-2 bg-[#1A1A1A] border border-[#262626] rounded-xl text-xs font-bold hover:border-accent transition-all">Export</button>
        </div>
      </div>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className="bg-[#141414] p-6 rounded-[2rem] border border-[#262626] flex items-center gap-6 hover:bg-[#1A1A1A] hover:border-accent/30 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${SESSION_TYPE_CONFIG[session.session_type].color}`}>
              {SESSION_TYPE_CONFIG[session.session_type].icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-bold text-lg">{SESSION_TYPE_CONFIG[session.session_type].label}</h4>
                <span className="text-[10px] bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 rounded text-gray-500 font-bold uppercase tracking-wider">
                  {session.intensity_level}/10 Intensity
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" /> {new Date(session.workout_date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-accent" /> {session.duration_minutes} min</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Performance</p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-[#0C0C0C] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-1000 ease-out" 
                      style={{ width: `${session.performance_score}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-accent">{session.performance_score}%</span>
                </div>
              </div>
              <button className="p-2 text-gray-700 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
