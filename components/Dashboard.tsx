
import React from 'react';
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrainingSession, UserProfile, SessionType } from '../types';
import { Play, ArrowUpRight, CheckCircle2, MoreHorizontal, ChevronDown, Clock, Dumbbell } from 'lucide-react';

interface DashboardProps {
  athlete: UserProfile;
  sessions: TrainingSession[];
  onLogWorkout: () => void;
}

const mockChartData = [
  { name: 'S', value: 10 },
  { name: 'M', value: 45 },
  { name: 'T', value: 25 },
  { name: 'W', value: 50 },
  { name: 'T', value: 40 },
  { name: 'F', value: 70 },
  { name: 'S', value: 20 },
];

const Dashboard: React.FC<DashboardProps> = ({ athlete, sessions, onLogWorkout }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Welcome Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
        <div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-2">Welcome in, {athlete.full_name}</h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-black text-gray-400">Strength</p>
              <div className="flex items-center gap-3">
                <div className="w-32 h-6 bg-[#1A1A1A] rounded-full flex items-center px-3">
                  <span className="text-white text-[10px] font-bold">85%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-black text-gray-400">Cardio</p>
              <div className="w-32 h-6 bg-accent rounded-full flex items-center px-3">
                 <span className="text-black text-[10px] font-bold">72%</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-black text-gray-400">Output</p>
              <div className="w-32 h-6 border-2 border-gray-300 rounded-full flex items-center px-3">
                 <span className="text-gray-500 text-[10px] font-bold">10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12 bg-white/40 p-6 rounded-3xl border border-white/50 backdrop-blur-sm">
           <div className="text-center">
             <h3 className="text-4xl font-semibold tracking-tighter flex items-center gap-2">
               <span className="w-2 h-2 bg-accent rounded-full"></span> 78
             </h3>
             <p className="text-[10px] uppercase font-black text-gray-400">Total Workouts</p>
           </div>
           <div className="text-center">
             <h3 className="text-4xl font-semibold tracking-tighter flex items-center gap-2">
               <span className="w-2 h-2 bg-accent rounded-full"></span> 56
             </h3>
             <p className="text-[10px] uppercase font-black text-gray-400">Personal Bests</p>
           </div>
           <div className="text-center">
             <h3 className="text-4xl font-semibold tracking-tighter flex items-center gap-2">
               <span className="w-2 h-2 bg-accent rounded-full"></span> 203
             </h3>
             <p className="text-[10px] uppercase font-black text-gray-400">Volume Hours</p>
           </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        {/* Profile Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-soft border border-gray-100">
            <div className="h-[300px] relative">
              <img src="https://picsum.photos/seed/athlete_main/600/800" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <h2 className="text-2xl font-bold">{athlete.full_name}</h2>
                <p className="text-xs opacity-70">Hyrox {athlete.experience_level}</p>
                <div className="mt-4 flex justify-between items-center">
                   <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/30">$1,200 <span className="text-[10px] opacity-60">Volume</span></div>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {['Strength Benchmarks', 'Device Integration', 'Compensation Summary', 'Athlete Benefits'].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-2xl cursor-pointer hover:bg-accent transition-all group">
                  <span className="text-xs font-bold text-gray-600 group-hover:text-black">{item}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Volume Graph */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="text-lg font-bold">Progress</h3>
                   <p className="text-xs text-gray-400">Volume this week</p>
                 </div>
                 <button className="p-3 bg-[#F9F9F9] rounded-full border border-gray-100">
                    <ArrowUpRight size={14} />
                 </button>
              </div>
              <div className="flex items-end gap-1 mb-8">
                 <span className="text-4xl font-black">6.1 h</span>
                 <span className="text-[10px] text-gray-400 uppercase font-black mb-1">Work Time</span>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockChartData}>
                    <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                      {mockChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#FFD541' : '#1A1A1A'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Time Tracker */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100 relative">
              <div className="flex justify-between items-start">
                 <h3 className="text-lg font-bold">Session Timer</h3>
                 <button className="p-3 bg-[#F9F9F9] rounded-full border border-gray-100"><ArrowUpRight size={14} /></button>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                 <div className="w-32 h-32 border-8 border-[#F9F9F9] rounded-full flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 border-8 border-accent rounded-full border-t-transparent animate-spin duration-[10s]"></div>
                    <span className="text-2xl font-black tracking-tighter">02:35</span>
                    <span className="text-[8px] uppercase font-black text-gray-400">Work Time</span>
                 </div>
              </div>
              <div className="flex justify-center gap-4">
                 <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-accent transition-all"><Play size={16} fill="currentColor" /></button>
                 <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm">
                   <div className="flex gap-0.5"><div className="w-1 h-3 bg-black"></div><div className="w-1 h-3 bg-black"></div></div>
                 </button>
              </div>
              <button className="absolute bottom-8 right-8 p-3 bg-[#1A1A1A] text-white rounded-full"><Clock size={16} /></button>
            </div>
          </div>

          {/* Training Calendar */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100">
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-6">
                   <span className="text-xs font-black uppercase text-gray-400">August</span>
                   <span className="text-lg font-black tracking-tighter">September 2024</span>
                   <span className="text-xs font-black uppercase text-gray-400">October</span>
                </div>
             </div>
             <div className="grid grid-cols-7 gap-4 mb-8">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                 <div key={day} className="text-center">
                   <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">{day}</p>
                   <p className={`text-sm font-black ${i === 3 ? 'text-accent' : ''}`}>{22 + i}</p>
                 </div>
               ))}
             </div>
             <div className="relative h-24 bg-[#F9F9F9] rounded-2xl flex items-center px-8 border border-gray-100 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1A1A1A]"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Coach Strategy Session</h4>
                  <p className="text-xs text-gray-400">Discuss progress on station 5 & 6</p>
                </div>
                <div className="flex -space-x-2">
                   <div className="w-8 h-8 rounded-full border-2 border-white bg-accent"></div>
                   <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold">Training Tasks</h3>
                 <span className="text-3xl font-black tracking-tighter">18%</span>
              </div>
              <div className="flex gap-2 mb-8">
                 <div className="flex-1 h-10 bg-accent rounded-xl flex items-center justify-center text-[10px] font-black uppercase">Task</div>
                 <div className="flex-1 h-10 bg-[#1A1A1A] rounded-xl"></div>
                 <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
              </div>

              <div className="bg-[#1A1A1A] rounded-[2rem] p-6 text-white space-y-4">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold">Session Tasks</h4>
                    <span className="text-lg font-black opacity-60">2/8</span>
                 </div>
                 {[
                   { title: 'Sled Push Prep', time: 'Sep 13, 08:30', done: true },
                   { title: 'Aerobic Base Run', time: 'Sep 13, 10:30', done: true },
                   { title: 'Nutrition Update', time: 'Sep 13, 13:00', done: false },
                   { title: 'Discuss Goals', time: 'Sep 13, 14:45', done: false },
                   { title: 'Mobility Review', time: 'Sep 13, 16:30', done: false }
                 ].map((task, i) => (
                   <div key={i} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0 opacity-80 hover:opacity-100 transition-opacity">
                      <div className={`p-2 rounded-xl ${task.done ? 'bg-white/10' : 'bg-white/5 text-white/40'}`}>
                         <Dumbbell size={14} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-[10px] font-bold ${task.done ? 'line-through opacity-50' : ''}`}>{task.title}</p>
                        <p className="text-[8px] opacity-40 uppercase tracking-widest">{task.time}</p>
                      </div>
                      {task.done && <CheckCircle2 size={16} className="text-accent" />}
                      {!task.done && <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>}
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onLogWorkout}
        className="fixed bottom-10 right-10 bg-[#1A1A1A] text-white w-20 h-20 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
         <Play size={24} fill="currentColor" />
         <span className="absolute right-full mr-4 bg-accent text-black px-4 py-2 rounded-2xl font-black text-xs uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">New Session</span>
      </button>
    </div>
  );
};

export default Dashboard;
