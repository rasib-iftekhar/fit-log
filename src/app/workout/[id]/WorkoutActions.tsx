"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkoutContext, type WorkoutEntry } from "@/context/WorkoutContext";

export default function WorkoutActions({ workout }: { workout: WorkoutEntry }) {
  const { todaysWorkoutPlan, savedWorkouts, addToTodaysPlan, saveForLater, removeFromSaved } = useWorkoutContext();
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));
  const planIsFull = todaysWorkoutPlan.length >= 5;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        disabled={planIsFull}
        title={planIsFull ? "Today's plan is full" : undefined}
        onClick={() => {
          const added = addToTodaysPlan(workout);
          toast[added ? "success" : "error"](
            added ? "Added to today's plan" : "This workout is already in your plan or the plan is full",
          );
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-[#a6e22e] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-[#c3f23c] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus className="h-4 w-4" />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => {
          if (isSaved) {
            removeFromSaved(workout.id);
            toast.success("Removed from saved workouts");
            return;
          }
          const saved = saveForLater(workout);
          toast.success(saved ? "Saved for later" : "This workout is already saved");
        }}
        className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-extrabold uppercase tracking-wide transition ${isSaved ? "border-[#a6e22e] bg-[#22281b] text-[#a6e22e]" : "border-gray-700 bg-transparent text-white hover:border-gray-500 hover:bg-[#1d232a]"}`}
      >
        <Bookmark className="h-4 w-4" />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
