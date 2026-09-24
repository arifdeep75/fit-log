import Image from "next/image";
import Link from "next/link";

import { Workout } from "../../../types/workout";
import WorkoutActions from "../../../components/WorkoutAction";


interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-[#0b0d10] px-6 py-12 text-white">
        <h1 className="text-3xl font-bold">
          Workout not found
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-[#ccff00] px-5 py-3 text-sm font-bold text-black"
        >
          Back to Workouts
        </Link>
      </main>
    );
  }

  const workout: Workout = await res.json();

  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-295 gap-10 lg:grid-cols-2">


        <div className="overflow-hidden rounded-xl">
          <Image
            src={workout.image}
            alt={workout.name}
            width={740}
            height={740}
            className="h-auto w-full object-cover"
          />
        </div>


        <div>


          <h1 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl">
            {workout.name}
          </h1>


          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c929d]">
            {workout.description}
          </p>


          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#252a33] bg-[#151920]">

            <SpecRow
              label="EQUIPMENT"
              value={workout.equipment}
            />

            <SpecRow
              label="DIFFICULTY"
              value={workout.difficulty}
            />

            <SpecRow
              label="SETS"
              value={workout.sets.toString()}
            />

            <SpecRow
              label="REPS"
              value={workout.reps}
            />

            <SpecRow
              label="DURATION"
              value={`${workout.duration} min`}
            />

            <SpecRow
              label="CALORIES"
              value={`${workout.caloriesBurned} kcal`}
            />

            <SpecRow
              label="RATING"
              value={workout.rating.toString()}
              last
            />
          </div>


          <section className="mt-7">
            <h2 className="text-sm font-bold tracking-wide text-white">
              INSTRUCTIONS
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-xs leading-5 text-[#a0a5ae]"
                  >
                    <span className="text-[#777d87]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                )
              )}
            </ol>
          </section>


          <WorkoutActions workout={workout} />

        </div>
      </div>
    </main>
  );
};

interface SpecRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const SpecRow = ({
  label,
  value,
  last = false,
}: SpecRowProps) => {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 ${
        !last ? "border-b border-[#252a33]" : ""
      }`}
    >
      <span className="text-[10px] font-bold tracking-wide text-[#8d939d]">
        {label}
      </span>

      <span className="text-xs text-[#d5d8dd]">
        {value}
      </span>
    </div>
  );
};

export default WorkoutDetailsPage;