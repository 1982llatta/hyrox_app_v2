
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CoachDashboard from './components/CoachDashboard';
import WorkoutLog from './components/WorkoutLog';
import CoachChat from './components/CoachChat';
import History from './components/History';
import Integrations from './components/Integrations';
import TrainingPlans from './components/TrainingPlans';
import Auth from './components/Auth';
import { ExperienceLevel, TrainingSession, UserProfile, UserRole, SessionType, FitnessTrend, TrainingPlan } from './types';

// Enhanced Mock Data as per PRD specifications
const MOCK_ATHLETE: UserProfile = {
  id: 'user_1',
  full_name: 'Luca',
  role: UserRole.ATHLETE,
  experience_level: ExperienceLevel.INTERMEDIATE,
  age: 30,
  gender: 'male',
  location: 'London, UK',
  hyrox_pb: '01:15:20',
  fitness_score: 84,
  fitness_trend: FitnessTrend.IMPROVING,
  integrations: {
    strava: true,
    garmin: false
  }
};

const MOCK_COACH: UserProfile = {
  id: 'coach_1',
  full_name: 'Coach Alex',
  role: UserRole.COACH,
  fitness_score: 100,
  fitness_trend: FitnessTrend.STABLE,
  integrations: { strava: true, garmin: true }
};

const INITIAL_SESSIONS: TrainingSession[] = [
  {
    id: 's_1',
    athlete_id: 'user_1',
    session_type: SessionType.SIMULATION,
    duration_minutes: 105,
    intensity_level: 9,
    performance_score: 88,
    notes: 'Simulation of race day. Felt strong on sled push, need to optimize transition to burpees.',
    workout_date: new Date().toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 's_2',
    athlete_id: 'user_1',
    session_type: SessionType.CARDIO,
    duration_minutes: 45,
    intensity_level: 6,
    performance_score: 75,
    notes: 'Recovery run at zone 2 pace.',
    workout_date: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

const ROSTER: UserProfile[] = [
  MOCK_ATHLETE,
  { id: 'user_2', full_name: 'Sarah Miles', role: UserRole.ATHLETE, experience_level: ExperienceLevel.ADVANCED, fitness_score: 92, fitness_trend: FitnessTrend.IMPROVING, hyrox_pb: '01:08:45', integrations: { strava: true, garmin: true } },
  { id: 'user_3', full_name: 'Tom Power', role: UserRole.ATHLETE, experience_level: ExperienceLevel.BEGINNER, fitness_score: 65, fitness_trend: FitnessTrend.STABLE, hyrox_pb: '', integrations: { strava: false, garmin: false } }
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [sessions, setSessions] = useState<TrainingSession[]>(INITIAL_SESSIONS);
  const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role === UserRole.ATHLETE ? MOCK_ATHLETE : MOCK_COACH);
    setIsLoggedIn(true);
  };

  const toggleIntegration = (platform: 'strava' | 'garmin') => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      integrations: { ...currentUser.integrations, [platform]: !currentUser.integrations[platform] }
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
        return <Dashboard athlete={currentUser} sessions={sessions} onLogWorkout={() => setIsLogOpen(true)} onNavigate={setActiveTab} />;
      case 'plans':
        return <TrainingPlans athlete={currentUser} sessions={sessions} currentPlan={currentPlan} onUpdatePlan={setCurrentPlan} onLogWorkout={() => setIsLogOpen(true)} />;
      case 'history':
        return <History sessions={sessions} />;
      case 'coach':
        return <CoachChat athlete={currentUser} sessions={sessions} />;
      case 'integrations':
        return <Integrations user={currentUser} onToggle={toggleIntegration} />;
      default:
        return <Dashboard athlete={currentUser} sessions={sessions} onLogWorkout={() => setIsLogOpen(true)} onNavigate={setActiveTab} />;
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
