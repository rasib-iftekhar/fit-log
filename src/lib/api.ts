import { API_URL } from "./routes";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data?.value ?? [];
}

export async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  const data = await response.json();
  return data?.value ?? data;
}