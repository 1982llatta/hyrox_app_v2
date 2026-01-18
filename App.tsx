
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CoachDashboard from './components/CoachDashboard';
import WorkoutLog from './components/WorkoutLog';
import CoachChat from './components/CoachChat';
import History from './components/History';
import Integrations from './components/Integrations';
import Auth from './components/Auth';
import { ExperienceLevel, TrainingSession, UserProfile, UserRole, SessionType } from './types';

// Mock initial data
const MOCK_ATHLETE: UserProfile = {
  id: 'user_1',
  full_name: 'Luca',
  role: UserRole.ATHLETE,
  experience_level: ExperienceLevel.INTERMEDIATE,
  age: 30,
  gender: 'male',
  hyrox_pb: '01:15:20',
  fitness_score: 84,
  integrations: {
    strava: false,
    garmin: false
  }
};

const MOCK_COACH: UserProfile = {
  id: 'coach_1',
  full_name: 'Coach Alex',
  role: UserRole.COACH,
  fitness_score: 100,
  integrations: { strava: true, garmin: true }
};

const ROSTER: UserProfile[] = [
  MOCK_ATHLETE,
  { id: 'user_2', full_name: 'Sarah Miles', role: UserRole.ATHLETE, experience_level: ExperienceLevel.ADVANCED, fitness_score: 92, hyrox_pb: '01:08:45', integrations: { strava: true, garmin: false } },
  { id: 'user_3', full_name: 'Tom Power', role: UserRole.ATHLETE, experience_level: ExperienceLevel.BEGINNER, fitness_score: 65, hyrox_pb: '', integrations: { strava: false, garmin: false } }
];

const INITIAL_SESSIONS: TrainingSession[] = [
  {
    id: 's_1',
    athlete_id: 'user_1',
    session_type: SessionType.SIMULATION,
    duration_minutes: 105,
    intensity_level: 9,
    performance_score: 88,
    workout_date: '2026-01-15',
    created_at: new Date().toISOString()
  }
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [sessions, setSessions] = useState<TrainingSession[]>(INITIAL_SESSIONS);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role === UserRole.ATHLETE ? MOCK_ATHLETE : MOCK_COACH);
    setIsLoggedIn(true);
  };

  const toggleIntegration = (platform: 'strava' | 'garmin') => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      integrations: {
        ...currentUser.integrations,
        [platform]: !currentUser.integrations[platform]
      }
    });
  };

  const handleSaveWorkout = (data: Partial<TrainingSession>) => {
    if (!currentUser) return;
    const newSession: TrainingSession = {
      ...data as any,
      id: `s_${Date.now()}`,
      athlete_id: currentUser.id,
      created_at: new Date().toISOString()
    };
    
    setSessions(prev => [newSession, ...prev]);
    setIsLogOpen(false);
  };

  if (!isLoggedIn || !currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (currentUser.role === UserRole.COACH) {
      if (activeTab === 'dashboard') return <CoachDashboard coach={currentUser} athletes={ROSTER} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard athlete={currentUser} sessions={sessions} onLogWorkout={() => setIsLogOpen(true)} />;
      case 'history':
        return <History sessions={sessions} />;
      case 'coach':
        return <CoachChat athlete={currentUser} sessions={sessions} />;
      case 'integrations':
        return <Integrations user={currentUser} onToggle={toggleIntegration} />;
      default:
        return <Dashboard athlete={currentUser} sessions={sessions} onLogWorkout={() => setIsLogOpen(true)} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      
      {isLogOpen && (
        <WorkoutLog 
          onClose={() => setIsLogOpen(false)} 
          onSave={handleSaveWorkout} 
        />
      )}
    </Layout>
  );
};

export default App;
