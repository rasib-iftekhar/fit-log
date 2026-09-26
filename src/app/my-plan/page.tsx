"use client";

import Link from "next/link";
import { useWorkoutContext } from "@/context/WorkoutContext";

export default function MyPlanPage() {
	const { todaysWorkoutPlan, savedWorkouts } = useWorkoutContext();

	return (
		<main className="min-h-[70vh] bg-[#111318] px-4 py-10 text-white sm:px-8 lg:px-10">
			<div className="mx-auto max-w-4xl">
				<h1 className="text-4xl font-black uppercase tracking-tight">My Plan</h1>
				<p className="mt-3 text-gray-300">
					{todaysWorkoutPlan.length} planned workout(s) and {savedWorkouts.length} saved workout(s).
				</p>
				<Link
					href="/"
					className="mt-6 inline-flex rounded-xl bg-[#a6e22e] px-5 py-3 text-sm font-bold uppercase tracking-wide text-black"
				>
					Browse workouts
				</Link>
			</div>
		</main>
	);
}
