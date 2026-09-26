"use client";

import {
  createContext,
  useContext,
  useMemo,
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
  addToTodaysPlan: (workout: WorkoutEntry) => void;
  saveForLater: (workout: WorkoutEntry) => void;
};

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export default function WorkoutContextProvider({ children }: { children: ReactNode }) {
  const [todaysWorkoutPlan, setTodaysWorkoutPlan] = useState<WorkoutEntry[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutEntry[]>([]);

  const addToTodaysPlan = (workout: WorkoutEntry) => {
    setTodaysWorkoutPlan((current) => {
      const exists = current.some((item) => String(item.id) === String(workout.id));
      return exists ? current : [...current, workout];
    });
  };

  const saveForLater = (workout: WorkoutEntry) => {
    setSavedWorkouts((current) => {
      const exists = current.some((item) => String(item.id) === String(workout.id));
      return exists ? current : [...current, workout];
    });
  };

  const value = useMemo<WorkoutContextType>(
    () => ({
      todaysWorkoutPlan,
      savedWorkouts,
      addToTodaysPlan,
      saveForLater,
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
