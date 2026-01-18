
import React, { useState } from 'react';
import { SessionType, TrainingSession, StrengthSet } from '../types';
import { X, Save, Clock, Zap, Flame, Plus, Trash2, Ruler, Wind } from 'lucide-react';
import { SESSION_TYPE_CONFIG } from '../constants';

interface WorkoutLogProps {
  onClose: () => void;
  onSave: (session: Partial<TrainingSession>) => void;
}

const WorkoutLog: React.FC<WorkoutLogProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    session_type: SessionType.STRENGTH,
    duration_minutes: 60,
    intensity_level: 5,
    performance_score: 70,
    notes: '',
    workout_date: new Date().toISOString().split('T')[0],
    strength_data: [] as StrengthSet[],
    cardio_data: { distance: 0, pace: "00:00", avgHeartRate: 0 }
  });

  const addExercise = () => {
    setFormData({
      ...formData,
      strength_data: [...formData.strength_data, { exercise: '', sets: 1, reps: 1, weight: 0 }]
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

  const isStrengthMode = [SessionType.STRENGTH, SessionType.SKILL].includes(formData.session_type);
  const isCardioMode = [SessionType.CARDIO, SessionType.SIMULATION, SessionType.ENDURANCE, SessionType.INTERVAL].includes(formData.session_type);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-in fade-in zoom-in duration-300">
      <div className="bg-[#F7F4E9] w-full max-w-2xl rounded-[3rem] border border-white shadow-2xl overflow-hidden">
        <div className="p-10 border-b border-gray-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Session Entry</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mt-1">Data-driven performance tracking</p>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-gray-100 rounded-full transition-colors border border-gray-100 shadow-sm">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Modality Selector */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Training Modality</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(SESSION_TYPE_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({ ...formData, session_type: key as SessionType })}
                  className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 transition-all ${
                    formData.session_type === key 
                      ? 'border-accent bg-white shadow-soft' 
                      : 'border-transparent bg-white/40 text-gray-400 grayscale'
                  }`}
                >
                  <span className="text-2xl">{config.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest">{config.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Inputs */}
          {isStrengthMode && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Exercise Protocol</label>
                <button 
                  type="button" 
                  onClick={addExercise}
                  className="bg-accent text-black px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-sm"
                >
                  <Plus size={12} /> Add Set
                </button>
              </div>
              <div className="space-y-4">
                {formData.strength_data.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-[1.5rem] p-6 grid grid-cols-12 gap-4 items-center shadow-soft border border-gray-100 group">
                    <div className="col-span-5">
                      <input 
                        placeholder="EXERCISE NAME" 
                        value={item.exercise}
                        onChange={(e) => updateStrength(idx, 'exercise', e.target.value)}
                        className="bg-[#F7F4E9] w-full text-[10px] font-black px-4 py-3 rounded-xl focus:outline-none focus:border-accent border border-transparent transition-all"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" placeholder="S" 
                        value={item.sets}
                        onChange={(e) => updateStrength(idx, 'sets', parseInt(e.target.value))}
                        className="bg-[#F7F4E9] w-full text-[10px] font-black px-2 py-3 rounded-xl text-center focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" placeholder="R" 
                        value={item.reps}
                        onChange={(e) => updateStrength(idx, 'reps', parseInt(e.target.value))}
                        className="bg-[#F7F4E9] w-full text-[10px] font-black px-2 py-3 rounded-xl text-center focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" placeholder="KG" 
                        value={item.weight}
                        onChange={(e) => updateStrength(idx, 'weight', parseInt(e.target.value))}
                        className="bg-[#F7F4E9] w-full text-[10px] font-black px-2 py-3 rounded-xl text-center focus:outline-none"
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      <button type="button" onClick={() => removeStrength(idx)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isCardioMode && (
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Distance', icon: <Ruler size={14} />, key: 'distance', type: 'number' },
                { label: 'Pace', icon: <Wind size={14} />, key: 'pace', type: 'text' },
                { label: 'Heart Rate', icon: <Flame size={14} />, key: 'avgHeartRate', type: 'number' }
              ].map((field) => (
                <div key={field.key} className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100">
                  <label className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-2 mb-4">
                    {field.icon} {field.label}
                  </label>
                  <input 
                    type={field.type}
                    value={(formData.cardio_data as any)[field.key]}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      cardio_data: { ...formData.cardio_data, [field.key]: field.type === 'number' ? parseFloat(e.target.value) : e.target.value } 
                    })}
                    className="bg-transparent w-full font-black text-xl tracking-tighter focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Duration (Minutes)</label>
              <input
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                className="w-full bg-white border border-gray-200 rounded-2xl py-5 px-8 focus:outline-none focus:border-accent font-black tracking-tighter text-xl"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Session date</label>
              <input
                type="date"
                value={formData.workout_date}
                onChange={(e) => setFormData({ ...formData, workout_date: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-2xl py-5 px-8 focus:outline-none focus:border-accent font-black text-sm uppercase"
              />
            </div>
          </div>
        </form>

        <div className="p-10 bg-white border-t border-gray-100 flex gap-6">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-5 px-8 rounded-[1.5rem] border border-gray-200 hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            Discard Session
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            className="flex-[2] py-5 px-8 rounded-[1.5rem] bg-[#1A1A1A] text-white hover:bg-accent hover:text-black active:scale-[0.98] transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
          >
            <Save size={18} />
            Initialize Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;
