
import React from 'react';
import { LogOut, Search, Bell } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="flex h-screen bg-[#0C0C0C] text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-24 bg-[#141414] border-r border-[#262626] flex flex-col items-center py-8 z-50">
        <div className="mb-12">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(226,255,84,0.3)]">
            <span className="text-black font-black text-xl">H</span>
          </div>
        </div>

        <nav className="flex flex-col gap-6 flex-1">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-accent text-black shadow-[0_0_20px_rgba(226,255,84,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>

        <button className="mt-auto p-3 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all">
          <LogOut size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-[#262626] bg-[#0C0C0C]/50 backdrop-blur-md">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Hyrox AI Coach</p>
            <h1 className="text-xl font-bold">Welcome Back, Luca</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-[#1A1A1A] border border-[#262626] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent transition-all w-64"
              />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-[#0C0C0C]"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[#262626]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Smith Adam</p>
                <p className="text-xs text-gray-500">Elite Athlete</p>
              </div>
              <img 
                src="https://picsum.photos/seed/athlete/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-[#262626]"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
