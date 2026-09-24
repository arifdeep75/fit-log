"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Check,
  Clock3,
  Flame,
  Star,
  X,
  ChevronDown,
  Search,
} from "lucide-react";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = () => {
      try {
        const savedPlan = localStorage.getItem("fitlog-plan");
        const savedData = localStorage.getItem("fitlog-saved");

        if (savedPlan) {
          try {
            const parsedPlan = JSON.parse(savedPlan);

            if (Array.isArray(parsedPlan)) {
              setPlan(parsedPlan);
            }
          } catch (error) {
            console.error("Invalid plan data:", error);
          }
        }

        if (savedData) {
          try {
            const parsedSaved = JSON.parse(savedData);

            if (Array.isArray(parsedSaved)) {
              setSaved(parsedSaved);
            }
          } catch (error) {
            console.error("Invalid saved data:", error);
          }
        }
      } catch (error) {
        console.error("Failed to load FitLog data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, isLoaded]);

  const currentList = activeTab === "plan" ? plan : saved;

  // Search by workout name or muscle group/tag
  const filteredList = currentList.filter((workout) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    const nameMatch = workout.name
      .toLowerCase()
      .includes(query);

    const tagMatch = workout.muscleGroups.some((muscle) =>
      muscle.toLowerCase().includes(query)
    );

    return nameMatch || tagMatch;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  const totalExercises = plan.length;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) => {
      const updatedPlan = currentPlan.filter(
        (workout) => workout.id !== id
      );

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );

      return updatedPlan;
    });

    window.dispatchEvent(new Event("fitlog-update"));

    toast("Workout removed from today's plan", {
      position: "bottom-right",
    });
  };

  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) => {
      const updatedSaved = currentSaved.filter(
        (workout) => workout.id !== id
      );

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      return updatedSaved;
    });

    window.dispatchEvent(new Event("fitlog-update"));

    toast("Workout removed from saved", {
      position: "bottom-right",
    });
  };

  const markAsDone = (workout: Workout) => {
    setPlan((currentPlan) => {
      const updatedPlan = currentPlan.filter(
        (item) => item.id !== workout.id
      );

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );

      return updatedPlan;
    });

    window.dispatchEvent(new Event("fitlog-update"));

    toast(`${workout.name} marked as done`, {
      position: "bottom-right",
    });
  };

  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      <div className="mx-auto min-h-screen max-w-295">

        <section className="px-5 pb-8 pt-10 md:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        <section className="px-5 md:px-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#24272e] bg-[#13161c] md:grid-cols-3">

            <div className="border-b border-[#24272e] p-6 md:border-b-0 md:border-r">
              <p className="text-xs text-gray-500">
                Exercises
              </p>

              <p className="mt-1 text-3xl font-bold text-[#c8ff00]">
                {totalExercises}
              </p>
            </div>

            <div className="border-b border-[#24272e] p-6 md:border-b-0 md:border-r">
              <p className="text-xs text-gray-500">
                Minutes
              </p>

              <p className="mt-1 text-3xl font-bold">
                {totalMinutes}
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs text-gray-500">
                Calories
              </p>

              <p className="mt-1 text-3xl font-bold">
                {totalCalories}
              </p>
            </div>

          </div>
        </section>

        <section className="mt-6 flex flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-8">

          {/* Tabs */}
          <div className="flex w-fit rounded-lg border border-[#24272e] bg-[#13161c] p-1">

            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-5 py-2 text-xs transition ${
                activeTab === "plan"
                  ? "bg-[#20242c] font-semibold text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Today`s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-5 py-2 text-xs transition ${
                activeTab === "saved"
                  ? "bg-[#20242c] font-semibold text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search workout or muscle..."
                className="w-full rounded-lg border border-[#24272e] bg-[#13161c] py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-gray-600 outline-none transition focus:border-[#c8ff00]"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">

              <span className="text-xs text-gray-500">
                Sort By
              </span>

              <div className="relative">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as SortOption
                    )
                  }
                  className="appearance-none rounded-lg border border-[#24272e] bg-[#13161c] py-2 pl-3 pr-9 text-xs text-gray-300 outline-none"
                >
                  <option value="duration">
                    Duration
                  </option>

                  <option value="calories">
                    Calories
                  </option>

                  <option value="rating">
                    Rating
                  </option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

              </div>
            </div>

          </div>
        </section>

        <section className="px-5 pb-20 pt-5 md:px-8">

          {!isLoaded ? (

            <div className="flex min-h-75 items-center justify-center rounded-xl border border-[#24272e] bg-[#0e1014]">
              <div className="text-sm text-gray-500">
                Loading workouts...
              </div>
            </div>

          ) : sortedList.length === 0 ? (

            <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed border-[#292d35] bg-[#0e1014] text-center">

              <h2 className="text-xl font-black uppercase">
                {searchQuery
                  ? "NO MATCHES FOUND"
                  : "NOTHING HERE YET"}
              </h2>

              <p className="mt-2 max-w-md text-xs text-gray-500">
                {searchQuery
                  ? "Try searching with another workout name or muscle group."
                  : "Browse the library and add a lift to get today moving."}
              </p>

              {!searchQuery && (
                <Link
                  href="/"
                  className="mt-5 rounded-full bg-[#c8ff00] px-6 py-3 text-xs font-bold text-black transition hover:brightness-110"
                >
                  Go to workouts
                </Link>
              )}

            </div>

          ) : (

            <div className="space-y-3">

              {sortedList.map((workout) => (

                <article
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-xl border border-[#24272e] bg-[#13161c] p-3 transition hover:border-[#353a44] md:flex-row md:items-center"
                >

                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg md:h-20 md:w-28">

                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 112px"
                      className="object-cover"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <h2 className="text-sm font-black uppercase">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">

                      <span className="flex items-center gap-1">
                        <Clock3
                          size={13}
                          className="text-[#c8ff00]"
                        />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame
                          size={13}
                          className="text-[#c8ff00]"
                        />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <Star
                          size={13}
                          className="text-[#c8ff00]"
                        />
                        {workout.rating}
                      </span>

                    </div>

                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full border border-[#343a45] px-4 py-2 text-xs text-gray-300 transition hover:bg-[#1d2027] hover:text-white"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        type="button"
                        onClick={() => markAsDone(workout)}
                        className="flex items-center gap-1 rounded-full bg-[#c8ff00] px-4 py-2 text-xs font-bold text-black transition hover:brightness-110"
                      >
                        <Check size={13} />
                        Mark as Done
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#1d2027] hover:text-white"
                      aria-label="Remove workout"
                    >
                      <X size={16} />
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}