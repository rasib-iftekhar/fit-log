import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 bg-[#111318] py-5 text-gray-400">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 text-xs sm:px-8 lg:px-10 sm:text-sm">
        <Link href={ROUTES.home} className="flex items-center gap-2 text-white">
          <Dumbbell className="h-5 w-5 -rotate-45 text-[#a6e22e]" />
          <span className="font-oswald font-extrabold uppercase tracking-wider">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-gray-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;