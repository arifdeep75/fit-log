import Image from "next/image";

const Hero = () => {
  return (
    <section className="mx-4 mt-6 overflow-hidden rounded-2xl border border-[#252832] bg-[#15171c] sm:mx-6 sm:mt-7 lg:mx-9 lg:mt-9">
      <div className="grid min-h-84 grid-cols-1 items-center lg:grid-cols-2">

        {/* Hero Content */}
        <div className="px-6 py-10 sm:px-8 md:px-10 lg:py-0">
          <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#ccff00] sm:mb-5 sm:text-sm">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-155 text-3xl font-black leading-[0.98] tracking-tight text-white sm:text-4xl md:text-5xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-4 max-w-130 text-xs leading-6 text-[#9699a3] sm:mt-5 sm:text-sm">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today`s plan, and watch the week`s work add up.
          </p>

          <a
            href="#library"
            className="mt-5 inline-flex items-center rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#b8e600]"
          >
            BROWSE WORKOUTS
          </a>
        </div>

        {/* Hero Image */}
        <div className="relative flex min-h-55 items-center justify-center px-6 pb-8 sm:min-h-65 sm:px-8 lg:min-h-full lg:px-0 lg:pb-0">
          <Image
            src="/assets/banner.png"
            alt="Workout illustration"
            width={450}
            height={350}
            className="h-auto w-full max-w-105 object-contain sm:max-w-115 lg:h-75 lg:w-auto"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;