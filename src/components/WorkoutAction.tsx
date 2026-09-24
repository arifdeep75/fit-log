"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workout } from "../types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const router = useRouter();
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const addToPlan = () => {
    try {
      const savedPlan = localStorage.getItem("fitlog-plan");

      const plan: Workout[] = savedPlan
        ? JSON.parse(savedPlan)
        : [];

      // Already exists?
      const alreadyAdded = plan.some(
        (item) => item.id === workout.id
      );

      if (alreadyAdded) {
        showToast("Already in today's plan");
        return;
      }

      // Maximum 5 workouts
      if (plan.length >= 5) {
        showToast("Today's plan is full");
        return;
      }

      const updatedPlan = [...plan, workout];

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );

      showToast("Added to today's plan");

      // Go to My Plan after a short delay
      setTimeout(() => {
        router.push("/my-plan");
      }, 700);
    } catch (error) {
      console.error("Failed to add workout:", error);
      showToast("Something went wrong");
    }
  };

  const saveForLater = () => {
    try {
      const savedWorkouts = localStorage.getItem(
        "fitlog-saved"
      );

      const saved: Workout[] = savedWorkouts
        ? JSON.parse(savedWorkouts)
        : [];

      const alreadySaved = saved.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        showToast("Already saved");
        return;
      }

      const updatedSaved = [...saved, workout];

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      showToast("Saved for later");

      setTimeout(() => {
        router.push("/my-plan");
      }, 700);
    } catch (error) {
      console.error("Failed to save workout:", error);
      showToast("Something went wrong");
    }
  };

  return (
    <>
      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addToPlan}
          className="rounded-lg bg-[#ccff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#b8e600]"
        >
          ✓ Add to today`s plan
        </button>

        <button
          type="button"
          onClick={saveForLater}
          className="rounded-lg border border-[#303640] px-5 py-3 text-xs font-medium text-white transition hover:border-[#ccff00]"
        >
          ♡ Save for later
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-[#303640] bg-[#151920] px-5 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
};

export default WorkoutActions;