import Link from 'next/link';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const NotFound = () => {
  return (
    <main className="w-full bg-[#111318] text-white min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="keep-content-center max-w-md w-full text-center space-y-6">
        
        {/* Visual Badge Container */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#181a20] border border-gray-800 rotate-6 transition-transform hover:rotate-0" />
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#181a20] border border-gray-700/80 flex items-center justify-center text-[#a6e22e] shadow-xl">
            <Dumbbell className="h-8 w-8" />
          </div>
        </div>

        {/* Dynamic 404 Text */}
        <div className="space-y-2">
          <span className="text-[#a6e22e] text-xs font-black uppercase tracking-widest bg-[#181a20] px-3 py-1 rounded-full border border-gray-800">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide pt-2">
            PAGE OUT OF REACH
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
            The lift or page you are looking for doesn&apos;t exist or has been removed from today&apos;s routine.
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-2">
          <Link
            href={ROUTES.home}
            className="inline-flex items-center gap-2 bg-[#a6e22e] text-black font-extrabold text-xs px-6 py-3.5 rounded-xl hover:bg-[#95ce28] transition-colors uppercase tracking-wider shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workouts
          </Link>
        </div>

      </div>
    </main>
  );
};

export default NotFound;