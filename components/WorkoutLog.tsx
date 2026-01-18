
import React, { useState } from 'react';
import { SessionType, TrainingSession, StrengthSet } from '../types';
import { X, Save, Clock, Zap, Flame, Plus, Trash2, Ruler, Wind, Info, Calendar, Smile, Target, ChevronRight, Dumbbell, BookOpen, Activity } from 'lucide-react';
import { SESSION_TYPE_CONFIG } from '../constants';
import ExerciseLibrary, { EXERCISES } from './ExerciseLibrary';

interface WorkoutLogProps {
  onClose: () => void;
  onSave: (session: Partial<TrainingSession>) => void;
}

const WorkoutLog: React.FC<WorkoutLogProps> = ({ onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [showLibrary, setShowLibrary] = useState(false);
  const [formData, setFormData] = useState({
    session_type: SessionType.STRENGTH,
    duration_minutes: 60,
    intensity_level: 5,
    performance_score: 75,
    notes: '',
    workout_date: new Date().toISOString().split('T')[0],
    strength_data: [] as StrengthSet[],
    cardio_data: { distance: 0, pace: "00:00", avgHeartRate: 0 }
  });

  const [showIntensityHelp, setShowIntensityHelp] = useState(false);

  const addExercise = (name: string = '') => {
    setFormData({
      ...formData,
      strength_data: [...formData.strength_data, { exercise: name, sets: 1, reps: 1, weight: 0 }]
    });
  };

  const updateStrength = (index: number, field: keyof StrengthSet, value: any) => {
    const newData = [...formData.strength_data];
    newData[index] = { ...newData[index], [field]: value };
    setFormData({ ...formData, strength_data: newData });
  };

  const removeStrength = (index: number) => {
    setFormData({
      ...formData,
      strength_data: formData.strength_data.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getIntensityLabel = (val: number) => {
    if (val <= 3) return { label: "Low Intensity", sub: "Recovery / Warm-up pace", color: "text-green-500" };
    if (val <= 6) return { label: "Moderate Intensity", sub: "Steady state / Sustained effort", color: "text-yellow-600" };
    if (val <= 8) return { label: "High Intensity", sub: "Challenging / Threshold work", color: "text-orange-500" };
    return { label: "Maximum Effort", sub: "All-out / Competition intensity", color: "text-red-500" };
  };

  const getPerformanceLabel = (val: number) => {
    if (val <= 30) return "Foundation Level";
    if (val <= 60) return "Average Output";
    if (val <= 85) return "Strong Performance";
    return "Elite Performance";
  };

  const isStrengthMode = [SessionType.STRENGTH, SessionType.SKILL].includes(formData.session_type);
  const isCardioMode = [SessionType.CARDIO, SessionType.SIMULATION, SessionType.ENDURANCE, SessionType.INTERVAL].includes(formData.session_type);

  const intensityInfo = getIntensityLabel(formData.intensity_level);

  // Filter only Hyrox Stations for quick select
  const hyroxStations = EXERCISES.filter(ex => ex.category === 'Hyrox Station');

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xl flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      {showLibrary && <ExerciseLibrary onClose={() => setShowLibrary(false)} onSelect={(name) => { addExercise(name); setShowLibrary(false); }} />}
      
      <div className="bg-[#F7F4E9] w-full max-w-4xl rounded-[3.5rem] border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[95vh]">
        
        {/* Left Sidebar: Progress Steps */}
        <div className="md:w-72 bg-white p-10 border-r border-gray-100 hidden md:flex flex-col">
          <div className="mb-12">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-soft mb-4 text-black font-black">H</div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Session Log</h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Version 2.0 Alpha</p>
          </div>

          <div className="space-y-8 flex-1">
            {[
              { step: 1, label: "Modality", sub: "Type & Context", icon: <Target size={16} /> },
              { step: 2, label: "Protocol", sub: "Data Entry", icon: <Dumbbell size={16} /> },
              { step: 3, label: "Insights", sub: "RPE & Feeling", icon: <Smile size={16} /> },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`flex items-center gap-4 group transition-all text-left ${activeStep === s.step ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeStep === s.step ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-[#F7F4E9] text-gray-400'}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase">{s.sub}</p>
                </div>
              </button>
            ))}
          </div>

          <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors py-4 mt-auto">
            Discard entry
          </button>
        </div>

        {/* Right Content: Form Steps */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-10 flex justify-between items-center md:hidden border-b border-gray-100 bg-white">
            <h2 className="text-xl font-black uppercase tracking-tighter">Session Log</h2>
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
            
            {/* Step 1: Modality & Basics */}
            {activeStep === 1 && (
              <div className="space-y-10 animate-in slide-in-from-right duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Select Modality</label>
                    <Info size={14} className="text-gray-300 cursor-help" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(SESSION_TYPE_CONFIG).map(([key, config]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, session_type: key as SessionType })}
                        className={`flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 transition-all relative overflow-hidden group ${
                          formData.session_type === key 
                            ? 'border-accent bg-white shadow-soft ring-4 ring-accent/5' 
                            : 'border-transparent bg-white/50 text-gray-400 hover:bg-white hover:border-gray-100'
                        }`}
                      >
                        <div className={`p-3 rounded-2xl transition-all ${formData.session_type === key ? 'bg-accent text-black scale-110' : 'bg-gray-50'}`}>
                          {config.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-center">{config.label}</span>
                        {formData.session_type === key && <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-accent rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
                      <Calendar size={12} className="text-accent" /> Session Date
                    </label>
                    <input
                      type="date"
                      value={formData.workout_date}
                      onChange={(e) => setFormData({ ...formData, workout_date: e.target.value })}
                      className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 px-8 focus:outline-none focus:ring-4 focus:ring-accent/10 font-black text-xs uppercase shadow-sm"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
                      <Clock size={12} className="text-accent" /> Duration (Min)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.duration_minutes}
                        onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                        className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 px-8 focus:outline-none focus:ring-4 focus:ring-accent/10 font-black text-xl tracking-tighter shadow-sm"
                      />
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 uppercase">Minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Protocol Details */}
            {activeStep === 2 && (
              <div className="space-y-10 animate-in slide-in-from-right duration-500">
                {isStrengthMode ? (
                  <div className="space-y-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tighter">Exercise Matrix</h3>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Define sets, reps, and load</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          type="button" 
                          onClick={() => setShowLibrary(true)}
                          className="bg-white border border-gray-200 text-black px-6 py-3 rounded-full text-[10px] font-black uppercase flex items-center gap-2 hover:bg-accent transition-all shadow-sm"
                        >
                          <BookOpen size={14} /> View Library
                        </button>
                        <button 
                          type="button" 
                          onClick={() => addExercise()}
                          className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase flex items-center gap-2 hover:bg-accent hover:text-black transition-all shadow-xl"
                        >
                          <Plus size={14} /> New Manual Entry
                        </button>
                      </div>
                    </div>

                    {/* Quick Add Section for Hyrox Stations */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100">
                      <div className="flex items-center gap-2 mb-6">
                        <Activity size={14} className="text-accent" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Official Hyrox Stations</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {hyroxStations.map((station) => (
                          <button
                            key={station.id}
                            type="button"
                            onClick={() => addExercise(station.name)}
                            className="bg-[#F7F4E9] border border-transparent hover:border-accent p-3 rounded-2xl flex items-center gap-3 transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[10px] font-black shadow-sm group-hover:bg-accent group-hover:text-black transition-colors">
                               {station.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tight text-gray-700 truncate">{station.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {formData.strength_data.length === 0 && (
                        <div className="p-12 text-center bg-white/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                           <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No exercises added to this protocol</p>
                        </div>
                      )}
                      {formData.strength_data.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-50 space-y-6 group">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-300 uppercase">Sequence {idx + 1}</span>
                            <button type="button" onClick={() => removeStrength(idx)} className="text-gray-200 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-12 lg:col-span-5">
                              <input 
                                placeholder="EXERCISE NAME" 
                                value={item.exercise}
                                onChange={(e) => updateStrength(idx, 'exercise', e.target.value)}
                                className="bg-[#F7F4E9] w-full text-[10px] font-black px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-transparent"
                              />
                            </div>
                            <div className="col-span-4 lg:col-span-2 space-y-2">
                              <p className="text-[8px] font-black text-gray-400 uppercase text-center">Sets</p>
                              <input 
                                type="number"
                                value={item.sets}
                                onChange={(e) => updateStrength(idx, 'sets', parseInt(e.target.value))}
                                className="bg-[#F7F4E9] w-full text-lg font-black py-3 rounded-2xl text-center focus:outline-none"
                              />
                            </div>
                            <div className="col-span-4 lg:col-span-2 space-y-2">
                               <p className="text-[8px] font-black text-gray-400 uppercase text-center">Reps</p>
                              <input 
                                type="number"
                                value={item.reps}
                                onChange={(e) => updateStrength(idx, 'reps', parseInt(e.target.value))}
                                className="bg-[#F7F4E9] w-full text-lg font-black py-3 rounded-2xl text-center focus:outline-none"
                              />
                            </div>
                            <div className="col-span-4 lg:col-span-3 space-y-2">
                               <p className="text-[8px] font-black text-gray-400 uppercase text-center">Load (KG)</p>
                              <input 
                                type="number"
                                value={item.weight}
                                onChange={(e) => updateStrength(idx, 'weight', parseInt(e.target.value))}
                                className="bg-[#F7F4E9] w-full text-lg font-black py-3 rounded-2xl text-center focus:outline-none border-2 border-accent/20"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : isCardioMode ? (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Aerobic Metrics</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Pace and distance tracking</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { label: 'Total Distance', icon: <Ruler size={16} />, key: 'distance', type: 'number', unit: 'KM' },
                        { label: 'Avg Pace', icon: <Wind size={16} />, key: 'pace', type: 'text', unit: '/KM' },
                        { label: 'Heart Rate', icon: <Flame size={16} />, key: 'avgHeartRate', type: 'number', unit: 'BPM' }
                      ].map((field) => (
                        <div key={field.key} className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100 flex flex-col justify-between h-48">
                          <label className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-2 mb-4">
                            <div className="p-2 bg-[#F7F4E9] rounded-lg text-accent">{field.icon}</div> {field.label}
                          </label>
                          <div className="relative">
                            <input 
                              type={field.type}
                              value={(formData.cardio_data as any)[field.key]}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                cardio_data: { ...formData.cardio_data, [field.key]: field.type === 'number' ? parseFloat(e.target.value) : e.target.value } 
                              })}
                              className="bg-transparent w-full font-black text-3xl tracking-tighter focus:outline-none"
                            />
                            <span className="text-[10px] font-black text-gray-300 uppercase block mt-1">{field.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-gray-400 uppercase text-[10px] font-black tracking-widest">No detailed protocol required for this modality.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Performance Insights */}
            {activeStep === 3 && (
              <div className="space-y-12 animate-in slide-in-from-right duration-500">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Rate of Perceived Exertion</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">How hard was this session?</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowIntensityHelp(!showIntensityHelp)}
                      className="p-3 bg-white border border-gray-100 rounded-full shadow-sm text-gray-400 hover:text-accent transition-colors"
                    >
                      <Info size={18} />
                    </button>
                  </div>

                  {showIntensityHelp && (
                    <div className="bg-[#1A1A1A] text-white p-8 rounded-[2rem] text-[10px] leading-relaxed animate-in fade-in zoom-in duration-300">
                       <p className="font-black uppercase text-accent mb-4 tracking-widest">RPE Reference Scale</p>
                       <ul className="space-y-3 opacity-80">
                         <li><span className="font-black text-accent">1-3:</span> Active Recovery. Heart rate barely elevated.</li>
                         <li><span className="font-black text-accent">4-6:</span> Aerobic Base. Moderate talking possible.</li>
                         <li><span className="font-black text-accent">7-8:</span> Threshold. Heavy breathing, intense focus.</li>
                         <li><span className="font-black text-accent">9-10:</span> VO2 Max / Race Pace. All-out effort.</li>
                       </ul>
                    </div>
                  )}

                  <div className="bg-white rounded-[3rem] p-10 shadow-soft border border-gray-50 space-y-8">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className={`text-4xl font-black tracking-tighter ${intensityInfo.color}`}>{formData.intensity_level}<span className="text-xl text-gray-300">/10</span></p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{intensityInfo.label}</p>
                      </div>
                      <p className="text-[10px] font-medium text-gray-500 italic max-w-[200px] text-right">{intensityInfo.sub}</p>
                    </div>
                    <input 
                      type="range" min="1" max="10" step="1"
                      value={formData.intensity_level}
                      onChange={(e) => setFormData({ ...formData, intensity_level: parseInt(e.target.value) })}
                      className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter">Performance Score</h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Rate your execution and quality</p>
                  </div>
                  <div className="bg-white rounded-[3rem] p-10 shadow-soft border border-gray-100 space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-4xl font-black tracking-tighter">{formData.performance_score}<span className="text-xl text-gray-300">/100</span></p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Quality</p>
                      </div>
                      <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase">{getPerformanceLabel(formData.performance_score)}</span>
                    </div>
                    <input 
                      type="range" min="1" max="100" step="1"
                      value={formData.performance_score}
                      onChange={(e) => setFormData({ ...formData, performance_score: parseInt(e.target.value) })}
                      className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Athlete Notes & Reflections</label>
                  <textarea 
                    placeholder="HOW DID THE SLED PUSH FEEL? ANY LIMITING FACTORS?" 
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] p-8 focus:outline-none focus:ring-4 focus:ring-accent/10 text-xs font-bold uppercase tracking-widest min-h-[150px] shadow-sm"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Footer Actions */}
          <div className="p-10 bg-white border-t border-gray-100 flex gap-6 items-center mt-auto">
            {activeStep > 1 && (
              <button 
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="py-5 px-10 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest"
              >
                Back
              </button>
            )}
            
            <div className="flex-1"></div>

            {activeStep < 3 ? (
              <button 
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="py-5 px-12 rounded-2xl bg-[#1A1A1A] text-white hover:bg-accent hover:text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl"
              >
                Continue Protocol <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                type="submit"
                onClick={handleSubmit}
                className="py-5 px-12 rounded-2xl bg-accent text-black hover:bg-[#1A1A1A] hover:text-white active:scale-[0.98] transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
              >
                <Save size={18} />
                Finalize Record
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;
