
import WorkoutGrid from "../components/WorkoutGrid";
import { Workout } from "../types/workout";
import Hero from "../components/Hero";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero></Hero>

      <WorkoutGrid workouts={workouts} />
    </main>
  );
}