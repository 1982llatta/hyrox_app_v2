
import React, { useState } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { TrainingSession, UserProfile, FitnessTrend } from '../types';
// Add missing Flame import
import { Play, ArrowUpRight, MessageSquare, LayoutGrid, Calendar, TrendingUp, TrendingDown, Minus, Dumbbell, Trophy, Activity, Timer, Zap, ArrowRight, Flame } from 'lucide-react';
import { SESSION_TYPE_CONFIG } from '../constants';

interface DashboardProps {
  athlete: UserProfile;
  sessions: TrainingSession[];
  onLogWorkout: () => void;
  onNavigate: (tab: string) => void;
}

const weeklyData = [
  { name: 'Mon', score: 78, volume: 450, pace: 5.40 },
  { name: 'Tue', score: 79, volume: 800, pace: 5.35 },
  { name: 'Wed', score: 79, volume: 0, pace: 5.42 },
  { name: 'Thu', score: 81, volume: 1200, pace: 5.28 },
  { name: 'Fri', score: 80, volume: 300, pace: 5.20 },
  { name: 'Sat', score: 83, volume: 2100, pace: 5.15 },
  { name: 'Sun', score: 84, volume: 0, pace: 5.08 },
];

const monthlyData = [
  { name: 'Week 1', score: 72, volume: 4500, pace: 5.50 },
  { name: 'Week 2', score: 75, volume: 5200, pace: 5.42 },
  { name: 'Week 3', score: 79, volume: 4800, pace: 5.38 },
  { name: 'Week 4', score: 84, volume: 6100, pace: 5.12 },
];

const Dashboard: React.FC<DashboardProps> = ({ athlete, sessions, onLogWorkout, onNavigate }) => {
  const [trendView, setTrendView] = useState<'fitness' | 'strength' | 'pace'>('fitness');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const recentSessions = sessions.slice(0, 5);
  
  const currentData = timeframe === 'weekly' ? weeklyData : monthlyData;

  const getScoreCategory = (score: number) => {
    if (score < 40) return { label: "Building Foundation", color: "text-red-500", bg: "bg-red-50" };
    if (score <= 70) return { label: "Progressing Well", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { label: "Competition Ready", color: "text-green-600", bg: "bg-green-50" };
  };

  const category = getScoreCategory(athlete.fitness_score);

  const getTrendIcon = (trend: FitnessTrend) => {
    switch (trend) {
      case FitnessTrend.IMPROVING: return <TrendingUp className="text-green-500" size={18} />;
      case FitnessTrend.DECLINING: return <TrendingDown className="text-red-500" size={18} />;
      default: return <Minus className="text-gray-400" size={18} />;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] text-white p-4 rounded-2xl shadow-2xl border border-white/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">{label}</p>
          <p className="text-lg font-black">{payload[0].value}{trendView === 'pace' ? "'" : trendView === 'strength' ? 'kg' : '%'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-1">Elite Protocol, {athlete.full_name}</h1>
          <p className="text-gray-400 text-sm font-medium italic">"The architecture of speed begins with consistency."</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onLogWorkout}
            className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-accent hover:text-black transition-all flex items-center gap-3"
          >
            <Play size={16} fill="currentColor" /> Log Performance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Stats Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-[#F7F4E9] group-hover:text-accent/10 transition-colors">
              <Zap size={120} />
            </div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Athlete Score</h3>
              {getTrendIcon(athlete.fitness_trend)}
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-6xl font-black tracking-tighter">{athlete.fitness_score}<span className="text-xl font-bold text-gray-300">/100</span></p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Global Performance</p>
                </div>
                <div className={`${category.bg} ${category.color} px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest`}>
                  {category.label}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hyrox PB</p>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-accent" />
                    <span className="text-2xl font-black tracking-tighter">{athlete.hyrox_pb || '00:00:00'}</span>
                  </div>
                </div>
                <button onClick={() => onNavigate('plans')} className="p-3 bg-gray-50 rounded-full hover:bg-accent transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100 grid grid-cols-2 gap-4">
             {[
              { label: 'Workouts', val: sessions.length, sub: 'Total Logs', icon: <Activity className="text-accent" /> },
              { label: 'Intensity', val: '7.8', sub: 'Avg. RPE', icon: <Flame className="text-orange-400" /> },
              { label: 'Time', val: '12h', sub: 'Last 30d', icon: <Timer className="text-blue-400" /> },
              { label: 'Streak', val: '14', sub: 'Days', icon: <Zap className="text-yellow-400" /> },
             ].map((stat, i) => (
               <div key={i} className="bg-[#F9F9F9] p-6 rounded-[2rem] border border-gray-50">
                 <div className="flex items-center gap-3 mb-4">{stat.icon}</div>
                 <p className="text-2xl font-black tracking-tighter">{stat.val}</p>
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{stat.sub}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Center/Main Chart Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              <div>
                <h3 className="text-2xl font-black tracking-tighter uppercase">Trend Analysis</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex bg-[#F9F9F9] p-1 rounded-full border border-gray-100">
                    <button onClick={() => setTimeframe('weekly')} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${timeframe === 'weekly' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}>Weekly</button>
                    <button onClick={() => setTimeframe('monthly')} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${timeframe === 'monthly' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}>Monthly</button>
                  </div>
                </div>
              </div>
              <div className="flex bg-[#F9F9F9] p-1.5 rounded-[1.5rem] border border-gray-100 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'fitness', label: 'Fitness', icon: <Activity size={14} /> },
                  { id: 'strength', label: 'Volume', icon: <Dumbbell size={14} /> },
                  { id: 'pace', label: 'Pace', icon: <Timer size={14} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTrendView(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      trendView === tab.id ? 'bg-[#1A1A1A] text-white shadow-xl' : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {trendView === 'fitness' ? (
                  <AreaChart data={currentData}>
                    <defs>
                      <linearGradient id="colorFitness" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD541" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#FFD541" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold' }} dy={10} />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FFD541', strokeWidth: 2 }} />
                    <Area type="monotone" dataKey="score" stroke="#FFD541" strokeWidth={4} fillOpacity={1} fill="url(#colorFitness)" animationDuration={1500} />
                  </AreaChart>
                ) : trendView === 'strength' ? (
                  <BarChart data={currentData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold' }} dy={10} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="volume" radius={[8, 8, 8, 8]} animationDuration={1500}>
                      {currentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === currentData.length - 1 ? '#FFD541' : '#1A1A1A'} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <LineChart data={currentData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold' }} dy={10} />
                    <YAxis hide domain={['dataMin - 0.2', 'dataMax + 0.2']} reversed />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1A1A1A', strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="pace" stroke="#1A1A1A" strokeWidth={4} dot={{ fill: '#FFD541', stroke: '#1A1A1A', strokeWidth: 2, r: 6 }} animationDuration={1500} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-gray-50">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Threshold Shift</p>
                <p className="text-2xl font-black tracking-tighter">+{timeframe === 'weekly' ? '2.4' : '6.8'}%</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Cycle Volume</p>
                <p className="text-2xl font-black tracking-tighter">{timeframe === 'weekly' ? '4.8k' : '22k'}<span className="text-[10px] text-gray-300 ml-1">KG</span></p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Transition Eff.</p>
                <p className="text-2xl font-black tracking-tighter">Top 15%</p>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 p-8 text-accent opacity-10 group-hover:opacity-20 transition-opacity"><MessageSquare size={120} /></div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-6">AI Performance Insight</h3>
                <p className="text-lg font-medium leading-tight relative z-10">
                  "Your {trendView} trajectory is {athlete.fitness_trend === FitnessTrend.IMPROVING ? 'optimizing' : 'stabilizing'}. I recommend focusing on {athlete.experience_level === 'beginner' ? 'aerobic base' : 'threshold transitions'} for the next 72 hours."
                </p>
              </div>
              <button 
                onClick={() => onNavigate('coach')}
                className="mt-8 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-all self-start relative z-10"
              >
                Deep Analysis <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Output</h3>
                <button onClick={() => onNavigate('history')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">View Archives</button>
              </div>
              <div className="space-y-3">
                {recentSessions.map((session, i) => {
                  const config = SESSION_TYPE_CONFIG[session.session_type];
                  return (
                    <div key={session.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9F9F9] hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${config.color}`}>
                        {config.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xs truncate uppercase tracking-tight">{config.label}</h4>
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{session.duration_minutes} MINS</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black tracking-tighter">{session.performance_score}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
