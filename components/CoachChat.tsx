
import React, { useState, useRef, useEffect } from 'react';
import { Message, UserProfile, TrainingSession } from '../types';
import { Send, Bot, Sparkles, Trash2, User } from 'lucide-react';
import { getCoachAlexResponse } from '../services/gemini';

interface CoachChatProps {
  athlete: UserProfile;
  sessions: TrainingSession[];
}

const CoachChat: React.FC<CoachChatProps> = ({ athlete, sessions }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Welcome in, ${athlete.full_name}. I've synchronized your biomechanical data and Strava segments. Analysis suggests we optimize your transitions between stations 4 and 5. How would you like to proceed?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage: Message = { role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    try {
      const responseText = await getCoachAlexResponse(input, messages, athlete, sessions);
      const assistantMessage: Message = { role: 'assistant', content: responseText || "Signal interruption. Retrying analysis...", timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) { console.error(error); } finally { setIsTyping(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-5xl mx-auto bg-white rounded-[3rem] border border-white shadow-soft overflow-hidden animate-in slide-in-from-bottom duration-700">
      {/* Header */}
      <div className="p-8 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 bg-accent rounded-[1.8rem] flex items-center justify-center overflow-hidden shadow-soft">
               <img src="https://picsum.photos/seed/coach_alex/200/200" alt="Coach" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter flex items-center gap-2">Coach Alex <Sparkles size={14} className="text-accent" /></h2>
            <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Protocol Intelligence Active</p>
          </div>
        </div>
        <button onClick={() => setMessages([messages[0]])} className="p-4 text-gray-300 hover:text-red-400 transition-colors bg-gray-50 rounded-full">
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-[#FDFDFD]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-6 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-sm ${m.role === 'user' ? 'bg-[#1A1A1A] text-white' : 'bg-accent text-black'}`}>
                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-8 rounded-[2rem] leading-loose shadow-soft border ${
                m.role === 'user' 
                  ? 'bg-white text-black font-medium rounded-tr-none border-gray-100' 
                  : 'bg-white text-gray-700 border-gray-100 rounded-tl-none italic'
              }`}>
                <p className="text-sm">{m.content}</p>
                <p className="text-[8px] mt-6 opacity-30 font-black uppercase tracking-widest">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • SYNCED
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 p-8 bg-gray-50 rounded-[2rem] w-32 border border-gray-100">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-gray-100 bg-white">
        <div className="flex gap-4 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="TYPE INSTRUCTION..."
            className="flex-1 bg-[#F7F4E9] border border-transparent rounded-[2rem] px-10 py-6 text-xs font-black uppercase focus:outline-none focus:border-accent transition-all placeholder:text-gray-300 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-[#1A1A1A] text-white p-6 rounded-[2rem] hover:bg-accent hover:text-black disabled:opacity-30 transition-all shadow-xl"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachChat;
