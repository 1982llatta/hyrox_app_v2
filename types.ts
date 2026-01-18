
export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum UserRole {
  ATHLETE = 'athlete',
  COACH = 'coach'
}

export enum FitnessTrend {
  IMPROVING = 'improving',
  STABLE = 'stable',
  DECLINING = 'declining'
}

export enum SessionType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  INTERVAL = 'interval',
  ENDURANCE = 'endurance',
  SKILL = 'skill',
  SIMULATION = 'simulation'
}

export enum TrainingGoal {
  RACE_PEAK = 'Race Peak / Competition Prep',
  STRENGTH_BASE = 'Strength & Power Base',
  AEROBIC_ENGINE = 'Aerobic Engine / Endurance',
  TRANSITION_SPEED = 'Station Transitions & Skills'
}

export interface StrengthSet {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface CardioMetrics {
  distance: number;
  pace: string;
  avgHeartRate?: number;
}

export interface TrainingSession {
  id: string;
  athlete_id: string;
  session_type: SessionType;
  duration_minutes: number;
  intensity_level: number;
  performance_score: number;
  notes?: string;
  workout_date: string;
  created_at: string;
  strength_data?: StrengthSet[];
  cardio_data?: CardioMetrics;
}

export interface PlanDay {
  day: string;
  title: string;
  type: SessionType | 'rest';
  description: string;
  duration: string;
  exercises?: string[];
}

export interface TrainingPlan {
  id: string;
  athlete_id: string;
  goal: string;
  created_at: string;
  days: PlanDay[];
}

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  experience_level?: ExperienceLevel;
  age?: number;
  gender?: string;
  location?: string;
  hyrox_pb?: string;
  fitness_score: number;
  fitness_trend: FitnessTrend;
  integrations: {
    strava: boolean;
    garmin: boolean;
  };
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
