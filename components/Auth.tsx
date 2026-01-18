
import React, { useState } from 'react';
import { UserRole } from '../types';
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
    <div className="min-h-screen bg-[#F7F4E9] flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center shadow-soft mx-auto mb-8">
            <span className="text-black font-black text-4xl tracking-tighter">H</span>
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">Crextio Coach</h1>
          <p className="text-gray-400 uppercase tracking-widest text-[10px] font-black">Elite Performance Architecture</p>
        </div>

        <div className="bg-white border border-[#E5E1D3] rounded-[3rem] p-10 shadow-soft">
          <div className="flex bg-[#F7F4E9] p-1.5 rounded-[1.5rem] mb-8 border border-[#E5E1D3]">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-[1.2rem] text-xs font-black uppercase transition-all ${isLogin ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-[1.2rem] text-xs font-black uppercase transition-all ${!isLogin ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
            >
              Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Identity</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ATHLETE)}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${role === UserRole.ATHLETE ? 'border-accent bg-accent/5' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                >
                  <Activity size={24} className={role === UserRole.ATHLETE ? 'text-black' : 'text-gray-300'} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Athlete</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.COACH)}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${role === UserRole.COACH ? 'border-accent bg-accent/5' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                >
                  <Shield size={24} className={role === UserRole.COACH ? 'text-black' : 'text-gray-300'} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Coach</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-[#F7F4E9] border border-transparent rounded-[1.5rem] py-5 px-8 focus:outline-none focus:border-accent transition-all text-xs font-black"
                required
              />
              <input 
                type="password" 
                placeholder="PASSWORD" 
                className="w-full bg-[#F7F4E9] border border-transparent rounded-[1.5rem] py-5 px-8 focus:outline-none focus:border-accent transition-all text-xs font-black"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-[#1A1A1A] text-white font-black uppercase tracking-widest rounded-[1.5rem] hover:bg-accent hover:text-black active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {isLogin ? 'Initialize' : 'Register'}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-[9px] text-gray-300 mt-10 uppercase tracking-[0.3em] font-black">
            Secured by Crextio Performance Protocols
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
