
import React from 'react';
import { LayoutDashboard, History, MessageSquare, Trophy, Settings, LogOut, Dumbbell, Timer, Flame, Zap, Link as LinkIcon, User } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'history', label: 'History', icon: <History size={20} /> },
  { id: 'coach', label: 'AI Coach', icon: <MessageSquare size={20} /> },
  { id: 'integrations', label: 'Integrations', icon: <LinkIcon size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
];

export const SESSION_TYPE_CONFIG = {
  strength: { label: 'Strength Training', icon: <Dumbbell className="text-blue-400" />, color: 'bg-blue-400/10' },
  cardio: { label: 'Cardio/Running', icon: <Timer className="text-green-400" />, color: 'bg-green-400/10' },
  interval: { label: 'Interval Training', icon: <Zap className="text-orange-400" />, color: 'bg-orange-400/10' },
  endurance: { label: 'Endurance Session', icon: <History className="text-purple-400" />, color: 'bg-purple-400/10' },
  skill: { label: 'Skill Work', icon: <Settings className="text-yellow-400" />, color: 'bg-yellow-400/10' },
  simulation: { label: 'Hyrox Simulation', icon: <Flame className="text-red-400" />, color: 'bg-red-400/10' },
};
