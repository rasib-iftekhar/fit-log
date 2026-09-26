import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="w-full bg-[#111318] pb-10 pt-6 text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-10">
        <div className="flex min-h-[500px] flex-col items-center justify-center gap-8 rounded-[22px] border border-gray-800/80 bg-[#171b20] p-6 sm:min-h-[540px] sm:p-10 lg:grid lg:grid-cols-2 lg:gap-4 lg:p-12">
          <div className="flex w-full max-w-[560px] flex-col justify-center lg:pl-2">
            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#a6e22e]">
              WORKOUT LIBRARY
            </span>

            <h1 className="font-oswald text-2xl font-bold uppercase leading-[0.95] tracking-wide text-white sm:text-4xl lg:text-[3.15rem]">
              <span className="block whitespace-nowrap">TRAIN WITH INTENT.</span>
              <span className="block whitespace-nowrap">LOG EVERY SET.</span>
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-relaxed text-gray-400 sm:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="mt-8">
              <a
                href="#library"
                className="inline-flex items-center gap-2 rounded-xl bg-[#a6e22e] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition hover:bg-[#b9f129]"
              >
                Browse Workouts
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex w-full items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              <Image
                src="/hero-machine.png"
                alt="FitLog Workout Companion"
                priority
                width={700}
                height={700}
                className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;