
import { GoogleGenAI, Type } from "@google/genai";
import { Message, UserProfile, TrainingSession, TrainingPlan } from "../types";

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
          Persona: You are "Coach Alex", a world-class Hyrox training coach and performance scientist.
          Personality: Supportive, motivating, data-obsessed, direct but approachable. explained concepts simply.
          
          Athlete Stats:
          - Name: ${athlete.full_name}
          - Level: ${athlete.experience_level || 'General'}
          - Location: ${athlete.location || 'Unknown'}
          - Fitness Score: ${athlete.fitness_score}/100
          - PB: ${athlete.hyrox_pb || 'Unknown'}
          - Trend: ${athlete.fitness_trend}
          - Integrations: Strava (${athlete.integrations.strava ? 'Connected' : 'Disconnected'}), Garmin (${athlete.integrations.garmin ? 'Connected' : 'Disconnected'})
          
          Granular Training Logs (Last 5):
          ${JSON.stringify(recentWorkouts.slice(0, 5))}

          Coaching Protocol:
          1. Contextual Awareness: Acknowledge recent sessions or fitness score shifts.
          2. Actionable Insights: Provide specific workout plans, technique cues (for the 8 Hyrox stations), or recovery windows.
          3. Safety Guardrails: 
             - If the user mentions injury/pain: Advise seeing a sports medicine professional. 
             - If user shows overtraining: Recommend rest.
             - Never give medical advice.
          4. Format: Use clear bullet points for workouts. Keep responses concise but impactful.
          5. Integration Analysis: If Strava is connected, mention that you are analyzing their segments or aerobic threshold.

          Current In-App History:
          ${history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}
          
          User Inquiry: ${prompt}
        `}]
      }
    ],
    config: {
      temperature: 0.7,
      topP: 0.9,
    }
  });

  return response.text;
}

export async function generateTrainingPlan(
  athlete: UserProfile,
  sessions: TrainingSession[],
  goal: string = "Optimize Hyrox race performance"
): Promise<TrainingPlan> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{
      parts: [{
        text: `Generate a personalized 7-day Hyrox training plan for an ${athlete.experience_level} athlete named ${athlete.full_name}. 
        Goal: ${goal}.
        Recent Fitness Score: ${athlete.fitness_score}.
        Recent History (Last 5): ${JSON.stringify(sessions.slice(0, 5))}.
        Ensure the plan includes a mix of Strength, Cardio, Interval, and Simulation as appropriate for their level.
        Return the result in JSON format.`
      }]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          goal: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                title: { type: Type.STRING },
                type: { type: Type.STRING, description: "One of: strength, cardio, interval, endurance, skill, simulation, rest" },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                exercises: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["day", "title", "type", "description", "duration"]
            }
          }
        },
        required: ["id", "goal", "days"]
      }
    }
  });

  const rawJson = JSON.parse(response.text);
  return {
    ...rawJson,
    athlete_id: athlete.id,
    created_at: new Date().toISOString()
  } as TrainingPlan;
}
