import Hero from '@/components/layout/Hero';
import WorkoutLibrary from '@/components/home/WorkoutLibrary';

export default function Home() {
  return (
    <main className="bg-[#111318]">
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}
