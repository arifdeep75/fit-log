import Image from "next/image";
import Link from "next/link";
import { Workout } from "../types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link href={`/workout/${workout.id}`}>
      <article className="cursor-pointer overflow-hidden rounded-lg border border-[#24272e] bg-[#15171c] transition hover:border-[#ccff00]">

        {/* Image */}
        <div className="w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            width={500}
            height={300}
            className="h-44 w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Muscle Groups */}
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[9px] font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="text-base font-bold uppercase text-white">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-1 text-xs text-gray-500">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 border-t border-[#25282f] pt-3 text-[10px] text-gray-500">
            <span>◷ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span>★ {workout.rating}</span>
          </div>

        </div>
      </article>
    </Link>
  );
};

export default WorkoutCard;