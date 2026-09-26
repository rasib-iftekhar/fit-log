const HomeLoading = () => {
  return (
    <main className="w-full bg-[#111318] text-white animate-pulse overflow-hidden">
      {/* Hero Section Skeleton */}
      <section className="pt-6 pb-10">
        <div className="keep-content-center">
          <div className="bg-[#181a20] border border-gray-800/80 rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Hero Text Skeleton */}
            <div className="flex-1 w-full space-y-4">
              <div className="h-4 w-32 bg-gray-800/80 rounded" />
              <div className="space-y-2">
                <div className="h-8 sm:h-10 lg:h-12 w-full bg-gray-800/80 rounded" />
                <div className="h-8 sm:h-10 lg:h-12 w-3/4 bg-gray-800/80 rounded" />
              </div>
              <div className="space-y-2 pt-1">
                <div className="h-4 w-full bg-gray-800/50 rounded" />
                <div className="h-4 w-4/5 bg-gray-800/50 rounded" />
              </div>
              <div className="pt-3">
                <div className="h-11 w-44 bg-gray-800/80 rounded-md" />
              </div>
            </div>

            {/* Right Hero Image Skeleton */}
            <div className="flex-1 w-full max-w-sm lg:max-w-md h-56 sm:h-72 bg-gray-800/60 rounded-xl" />
          </div>
        </div>
      </section>

      {/* Library Section Skeleton */}
      <section className="py-10">
        <div className="keep-content-center">
          {/* Header Skeleton */}
          <div className="space-y-2 mb-8">
            <div className="h-8 w-48 bg-gray-800/80 rounded" />
            <div className="h-4 w-72 bg-gray-800/50 rounded" />
          </div>

          {/* Vertical Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-[#181a20] border border-gray-800/80 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Skeleton */}
                  <div className="w-full h-48 sm:h-52 bg-gray-800/60" />

                  {/* Card Body Skeleton */}
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2">
                      <div className="h-5 w-14 bg-gray-800/80 rounded-full" />
                      <div className="h-5 w-14 bg-gray-800/80 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 bg-gray-800/80 rounded" />
                      <div className="h-3.5 w-1/2 bg-gray-800/50 rounded" />
                    </div>
                  </div>
                </div>

                {/* Card Footer Stats Skeleton */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-800/60 flex items-center gap-4">
                  <div className="h-4 w-16 bg-gray-800/60 rounded" />
                  <div className="h-4 w-16 bg-gray-800/60 rounded" />
                  <div className="h-4 w-12 bg-gray-800/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeLoading;
