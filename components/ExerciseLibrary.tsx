
import React, { useState } from 'react';
import { X, Search, PlayCircle, Info, ChevronRight, Activity, Dumbbell, Zap, Loader2, Play } from 'lucide-react';

export interface Exercise {
  id: string;
  name: string;
  category: 'Hyrox Station' | 'Strength' | 'Skill';
  description: string;
  cues: string[];
  thumbnailUrl: string;
  videoUrl?: string;
}

export const EXERCISES: Exercise[] = [
  {
    id: 'ski',
    name: 'SkiErg',
    category: 'Hyrox Station',
    description: '1000m on the SkiErg. This station tests upper body endurance and rhythmic breathing.',
    cues: ['Keep a high catch position', 'Drive through the core and hips', 'Maintain a consistent SPM'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1590239068531-48d1621758ff?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'push',
    name: 'Sled Push',
    category: 'Hyrox Station',
    description: 'A 50m push of a weighted sled. Focus on low body position and consistent leg drive.',
    cues: ['Keep arms locked or close to chest', 'Drive from the balls of your feet', 'Maintain a neutral spine'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'pull',
    name: 'Sled Pull',
    category: 'Hyrox Station',
    description: 'Pulling a weighted sled 50m using a rope. Core stability and rhythmic pulling are key.',
    cues: ['Use your legs and hips, not just arms', 'Keep a steady rhythm', 'Stay within the box boundaries'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'burpee',
    name: 'Burpee Broad Jumps',
    category: 'Hyrox Station',
    description: '80m of burpees combined with forward jumps. A test of explosive power and endurance.',
    cues: ['Jump for distance, not height', 'Land softly on mid-foot', 'Find a breathing rhythm'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1599058917233-3583364b2629?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'row',
    name: 'Rowing',
    category: 'Hyrox Station',
    description: '1000m row. Power distribution between legs, core, and arms is vital for efficiency.',
    cues: ['Explode with the legs first', 'Keep a straight back', 'Control the recovery phase'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'carry',
    name: 'Farmers Carry',
    category: 'Hyrox Station',
    description: '200m carry of two heavy kettlebells. Grip and core stability are paramount.',
    cues: ['Short, quick steps', 'Shoulders back and down', 'Look straight ahead'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2158?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'lunge',
    name: 'Sandbag Lunges',
    category: 'Hyrox Station',
    description: '100m of lunges with a weighted sandbag on the shoulders.',
    cues: ['Keep chest up', 'Rear knee must touch the floor', 'Maintain balance with a wide stance'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'wallball',
    name: 'Wall Balls',
    category: 'Hyrox Station',
    description: 'The final station. 75 or 100 reps of squatting and throwing a medicine ball to a target.',
    cues: ['Keep the ball high at chest level', 'Use the squat momentum to throw', 'Consistent target hitting'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1590239068531-48d1621758ff?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Strength',
    description: 'Fundamental pulling movement. Essential for building the posterior chain for sled stations.',
    cues: ['Brace core before lifting', 'Keep bar close to shins', 'Squeeze glutes at the top'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838276537-2222d214a16b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'thrusters',
    name: 'Thrusters',
    category: 'Strength',
    description: 'Compound movement combining a front squat into an overhead press.',
    cues: ['Explode out of the squat', 'Punch the ceiling', 'Rest at the top if needed'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=800',
  }
];

interface ExerciseLibraryProps {
  onClose: () => void;
  onSelect?: (exerciseName: string) => void;
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filtered = EXERCISES.filter(ex => 
    ex.name.toLowerCase().includes(search.toLowerCase()) || 
    ex.category.toLowerCase().includes(search.toLowerCase())
  );

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setTimeout(() => {
      // Simulation of a video loading
    }, 2000);
  };

  const resetExercise = (ex: Exercise) => {
    setSelectedExercise(ex);
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-md z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[3.5rem] flex flex-col md:flex-row overflow-hidden shadow-2xl border border-white/20">
        
        {/* List View */}
        <div className="md:w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Library</h2>
              <button onClick={onClose} className="md:hidden p-2 bg-white rounded-full"><X size={20} /></button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="SEARCH DRILLS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-accent shadow-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2 custom-scrollbar">
            {filtered.map(ex => (
              <button
                key={ex.id}
                onClick={() => resetExercise(ex)}
                className={`w-full p-6 rounded-[2rem] text-left transition-all flex items-center justify-between group ${
                  selectedExercise?.id === ex.id ? 'bg-[#1A1A1A] text-white' : 'bg-white hover:bg-white shadow-sm border border-transparent hover:border-gray-200'
                }`}
              >
                <div>
                  <p className={`text-[8px] font-black uppercase tracking-widest mb-1 ${selectedExercise?.id === ex.id ? 'text-accent' : 'text-gray-400'}`}>
                    {ex.category}
                  </p>
                  <p className="text-sm font-bold">{ex.name}</p>
                </div>
                <ChevronRight size={14} className={selectedExercise?.id === ex.id ? 'text-accent' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div className="flex-1 flex flex-col min-w-0 bg-white p-12 overflow-y-auto custom-scrollbar">
          <div className="hidden md:flex justify-end mb-4">
            <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={20} /></button>
          </div>

          {!selectedExercise ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-24 h-24 bg-[#F7F4E9] rounded-[2.5rem] flex items-center justify-center text-accent">
                 <Zap size={40} />
               </div>
               <div className="max-w-xs">
                 <h3 className="text-xl font-black uppercase tracking-tight">Select a Drill</h3>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 leading-relaxed">
                   Browse the architectural protocols for elite Hyrox performance.
                 </p>
               </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right duration-500 space-y-12">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-accent text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {selectedExercise.category}
                     </span>
                     <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Technique Protocol</span>
                  </div>
                  <h1 className="text-5xl font-black tracking-tighter uppercase">{selectedExercise.name}</h1>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Operational Overview</h4>
                        <p className="text-gray-600 font-medium leading-loose italic">
                          "{selectedExercise.description}"
                        </p>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Coaching Cues</h4>
                        <div className="space-y-3">
                           {selectedExercise.cues.map((cue, i) => (
                             <div key={i} className="flex items-start gap-4 p-5 bg-[#F9F9F9] rounded-2xl border border-gray-50 group hover:border-accent transition-all">
                                <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-[10px] font-black shadow-sm group-hover:bg-accent transition-colors">
                                  {i + 1}
                                </div>
                                <p className="text-xs font-bold text-gray-700 leading-snug">{cue}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="aspect-video bg-[#1A1A1A] rounded-[2.5rem] relative overflow-hidden flex items-center justify-center group shadow-2xl border border-gray-100">
                        {isPlaying ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20">
                            <Loader2 size={48} className="text-accent animate-spin mb-4" />
                            <p className="text-accent text-[10px] font-black uppercase tracking-widest">Streaming Performance Protocol...</p>
                            <button 
                              onClick={() => setIsPlaying(false)}
                              className="mt-6 px-6 py-2 border border-accent/20 text-accent text-[8px] font-black uppercase rounded-full hover:bg-accent/10"
                            >
                              Stop Preview
                            </button>
                          </div>
                        ) : (
                          <>
                            <img 
                              src={selectedExercise.thumbnailUrl} 
                              alt={selectedExercise.name} 
                              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <button 
                              onClick={handlePlayVideo}
                              className="relative z-10 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-xl group/btn"
                            >
                               <Play fill="currentColor" size={32} className="ml-1" />
                            </button>
                            <div className="absolute bottom-8 left-8 z-10">
                               <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Video Protocol</p>
                               <p className="text-white font-bold text-sm">Form Guide: {selectedExercise.name}</p>
                            </div>
                          </>
                        )}
                     </div>

                     <div className="p-8 bg-accent rounded-[2.5rem] text-black">
                        <div className="flex items-center gap-3 mb-4">
                           <Info size={20} />
                           <h4 className="text-[10px] font-black uppercase tracking-widest">Coach Alex Pro Tip</h4>
                        </div>
                        <p className="text-xs font-black uppercase leading-relaxed tracking-tight">
                           "Efficiency beats raw output at this station. Control your breathing during the setup to maximize power during the movement phase."
                        </p>
                     </div>
                  </div>
               </div>
               
               {onSelect && (
                 <div className="pt-8 mt-8 border-t border-gray-100 flex gap-4">
                    <button 
                      onClick={() => onSelect(selectedExercise.name)}
                      className="flex-1 bg-[#1A1A1A] text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      Add To Workout Log <Activity size={18} />
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-10 bg-gray-50 text-gray-400 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
