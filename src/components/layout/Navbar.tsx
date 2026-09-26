'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WorkoutContext } from '@/context/WorkoutContext';
import { ROUTES } from '@/lib/routes';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const context = useContext(WorkoutContext);
  const todaysWorkoutPlan = context?.todaysWorkoutPlan ?? [];
  const savedWorkouts = context?.savedWorkouts ?? [];

  const isMyPlanActive = pathname === ROUTES.myPlan;
  const isWorkoutsActive = !isMyPlanActive;

  const getTabClass = (isActive: boolean) =>
    isActive
      ? 'bg-[#22281b] text-[#a6e22e]'
      : 'text-gray-400 hover:text-white';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#111318] text-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        {/* Logo */}
        <div className="flex min-w-[180px] items-center justify-start">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={24}
              priority
              className="h-6 w-6 object-contain"
            />
            <span className="font-oswald text-xl font-extrabold uppercase tracking-wider text-white">
              FIT<span className="text-[#a6e22e]">LOG</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="relative hidden min-w-[260px] items-center justify-center p-1 md:flex">
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#22281b] transition-transform duration-300 ease-out ${
              isWorkoutsActive ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
          <Link
            href={ROUTES.home}
            className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-300 ${getTabClass(isWorkoutsActive)}`}
          >
            Workouts
          </Link>
          <Link
            href={ROUTES.myPlan}
            className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-300 ${getTabClass(isMyPlanActive)}`}
          >
            My Plan
          </Link>
        </nav>

        {/* Desktop Counters */}
        <div className="hidden min-w-[180px] items-center justify-end gap-6 text-sm font-medium md:flex">
          <Link href={ROUTES.myPlan} className="flex items-center gap-2 text-gray-300 hover:text-white">
            <span>Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a6e22e] text-xs font-bold text-black">
              {todaysWorkoutPlan.length}
            </span>
          </Link>
          <Link href={ROUTES.myPlan} className="flex items-center gap-2 text-gray-300 hover:text-white">
            <span>Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-xs font-bold text-gray-300">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-xl text-gray-300"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#111318] p-4 space-y-4">
          <nav className="relative flex bg-[#1a1d24] p-1 rounded-xl border border-gray-800 overflow-hidden">
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-[#22281b] transition-transform duration-300 ease-out ${
                isWorkoutsActive ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
            <Link
              href={ROUTES.home}
              onClick={() => setIsOpen(false)}
              className={`relative z-10 flex-1 py-2 rounded-lg text-sm font-semibold text-center transition-colors duration-300 ${getTabClass(isWorkoutsActive)}`}
            >
              Workouts
            </Link>
            <Link
              href={ROUTES.myPlan}
              onClick={() => setIsOpen(false)}
              className={`relative z-10 flex-1 py-2 rounded-lg text-sm font-semibold text-center transition-colors duration-300 ${getTabClass(isMyPlanActive)}`}
            >
              My Plan
            </Link>
          </nav>

          <div className="flex justify-around pt-2 border-t border-gray-800/60 text-sm">
            <Link href={ROUTES.myPlan} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gray-300">
              <span>Plan</span>
              <span className="bg-[#a6e22e] text-black font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {todaysWorkoutPlan.length}
              </span>
            </Link>
            <Link href={ROUTES.myPlan} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gray-300">
              <span>Saved</span>
              <span className="border border-gray-700 text-gray-300 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {savedWorkouts.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;