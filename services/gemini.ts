
import { GoogleGenAI } from "@google/genai";
import { Message, UserProfile, TrainingSession } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCoachAlexResponse(
  prompt: string, 
  history: Message[], 
  athlete: UserProfile, 
  recentWorkouts: TrainingSession[]
) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: 'user',
        parts: [{ text: `
          You are Coach Alex, an elite Hyrox training coach and performance scientist.
          User Context:
          - Name: ${athlete.full_name}
          - Experience: ${athlete.experience_level || 'General'}
          - Fitness Score: ${athlete.fitness_score}/100
          - PB: ${athlete.hyrox_pb || 'Unknown'}
          - Integrations: Strava (${athlete.integrations.strava ? 'Connected' : 'Disconnected'}), Garmin (${athlete.integrations.garmin ? 'Connected' : 'Disconnected'})
          
          Training Data (Granular):
          ${JSON.stringify(recentWorkouts.slice(0, 5))}

          Mission:
          1. Analyze the detailed strength (sets/reps) and cardio (pace/HR) data.
          2. If Strava/Garmin are connected, simulate analysis of recent external runs/HRV.
          3. Identify overtraining (if RPE is high vs performance).
          4. Suggest specific Hyrox stations to focus on based on modality gaps.
          5. Keep tone: Direct, encouraging, data-obsessed, and professional.
          
          Current Inquiry: ${prompt}
        `}]
      }
    ],
    config: {
      temperature: 0.75,
      topP: 0.9,
    }
  });

  return response.text;
}
