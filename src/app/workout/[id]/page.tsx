import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkout, type Workout } from "@/lib/api";
import WorkoutActions from "./WorkoutActions";
import type { WorkoutEntry } from "@/context/WorkoutContext";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let workout: Workout | undefined;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  if (!workout) {
    notFound();
  }

  const workoutEntry: WorkoutEntry = {
    id: workout.id,
    name: workout.name,
    image: workout.image,
    equipment: workout.equipment,
    difficulty: workout.difficulty,
    duration: workout.duration,
    caloriesBurned: workout.caloriesBurned,
    rating: workout.rating,
    muscleGroups: workout.muscleGroups,
    description: workout.description,
    instructions: workout.instructions,
  };

  return (
    <main className="min-h-[70vh] bg-[#111318] px-4 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a6e22e]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-[20px] border border-gray-800 bg-[#171b20] lg:min-h-[520px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="rounded-[20px] border border-gray-800 bg-[#171b20] p-5 sm:p-6 lg:p-7">
            <h1 className="text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-[2.1rem]">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-[15px]">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {workout.muscleGroups.map((group: string) => (
                <span
                  key={group}
                  className="rounded-full bg-[#b7f240] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-gray-800 bg-[#111318]">
              <div className="grid grid-cols-[115px_1fr] border-b border-gray-800 text-xs last:border-b-0 sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Equipment</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.equipment}
                </div>
              </div>
              <div className="grid grid-cols-[115px_1fr] border-b border-gray-800 text-xs last:border-b-0 sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Difficulty</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.difficulty}
                </div>
              </div>
              <div className="grid grid-cols-[115px_1fr] border-b border-gray-800 text-xs last:border-b-0 sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Sets</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.sets}
                </div>
              </div>
              <div className="grid grid-cols-[115px_1fr] border-b border-gray-800 text-xs last:border-b-0 sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Reps</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.reps}
                </div>
              </div>
              <div className="grid grid-cols-[115px_1fr] border-b border-gray-800 text-xs last:border-b-0 sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Duration</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.duration} min
                </div>
              </div>
              <div className="grid grid-cols-[115px_1fr] border-b border-gray-800 text-xs last:border-b-0 sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Calories</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.caloriesBurned} kcal
                </div>
              </div>
              <div className="grid grid-cols-[115px_1fr] text-xs sm:grid-cols-[125px_1fr]">
                <div className="px-3 py-2.5 font-bold uppercase tracking-[0.14em] text-gray-500">Rating</div>
                <div className="border-l border-gray-800 px-3 py-2.5 text-right font-semibold text-white sm:text-left">
                  {workout.rating.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-3 text-xl font-black uppercase tracking-[0.1em] text-white">
                Instructions
              </h2>
                <ol className="space-y-2 text-sm leading-relaxed text-gray-300">
                {workout.instructions.map((step: string, index: number) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#a6e22e] text-[10px] font-black text-black">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workoutEntry} />
          </div>
        </div>
      </div>
    </main>
  );
}
