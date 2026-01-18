
import React, { useState, useRef, useEffect } from 'react';
// Updated Athlete to UserProfile to match types.ts
import { Message, UserProfile, TrainingSession } from '../types';
import { Send, User, Bot, Sparkles, Trash2, ArrowLeft } from 'lucide-react';
import { getCoachAlexResponse } from '../services/gemini';

interface CoachChatProps {
  // Updated athlete type to UserProfile
  athlete: UserProfile;
  sessions: TrainingSession[];
}

const CoachChat: React.FC<CoachChatProps> = ({ athlete, sessions }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi ${athlete.full_name}! 👋 I'm Coach Alex, your AI Hyrox training assistant. I've analyzed your recent ${sessions.length} workouts. How can I help you reach your next PB today?`,
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

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await getCoachAlexResponse(input, messages, athlete, sessions);
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText || "I'm having trouble connecting to my database. Let's try that again.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-[#141414] rounded-3xl border border-[#262626] overflow-hidden animate-in slide-in-from-bottom duration-500">
      {/* Chat Header */}
      <div className="p-6 border-b border-[#262626] flex items-center justify-between bg-gradient-to-r from-accent/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/seed/coachalex/200/200" alt="Coach" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#141414] rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold flex items-center gap-2">
              Coach Alex
              <span className="bg-accent/10 text-accent text-[8px] uppercase px-1.5 py-0.5 rounded font-black tracking-widest">AI Certified</span>
            </h2>
            <p className="text-[10px] text-gray-500 flex items-center gap-1 uppercase tracking-widest font-bold">
              <Sparkles size={8} className="text-accent" />
              Active Now • Specialist Coach
            </p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-3 text-gray-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Message Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${m.role === 'user' ? 'bg-accent text-black' : 'bg-[#1A1A1A] text-accent'}`}>
                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-5 rounded-2xl shadow-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-accent text-black font-medium rounded-tr-none' 
                  : 'bg-[#1A1A1A] text-gray-200 border border-[#262626] rounded-tl-none prose prose-invert prose-sm'
              }`}>
                {m.content.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
                <p className={`text-[9px] mt-4 opacity-40 uppercase tracking-widest font-black ${m.role === 'user' ? 'text-black' : 'text-gray-500'}`}>
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-accent">
                <Bot size={20} />
              </div>
              <div className="bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-1 border border-[#262626]">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-[#262626] bg-[#0C0C0C]">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Alex about training structure, race strategy..."
            className="flex-1 bg-[#1A1A1A] border border-[#262626] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-gray-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-accent text-black p-4 rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-[0_0_20px_rgba(226,255,84,0.2)]"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[9px] text-gray-600 mt-4 uppercase tracking-[0.2em] font-bold">
          Coach Alex AI may provide inaccurate training advice. Listen to your body.
        </p>
      </div>
    </div>
  );
};

export default CoachChat;
