
import React from 'react';
import { UserProfile, TrainingSession } from '../types';
import { Users, TrendingUp, AlertTriangle, ArrowUpRight, Search } from 'lucide-react';

interface CoachDashboardProps {
  coach: UserProfile;
  athletes: UserProfile[];
}

const CoachDashboard: React.FC<CoachDashboardProps> = ({ coach, athletes }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#262626] p-8 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase">Managed Athletes</p>
              <h3 className="text-3xl font-black">{athletes.length}</h3>
            </div>
          </div>
          <p className="text-xs text-gray-500">+2 from last month</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-8 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase">Avg. Fitness Progress</p>
              <h3 className="text-3xl font-black">+12%</h3>
            </div>
          </div>
          <p className="text-xs text-gray-500">Across entire roster</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-8 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase">Attention Needed</p>
              <h3 className="text-3xl font-black">2</h3>
            </div>
          </div>
          <p className="text-xs text-red-500/70 font-bold uppercase tracking-widest text-[10px]">Over-training detected</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-[#262626] flex justify-between items-center">
          <h3 className="font-black uppercase tracking-tighter text-xl">Roster Management</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
            <input 
              placeholder="Search athlete..." 
              className="bg-[#0C0C0C] border border-[#262626] rounded-full py-2 pl-10 pr-4 text-[10px] uppercase font-bold focus:border-accent transition-all w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A]/50 border-b border-[#262626]">
                <th className="text-left p-6 text-[10px] font-black text-gray-500 uppercase">Athlete</th>
                <th className="text-left p-6 text-[10px] font-black text-gray-500 uppercase">Level</th>
                <th className="text-left p-6 text-[10px] font-black text-gray-500 uppercase">Fitness Score</th>
                <th className="text-left p-6 text-[10px] font-black text-gray-500 uppercase">Recent Session</th>
                <th className="text-right p-6 text-[10px] font-black text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {athletes.map(athlete => (
                <tr key={athlete.id} className="hover:bg-[#1A1A1A] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/${athlete.id}/40/40`} className="w-10 h-10 rounded-xl" />
                      <div>
                        <p className="font-bold text-sm">{athlete.full_name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black">{athlete.hyrox_pb || 'No PB'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded font-black uppercase">{athlete.experience_level}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#0C0C0C] rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${athlete.fitness_score}%` }} />
                      </div>
                      <span className="text-xs font-bold">{athlete.fitness_score}%</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs text-gray-400">4 hours ago</p>
                    <p className="text-[9px] text-gray-600 uppercase font-bold">Hyrox Simulation</p>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-accent hover:opacity-70 transition-opacity">
                      <ArrowUpRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
