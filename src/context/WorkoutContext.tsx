"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type WorkoutEntry = {
  id: number | string;
  name: string;
  image?: string;
  equipment?: string;
  difficulty?: string;
  duration?: number;
  caloriesBurned?: number;
  rating?: number;
  muscleGroups?: string[];
  description?: string;
  instructions?: string[];
};

type WorkoutContextType = {
  todaysWorkoutPlan: WorkoutEntry[];
  savedWorkouts: WorkoutEntry[];
  addToTodaysPlan: (workout: WorkoutEntry) => boolean;
  saveForLater: (workout: WorkoutEntry) => boolean;
  removeFromTodaysPlan: (workoutId: number | string) => void;
  removeFromSaved: (workoutId: number | string) => void;
};

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export default function WorkoutContextProvider({ children }: { children: ReactNode }) {
  const [todaysWorkoutPlan, setTodaysWorkoutPlan] = useState<WorkoutEntry[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutEntry[]>([]);
  const hasHydrated = useRef(false);

  useEffect(() => {
    try {
      const storedPlan = window.localStorage.getItem("fitlog-plan");
      const storedSaved = window.localStorage.getItem("fitlog-saved");
      if (storedPlan) setTodaysWorkoutPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
    } catch {
      window.localStorage.removeItem("fitlog-plan");
      window.localStorage.removeItem("fitlog-saved");
    } finally {
      hasHydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) return;
    window.localStorage.setItem("fitlog-plan", JSON.stringify(todaysWorkoutPlan));
    window.localStorage.setItem("fitlog-saved", JSON.stringify(savedWorkouts));
  }, [todaysWorkoutPlan, savedWorkouts]);

  const addToTodaysPlan = (workout: WorkoutEntry) => {
    const exists = todaysWorkoutPlan.some((item) => String(item.id) === String(workout.id));
    if (exists || todaysWorkoutPlan.length >= 5) return false;

    setTodaysWorkoutPlan((current) => [...current, workout]);
    return true;
  };

  const saveForLater = (workout: WorkoutEntry) => {
    const exists = savedWorkouts.some((item) => String(item.id) === String(workout.id));
    if (exists) return false;

    setSavedWorkouts((current) => [...current, workout]);
    return true;
  };

  const removeFromTodaysPlan = (workoutId: number | string) => {
    setTodaysWorkoutPlan((current) =>
      current.filter((workout) => String(workout.id) !== String(workoutId)),
    );
  };

  const removeFromSaved = (workoutId: number | string) => {
    setSavedWorkouts((current) =>
      current.filter((workout) => String(workout.id) !== String(workoutId)),
    );
  };

  const value = useMemo<WorkoutContextType>(
    () => ({
      todaysWorkoutPlan,
      savedWorkouts,
      addToTodaysPlan,
      saveForLater,
      removeFromTodaysPlan,
      removeFromSaved,
    }),
    [todaysWorkoutPlan, savedWorkouts],
  );

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutContextProvider");
  }

  return context;
}
