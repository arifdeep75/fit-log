import { Workout } from "../types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutGridProps {
  workouts: Workout[];
}

const WorkoutGrid = ({ workouts }: WorkoutGridProps) => {
  return (
    <section id="library" className="px-9 py-12">

      <div className="mb-7">
        <h2 className="text-3xl font-black tracking-tight text-white">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-sm text-[#858892]">
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