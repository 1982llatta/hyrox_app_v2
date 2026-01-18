
import React, { useState } from 'react';
import { SessionType, TrainingSession, StrengthSet } from '../types';
import { X, Save, Clock, Zap, Info, Flame, Plus, Trash2, Ruler, Wind } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in zoom-in duration-300">
      <div className="bg-[#141414] w-full max-w-2xl rounded-[2.5rem] border border-[#262626] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-[#262626] flex justify-between items-center bg-gradient-to-r from-accent/5 to-transparent">
          <div>
            <h2 className="text-2xl font-black uppercase">Track Session</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Granular data yields elite results</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Workout Type */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Zap size={14} className="text-accent" />
              Modality
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SESSION_TYPE_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({ ...formData, session_type: key as SessionType })}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                    formData.session_type === key 
                      ? 'border-accent bg-accent/5 text-accent' 
                      : 'border-[#262626] bg-[#0C0C0C] text-gray-500'
                  }`}
                >
                  <span className="text-xl">{config.icon}</span>
                  <span className="text-[9px] font-black uppercase">{config.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Inputs */}
          {isStrengthMode && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase text-gray-500">Exercise Breakdown</label>
                <button 
                  type="button" 
                  onClick={addExercise}
                  className="text-[10px] font-black uppercase text-accent flex items-center gap-1 hover:opacity-70"
                >
                  <Plus size={12} /> Add Exercise
                </button>
              </div>
              <div className="space-y-3">
                {formData.strength_data.map((item, idx) => (
                  <div key={idx} className="bg-[#0C0C0C] border border-[#262626] rounded-2xl p-4 grid grid-cols-12 gap-3 items-center group">
                    <div className="col-span-5">
                      <input 
                        placeholder="Exercise" 
                        value={item.exercise}
                        onChange={(e) => updateStrength(idx, 'exercise', e.target.value)}
                        className="bg-transparent border-b border-[#262626] w-full text-xs py-1 focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" placeholder="Sets" 
                        value={item.sets}
                        onChange={(e) => updateStrength(idx, 'sets', parseInt(e.target.value))}
                        className="bg-transparent border-b border-[#262626] w-full text-xs py-1 text-center focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" placeholder="Reps" 
                        value={item.reps}
                        onChange={(e) => updateStrength(idx, 'reps', parseInt(e.target.value))}
                        className="bg-transparent border-b border-[#262626] w-full text-xs py-1 text-center focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" placeholder="kg" 
                        value={item.weight}
                        onChange={(e) => updateStrength(idx, 'weight', parseInt(e.target.value))}
                        className="bg-transparent border-b border-[#262626] w-full text-xs py-1 text-center focus:outline-none"
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      <button type="button" onClick={() => removeStrength(idx)} className="text-gray-700 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isCardioMode && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0C0C0C] border border-[#262626] rounded-2xl p-4">
                <label className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1 mb-2">
                  <Ruler size={10} /> Distance (km)
                </label>
                <input 
                  type="number" step="0.1" 
                  value={formData.cardio_data.distance}
                  onChange={(e) => setFormData({ ...formData, cardio_data: { ...formData.cardio_data, distance: parseFloat(e.target.value) } })}
                  className="bg-transparent w-full font-black text-lg focus:outline-none"
                />
              </div>
              <div className="bg-[#0C0C0C] border border-[#262626] rounded-2xl p-4">
                <label className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1 mb-2">
                  <Wind size={10} /> Pace (min/km)
                </label>
                <input 
                  placeholder="00:00" 
                  value={formData.cardio_data.pace}
                  onChange={(e) => setFormData({ ...formData, cardio_data: { ...formData.cardio_data, pace: e.target.value } })}
                  className="bg-transparent w-full font-black text-lg focus:outline-none"
                />
              </div>
              <div className="bg-[#0C0C0C] border border-[#262626] rounded-2xl p-4">
                <label className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1 mb-2">
                  <Flame size={10} /> Avg HR
                </label>
                <input 
                  type="number" 
                  value={formData.cardio_data.avgHeartRate}
                  onChange={(e) => setFormData({ ...formData, cardio_data: { ...formData.cardio_data, avgHeartRate: parseInt(e.target.value) } })}
                  className="bg-transparent w-full font-black text-lg focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-gray-500">Duration (min)</label>
              <input
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                className="w-full bg-[#0C0C0C] border border-[#262626] rounded-2xl py-4 px-6 focus:outline-none focus:border-accent font-black"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-gray-500">Intensity (RPE)</label>
              <select 
                value={formData.intensity_level}
                onChange={(e) => setFormData({ ...formData, intensity_level: parseInt(e.target.value) })}
                className="w-full bg-[#0C0C0C] border border-[#262626] rounded-2xl py-4 px-6 focus:outline-none focus:border-accent font-black appearance-none"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} - {n > 8 ? 'Extreme' : n > 5 ? 'Hard' : 'Moderate'}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase text-gray-500">Performance Feedback</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Analysis of power output, transitions, or mental state..."
              className="w-full bg-[#0C0C0C] border border-[#262626] rounded-2xl py-4 px-6 focus:outline-none focus:border-accent h-24 resize-none text-xs font-medium"
            />
          </div>
        </form>

        <div className="p-8 bg-[#1A1A1A] flex gap-4">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-6 rounded-2xl border border-[#262626] hover:bg-[#262626] transition-all font-black text-xs uppercase"
          >
            Discard
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            className="flex-[2] py-4 px-6 rounded-2xl bg-accent text-black hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(226,255,84,0.1)]"
          >
            <Save size={18} />
            Commit Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;
