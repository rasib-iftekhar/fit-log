"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Clock3, Flame, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getWorkouts, type Workout } from "@/lib/api";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const fetched = await getWorkouts();
        if (isMounted) {
          setWorkouts(fetched);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const next = workouts.filter((workout) =>
      [workout.name, workout.equipment, ...workout.muscleGroups]
        .some((value) => value.toLowerCase().includes(query)),
    );

    next.sort((a, b) => {
      switch (sortBy) {
        case "calories":
          return b.caloriesBurned - a.caloriesBurned;
        case "rating":
          return b.rating - a.rating;
        case "duration":
        default:
          return b.duration - a.duration;
      }
    });

    return next;
  }, [searchQuery, sortBy, workouts]);

  return (
    <section id="library" className="w-full scroll-mt-20 bg-[#111318] pb-10 text-white">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-[-0.06em] text-white">
              THE LIBRARY
            </h2>
            <p className="mt-2 text-base text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end lg:w-auto">
            <label className="block w-full sm:w-[250px]">
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                Search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Name or muscle tag"
                className="mt-2 w-full rounded-full border border-gray-700 bg-[#1a1d24] px-4 py-2.5 text-sm font-medium text-white outline-none placeholder:text-gray-500 transition focus:border-[#a6e22e]"
              />
            </label>
            <div className="relative w-full sm:w-[220px]">
              <label className="block text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                Sort By
              </label>
              <div className="relative mt-2">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                  className="w-full appearance-none rounded-full border border-gray-700 bg-[#1a1d24] px-4 py-2.5 pr-10 text-sm font-medium text-white outline-none transition focus:border-[#a6e22e]"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-[20px] border border-gray-800 bg-[#171b20]"
              >
                <div className="h-60 bg-gray-800/70" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-20 rounded-full bg-gray-800/70" />
                  <div className="h-6 w-3/4 rounded bg-gray-800/70" />
                  <div className="h-4 w-1/2 rounded bg-gray-800/60" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout: Workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group overflow-hidden rounded-[22px] border border-gray-800 bg-[#171b20] shadow-[0_10px_24px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-1 hover:border-[#2d353d]"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#0f1418]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.slice(0, 2).map((group) => (
                      <span
                        key={group}
                        className="rounded-full bg-[#b7f240] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-[1.05rem] font-black uppercase leading-tight tracking-[-0.04em] text-white">
                      {workout.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{workout.equipment}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-800 pt-3 text-[12px] text-gray-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-[#a6e22e]" />
                      {workout.duration} min
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-[#a6e22e]" />
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-[#a6e22e] text-[#a6e22e]" />
                      {workout.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
