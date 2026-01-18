
import React, { useState } from 'react';
import { TrainingSession, SessionType } from '../types';
import { SESSION_TYPE_CONFIG } from '../constants';
import { Search, Calendar, Clock, BarChart2, ArrowRight, Filter, ChevronDown } from 'lucide-react';

interface HistoryProps {
  sessions: TrainingSession[];
  onDelete?: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ sessions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<SessionType | 'all'>('all');

  const filteredSessions = sessions.filter(session => {
    const matchesQuery = session.notes?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         SESSION_TYPE_CONFIG[session.session_type].label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || session.session_type === typeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase">Protocol History</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-2">Analytical log of all athletic outputs</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH NOTES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-accent shadow-sm"
            />
          </div>
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="appearance-none bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-accent hover:text-black cursor-pointer pr-12"
            >
              <option value="all">ALL MODALITIES</option>
              {Object.entries(SESSION_TYPE_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label.toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-4 shadow-soft border border-gray-100">
        {filteredSessions.length === 0 ? (
          <div className="py-32 text-center space-y-6">
             <div className="w-24 h-24 bg-[#F7F4E9] rounded-full mx-auto flex items-center justify-center text-gray-300"><BarChart2 size={40} /></div>
             <div className="space-y-2">
               <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">No matching protocol entries</p>
               <button onClick={() => { setSearchQuery(''); setTypeFilter('all'); }} className="text-[10px] font-black uppercase text-accent underline underline-offset-4">Reset all filters</button>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filteredSessions.map((session) => (
              <div 
                key={session.id} 
                className="flex flex-col md:flex-row items-start md:items-center gap-8 p-10 rounded-[2.5rem] hover:bg-[#F7F4E9]/30 transition-all cursor-pointer group border border-transparent hover:border-gray-100"
              >
                <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-3xl shadow-sm ${SESSION_TYPE_CONFIG[session.session_type].color}`}>
                  {SESSION_TYPE_CONFIG[session.session_type].icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h4 className="font-bold text-2xl tracking-tighter">{SESSION_TYPE_CONFIG[session.session_type].label}</h4>
                    <span className="text-[9px] bg-accent/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">INTENSITY {session.intensity_level}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-8 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {new Date(session.workout_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {session.duration_minutes} MINS TOTAL</span>
                  </div>
                  {session.notes && (
                    <p className="mt-4 text-xs text-gray-500 line-clamp-2 italic font-medium">"{session.notes}"</p>
                  )}
                </div>

                <div className="flex items-center gap-16 w-full md:w-auto">
                   <div className="text-right">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3">Performance Output</p>
                      <div className="flex items-center gap-4">
                         <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1A1A1A] group-hover:bg-accent transition-all duration-1000" style={{ width: `${session.performance_score}%` }}></div>
                         </div>
                         <span className="text-sm font-black">{session.performance_score}<span className="text-[10px] text-gray-300 ml-1">/100</span></span>
                      </div>
                   </div>
                   <div className="hidden md:flex p-5 bg-gray-50 rounded-3xl group-hover:bg-accent group-hover:text-black transition-all">
                      <ArrowRight size={24} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
