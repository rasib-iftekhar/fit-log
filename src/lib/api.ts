import { API_URL } from "./routes";

const WORKOUTS_CACHE_KEY = "fitlog-workouts-cache";
const REQUEST_TIMEOUT_MS = 8000;

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

function getCachedWorkouts(): Workout[] {
  if (typeof window === "undefined") return [];

  try {
    const cached = window.localStorage.getItem(WORKOUTS_CACHE_KEY);
    if (!cached) return [];

    const parsed: unknown = JSON.parse(cached);
    return Array.isArray(parsed) ? (parsed as Workout[]) : [];
  } catch {
    window.localStorage.removeItem(WORKOUTS_CACHE_KEY);
    return [];
  }
}

function cacheWorkouts(workouts: Workout[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(WORKOUTS_CACHE_KEY, JSON.stringify(workouts));
  } catch {
    // Storage can be unavailable in private browsing or when it is full.
  }
}

async function fetchWithTimeout(input: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, { cache: "no-store", signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetchWithTimeout(API_URL);

    if (!response.ok) {
      throw new Error(`Workout API returned ${response.status}`);
    }

    const data = await response.json();
    const workouts = Array.isArray(data) ? data : data?.value ?? [];

    if (!Array.isArray(workouts)) {
      throw new Error("Workout API returned an invalid response");
    }

    cacheWorkouts(workouts);
    return workouts;
  } catch {
    return getCachedWorkouts();
  }
}

export async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  const data = await response.json();
  return data?.value ?? data;
}