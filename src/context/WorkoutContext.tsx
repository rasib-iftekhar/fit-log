"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Workout = {
  id: string;
  name: string;
};

type WorkoutContextType = {
  workouts: Workout[];
  todaysWorkoutPlan: Workout[];
  savedWorkouts: Workout[];
  addWorkout: (name: string) => void;
};

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export default function WorkoutContextProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [todaysWorkoutPlan] = useState<Workout[]>([]);
  const [savedWorkouts] = useState<Workout[]>([]);

  const addWorkout = (name: string) => {
    if (!name.trim()) return;

    const nextWorkout = {
      id: `${Date.now()}-${Math.random()}`,
      name: name.trim(),
    };

    setWorkouts((current) => [...current, nextWorkout]);
  };

  const value = useMemo<WorkoutContextType>(
    () => ({
      workouts,
      todaysWorkoutPlan,
      savedWorkouts,
      addWorkout,
    }),
    [workouts, todaysWorkoutPlan, savedWorkouts],
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
