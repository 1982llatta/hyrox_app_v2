
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
// Updated Athlete to UserProfile to match types.ts
import { TrainingSession, UserProfile, SessionType } from '../types';
import { Dumbbell, Target, TrendingUp, ChevronRight, Play, Flame } from 'lucide-react';
import { SESSION_TYPE_CONFIG } from '../constants';

interface DashboardProps {
  // Updated athlete type to UserProfile
  athlete: UserProfile;
  sessions: TrainingSession[];
  onLogWorkout: () => void;
}

const mockChartData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 70 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 20 },
  { name: 'Jun', value: 12 },
  { name: 'Jul', value: 11 },
  { name: 'Aug', value: 10 },
];

const Dashboard: React.FC<DashboardProps> = ({ athlete, sessions, onLogWorkout }) => {
  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Section: Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fitness Goal/Score Ring */}
        <div className="bg-[#141414] p-6 rounded-3xl border border-[#262626] flex flex-col justify-between group hover:border-accent/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-400">Activity Overview</h3>
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">Monthly</span>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="#262626"
                  strokeWidth="12"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="#E2FF54"
                  strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * athlete.fitness_score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{athlete.fitness_score}%</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Fitness Score</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#262626]">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Calories</p>
              <p className="text-sm font-bold">2.4k</p>
            </div>
            <div className="text-center border-x border-[#262626]">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Protein</p>
              <p className="text-sm font-bold">142g</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Carbs</p>
              <p className="text-sm font-bold">210g</p>
            </div>
          </div>
        </div>

        {/* Activity Bar Chart */}
        <div className="bg-[#141414] p-6 rounded-3xl border border-[#262626] lg:col-span-2 group hover:border-accent/30 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-400">Monthly Activity</h3>
            <button className="text-xs bg-[#1A1A1A] border border-[#262626] px-3 py-1.5 rounded-full hover:border-accent transition-all">View All</button>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                  {mockChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.value > 50 ? '#E2FF54' : '#262626'} 
                      className="hover:opacity-80 cursor-pointer transition-opacity"
                    />
                  ))}
                </Bar>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 10 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#262626', borderRadius: '12px', fontSize: '12px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Section: Trainers & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Trainers */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-semibold text-gray-400">AI Personal Coach</h3>
            <button className="text-xs text-accent">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { name: 'Coach Alex', role: 'Hyrox Specialist', img: 'https://picsum.photos/seed/alex/300/400' },
              { name: 'Adam Smith', role: 'Fitness Expert', img: 'https://picsum.photos/seed/adam/300/400' }
            ].map((coach, i) => (
              <div key={i} className="min-w-[180px] h-[240px] relative rounded-3xl overflow-hidden group">
                <img src={coach.img} alt={coach.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-bold text-sm">{coach.name}</h4>
                  <p className="text-[10px] text-gray-300 mb-2">{coach.role}</p>
                  <div className="h-0.5 w-0 group-hover:w-full bg-accent transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Activity List */}
        <div className="lg:col-span-4 bg-[#141414] p-6 rounded-3xl border border-[#262626]">
          <h3 className="font-semibold text-gray-400 mb-6">Recommend Activity</h3>
          <div className="space-y-4">
            {[
              { title: 'Fitness for beginners', date: '17 Feb, 2026', time: '5:30 PM', icon: '🔗' },
              { title: 'Advanced Wall Balls', date: '18 Feb, 2026', time: '4:30 PM', icon: '⚡' },
              { title: 'Ultimate body workout', date: '20 Feb, 2026', time: '3:30 PM', icon: '🔥' }
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#1A1A1A] transition-all cursor-pointer border border-transparent hover:border-[#262626]">
                <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-xl">{act.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{act.title}</h4>
                  <p className="text-[10px] text-gray-500">{act.date} at {act.time}</p>
                </div>
                <ChevronRight size={14} className="text-gray-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Heart Rate / Stats */}
        <div className="lg:col-span-4 bg-[#141414] p-6 rounded-3xl border border-[#262626]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-400">Heart rate</h3>
            <span className="text-xs text-accent">Weekly</span>
          </div>
          <div className="flex items-end gap-2 h-[120px] mb-6">
            {[40, 60, 45, 90, 70, 55, 65].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-full transition-all duration-500 ${h > 80 ? 'bg-accent' : 'bg-[#262626]'}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[8px] text-gray-500">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                <Flame size={16} className="text-red-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Average BPM</p>
                <p className="text-lg font-bold">78<span className="text-[10px] font-normal text-gray-500 ml-1">bpm</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <button 
        onClick={onLogWorkout}
        className="fixed bottom-10 right-10 bg-accent text-black p-4 rounded-full shadow-[0_0_30px_rgba(226,255,84,0.4)] hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Dumbbell size={24} />
        <span className="absolute right-full mr-4 bg-accent text-black px-3 py-1.5 rounded-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Log Workout</span>
      </button>
    </div>
  );
};

export default Dashboard;
