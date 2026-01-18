
import React, { useState } from 'react';
import { UserRole, ExperienceLevel } from '../types';
import { User, Shield, ArrowRight, Activity } from 'lucide-react';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.ATHLETE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(226,255,84,0.3)] mx-auto mb-6">
            <span className="text-black font-black text-3xl">H</span>
          </div>
          <h1 className="text-3xl font-black mb-2">HYROX AI COACH</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Evolution of Performance</p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex bg-[#0C0C0C] p-1 rounded-2xl mb-8 border border-[#262626]">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-accent text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-accent text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ATHLETE)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${role === UserRole.ATHLETE ? 'border-accent bg-accent/5 text-accent' : 'border-[#262626] text-gray-500 hover:border-gray-700'}`}
                >
                  <Activity size={24} />
                  <span className="text-xs font-black uppercase">Athlete</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.COACH)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${role === UserRole.COACH ? 'border-accent bg-accent/5 text-accent' : 'border-[#262626] text-gray-500 hover:border-gray-700'}`}
                >
                  <Shield size={24} />
                  <span className="text-xs font-black uppercase">Coach</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-[#0C0C0C] border border-[#262626] rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-[#0C0C0C] border border-[#262626] rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-accent text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(226,255,84,0.2)] flex items-center justify-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-600 mt-8 uppercase tracking-widest font-bold">
            By continuing, you agree to the performance terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
