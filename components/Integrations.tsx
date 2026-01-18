
import React from 'react';
import { UserProfile } from '../types';
import { CheckCircle, Circle, RefreshCw, Smartphone } from 'lucide-react';

interface IntegrationsProps {
  user: UserProfile;
  onToggle: (platform: 'strava' | 'garmin') => void;
}

const Integrations: React.FC<IntegrationsProps> = ({ user, onToggle }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black uppercase mb-2 tracking-tighter">Integrations</h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Connect your ecosystem for AI analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strava */}
        <div className={`bg-[#141414] border-2 rounded-[2.5rem] p-8 transition-all ${user.integrations.strava ? 'border-accent shadow-[0_0_30px_rgba(226,255,84,0.1)]' : 'border-[#262626]'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="w-16 h-16 bg-[#FC4C02]/10 rounded-2xl flex items-center justify-center text-[#FC4C02]">
              <Smartphone size={32} />
            </div>
            {user.integrations.strava ? (
              <span className="bg-accent/10 text-accent text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2">
                <CheckCircle size={12} /> Connected
              </span>
            ) : (
              <span className="bg-gray-500/10 text-gray-500 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2">
                <Circle size={12} /> Disconnected
              </span>
            )}
          </div>
          <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter">Strava</h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-8">Sync your segments, PRs, and running efficiency directly with Coach Alex.</p>
          <button 
            onClick={() => onToggle('strava')}
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase transition-all ${user.integrations.strava ? 'bg-[#262626] text-white hover:bg-[#333]' : 'bg-[#FC4C02] text-white hover:scale-[1.02]'}`}
          >
            {user.integrations.strava ? 'Disconnect Account' : 'Connect Strava'}
          </button>
        </div>

        {/* Garmin */}
        <div className={`bg-[#141414] border-2 rounded-[2.5rem] p-8 transition-all ${user.integrations.garmin ? 'border-accent shadow-[0_0_30px_rgba(226,255,84,0.1)]' : 'border-[#262626]'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <RefreshCw size={32} />
            </div>
            {user.integrations.garmin ? (
              <span className="bg-accent/10 text-accent text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2">
                <CheckCircle size={12} /> Connected
              </span>
            ) : (
              <span className="bg-gray-500/10 text-gray-500 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2">
                <Circle size={12} /> Disconnected
              </span>
            )}
          </div>
          <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter">Garmin Connect</h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-8">Biometric data integration for heart rate variability and recovery analysis.</p>
          <button 
            onClick={() => onToggle('garmin')}
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase transition-all ${user.integrations.garmin ? 'bg-[#262626] text-white hover:bg-[#333]' : 'bg-white text-black hover:scale-[1.02]'}`}
          >
            {user.integrations.garmin ? 'Disconnect Account' : 'Connect Garmin'}
          </button>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] rounded-[2.5rem] p-10 text-center">
        <h4 className="font-black uppercase mb-4 tracking-tighter">AI Analysis Engine</h4>
        <p className="text-gray-500 text-xs max-w-lg mx-auto leading-loose uppercase tracking-widest font-bold">
          Once connected, Coach Alex automatically scrapes performance metrics to identify aerobic threshold shifts and volume fatigue.
        </p>
      </div>
    </div>
  );
};

export default Integrations;
