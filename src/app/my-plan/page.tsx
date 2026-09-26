"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, ChevronDown, Clock3, Flame, Star, X } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkoutContext, type WorkoutEntry } from "@/context/WorkoutContext";

interface HorizontalCardProps {
  workout: WorkoutEntry;
  onRemove?: (id: number | string) => void;
  onToggleComplete?: (id: number | string) => void;
  isCompleted?: boolean;
}

function HorizontalCard({ workout, onRemove, onToggleComplete, isCompleted = false }: HorizontalCardProps) {
  const handleRemove = () => {
    onRemove?.(workout.id);
    toast.success("Workout removed");
  };

  const handleToggle = () => {
    onToggleComplete?.(workout.id);
    toast[isCompleted ? "error" : "success"](
      isCompleted ? "Workout marked as incomplete" : "Workout marked as done",
    );
  };

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-gray-800/80 bg-[#181a20] p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#111318] sm:h-24 sm:w-36">
        {workout.image ? <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" /> : null}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="font-oswald text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">{workout.name}</h2>
        <p className="mt-1 text-sm text-gray-400">{workout.equipment ?? "Bodyweight"}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-300">
          <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-[#a6e22e]" />{workout.duration ?? 0} min</span>
          <span className="inline-flex items-center gap-1.5"><Flame className="h-4 w-4 text-[#a6e22e]" />{workout.caloriesBurned ?? 0} kcal</span>
          <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-[#a6e22e] text-[#a6e22e]" />{(workout.rating ?? 0).toFixed(1)}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link href={`/workout/${workout.id}`} className="inline-flex items-center rounded-full border border-gray-400 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#a6e22e] hover:text-[#a6e22e]">
          View Details
        </Link>
        {onToggleComplete ? (
          <button type="button" onClick={handleToggle} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${isCompleted ? "border border-gray-700 bg-gray-800 text-gray-400" : "bg-[#b8f200] text-black hover:bg-[#c8ff31]"}`}>
            <Check className="h-3.5 w-3.5" /> {isCompleted ? "Done" : "Mark as Done"}
          </button>
        ) : null}
        <button type="button" onClick={handleRemove} aria-label={`Remove ${workout.name}`} className="p-1 text-gray-300 transition hover:text-[#a6e22e]">
          <X className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function MyPlanPage() {
  const { todaysWorkoutPlan, savedWorkouts, removeFromTodaysPlan, removeFromSaved } = useWorkoutContext();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const isSaved = activeTab === "saved";
  const workouts = isSaved ? savedWorkouts : todaysWorkoutPlan;
  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = !query ? [...workouts] : workouts.filter((workout) =>
      [workout.name, workout.equipment, ...(workout.muscleGroups ?? [])]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query)),
    );
    const getSortValue = (workout: WorkoutEntry) => {
      if (sortBy === "calories") return workout.caloriesBurned ?? 0;
      return workout[sortBy] ?? 0;
    };
    return filtered.sort((first, second) => getSortValue(second) - getSortValue(first));
  }, [searchQuery, sortBy, workouts]);
  const totalMinutes = todaysWorkoutPlan.reduce((total, workout) => total + (Number(workout.duration) || 0), 0);
  const totalCalories = todaysWorkoutPlan.reduce((total, workout) => total + (Number(workout.caloriesBurned) || 0), 0);

  return (
    <main className="min-h-[70vh] bg-[#101114] px-4 py-10 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1175px]">
        <header>
          <h1 className="font-oswald text-4xl uppercase tracking-wide text-white sm:text-5xl">My Plan</h1>
          <p className="mt-2 text-base text-gray-300">Cap of five lifts for today. Finish them, then load more.</p>
        </header>

        <section className="mt-8 grid grid-cols-3 divide-x divide-gray-800/80 rounded-2xl border border-gray-800/80 bg-[#1a1c22] p-5 sm:p-6">
          <div className="space-y-1 px-1 sm:px-0"><span className="block text-xs font-medium text-gray-400">Exercises</span><span className="text-4xl font-black text-[#a6e22e]">{todaysWorkoutPlan.length}</span></div>
          <div className="space-y-1 pl-4 sm:pl-8"><span className="block text-xs font-medium text-gray-400">Minutes</span><span className="text-4xl font-black text-white">{totalMinutes}</span></div>
          <div className="space-y-1 pl-4 sm:pl-8"><span className="block text-xs font-medium text-gray-400">Calories</span><span className="text-4xl font-black text-white">{totalCalories}</span></div>
        </section>

        <div className="mt-10 flex w-fit items-center rounded-xl bg-[#1a1c22] p-1.5">
          <button type="button" onClick={() => setActiveTab("plan")} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${!isSaved ? "bg-[#22281b] text-[#a6e22e]" : "text-gray-400 hover:text-white"}`}>Today&apos;s Plan</button>
          <button type="button" onClick={() => setActiveTab("saved")} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${isSaved ? "bg-[#22281b] text-[#a6e22e]" : "text-gray-400 hover:text-white"}`}>Saved</button>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <label className="block max-w-md flex-1">
            <span className="sr-only">Search workouts</span>
            <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search by workout name or tag" className="w-full rounded-xl border border-gray-800 bg-[#1a1c22] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#a6e22e]" />
          </label>
          <label className="relative block w-full sm:max-w-[335px]">
            <span className="mb-1 block text-sm font-medium text-gray-300">Sort By</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="w-full appearance-none rounded-xl border border-gray-700 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-[#a6e22e]">
              <option value="duration" className="bg-[#181a20]">Duration</option>
              <option value="calories" className="bg-[#181a20]">Calories</option>
              <option value="rating" className="bg-[#181a20]">Rating</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 text-gray-300" />
          </label>
        </div>

        {filteredWorkouts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-800/80 bg-[#1a1c22] px-6 py-12 text-center">
            <h2 className="font-oswald text-xl uppercase text-white">Nothing Here Yet</h2>
            <p className="mt-3 text-gray-300">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-7 inline-flex rounded-xl bg-[#b8f200] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#c8ff31]">Go to workouts</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5">
            {filteredWorkouts.map((workout) => {
              const workoutId = String(workout.id);
              return <HorizontalCard
                key={workoutId}
                workout={workout}
                isCompleted={completedIds.has(workoutId)}
                onToggleComplete={!isSaved ? (id) => setCompletedIds((current) => {
                  const next = new Set(current);
                  const key = String(id);
                  if (next.has(key)) next.delete(key);
                  else next.add(key);
                  return next;
                }) : undefined}
                onRemove={(id) => {
                  if (isSaved) removeFromSaved(id);
                  else removeFromTodaysPlan(id);
                }}
              />;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
