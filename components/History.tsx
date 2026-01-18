
import React from 'react';
import { TrainingSession } from '../types';
import { SESSION_TYPE_CONFIG } from '../constants';
import { MoreHorizontal, Calendar, Clock, BarChart2, ArrowRight } from 'lucide-react';

interface HistoryProps {
  sessions: TrainingSession[];
  onDelete?: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ sessions }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase">Session Logs</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-2">Historical data extraction</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white px-6 py-3 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 shadow-sm transition-all">Filter logs</button>
           <button className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-accent hover:text-black">Export data</button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-4 shadow-soft border border-gray-100">
        <div className="overflow-hidden">
          {sessions.length === 0 ? (
            <div className="py-20 text-center space-y-4">
               <div className="w-20 h-20 bg-[#F7F4E9] rounded-full mx-auto flex items-center justify-center text-gray-300"><BarChart2 size={32} /></div>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No protocol entries found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              {sessions.map((session) => (
                <div 
                  key={session.id} 
                  className="flex items-center gap-8 p-8 rounded-[2rem] hover:bg-[#F7F4E9]/50 transition-all cursor-pointer group border border-transparent hover:border-gray-200"
                >
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-sm ${SESSION_TYPE_CONFIG[session.session_type].color}`}>
                    {SESSION_TYPE_CONFIG[session.session_type].icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="font-bold text-lg tracking-tight">{SESSION_TYPE_CONFIG[session.session_type].label}</h4>
                      <span className="text-[9px] bg-accent/20 px-2 py-0.5 rounded-full font-black uppercase">Level {session.intensity_level}</span>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Calendar size={12} className="text-accent" /> {new Date(session.workout_date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-2"><Clock size={12} className="text-accent" /> {session.duration_minutes} MIN</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="text-right">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Performance</p>
                        <div className="flex items-center gap-3">
                           <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#1A1A1A] group-hover:bg-accent transition-all duration-1000" style={{ width: `${session.performance_score}%` }}></div>
                           </div>
                           <span className="text-xs font-black">{session.performance_score}%</span>
                        </div>
                     </div>
                     <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-accent group-hover:text-black transition-all">
                        <ArrowRight size={20} />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
