import Image from "next/image";

const Hero = () => {
  return (
    <section className="mx-9 mt-9 rounded-2xl border border-[#252832] bg-[#15171c] overflow-hidden">
      <div className="grid min-h-84 grid-cols-2 items-center">

        <div className="pl-10">
          <p className="mb-5 text-sm font-bold tracking-[0.12em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-155 text-5xl font-black leading-[0.95] tracking-tight text-white">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-130 text-sm leading-6 text-[#9699a3]">
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


        <div className="relative flex h-full items-center justify-center">
          <Image
            src="/assets/banner.png"
            alt="Workout illustration"
            width={450}
            height={350}
            className="h-75 w-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;