
export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum UserRole {
  ATHLETE = 'athlete',
  COACH = 'coach'
}

export enum SessionType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  INTERVAL = 'interval',
  ENDURANCE = 'endurance',
  SKILL = 'skill',
  SIMULATION = 'simulation'
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
  // Detailed metrics
  strength_data?: StrengthSet[];
  cardio_data?: CardioMetrics;
}

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  experience_level?: ExperienceLevel;
  age?: number;
  gender?: string;
  hyrox_pb?: string;
  fitness_score: number;
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
