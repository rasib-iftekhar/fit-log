"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkoutContext, type WorkoutEntry } from "@/context/WorkoutContext";

export default function WorkoutActions({ workout }: { workout: WorkoutEntry }) {
  const { addToTodaysPlan, saveForLater } = useWorkoutContext();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => {
          addToTodaysPlan(workout);
          toast.success("Added to today's plan");
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-[#a6e22e] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-[#c3f23c]"
      >
        <CalendarPlus className="h-4 w-4" />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => {
          saveForLater(workout);
          toast.success("Saved for later");
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-transparent px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-gray-500 hover:bg-[#1d232a]"
      >
        <Bookmark className="h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}
