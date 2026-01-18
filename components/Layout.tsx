
import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Top Navigation */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-12">
          <div className="bg-white border border-[#E5E1D3] px-6 py-3 rounded-full shadow-soft flex items-center gap-2">
            <span className="font-black text-lg tracking-tighter">Crextio</span>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-white p-3 rounded-full border border-[#E5E1D3] shadow-soft hover:bg-accent transition-colors">
            <Settings size={18} />
          </button>
          <button className="bg-white p-3 rounded-full border border-[#E5E1D3] shadow-soft relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
          </button>
          <div className="bg-white p-1 rounded-full border border-[#E5E1D3] shadow-soft flex items-center pr-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/seed/luca/80/80" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
