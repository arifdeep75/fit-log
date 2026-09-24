import { Workout } from "../types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutGridProps {
  workouts: Workout[];
}

const WorkoutGrid = ({ workouts }: WorkoutGridProps) => {
  return (
    <section
      id="library"
      className="px-4 py-10 sm:px-6 sm:py-11 lg:px-9 lg:py-12"
    >
      <div className="mb-6 sm:mb-7">
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-xs text-[#858892] sm:text-sm">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkoutGrid;