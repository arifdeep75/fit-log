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

  // Add workout to Today's Plan
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

      // Update Navbar counter
      window.dispatchEvent(new Event("fitlog-update"));

      showToast("Added to today's plan");

      // Go to My Plan
      setTimeout(() => {
        router.push("/my-plan");
      }, 700);
    } catch (error) {
      console.error("Failed to add workout:", error);
      showToast("Something went wrong");
    }
  };

  // Save workout for later
  const saveForLater = () => {
    try {
      const savedWorkouts =
        localStorage.getItem("fitlog-saved");

      const saved: Workout[] = savedWorkouts
        ? JSON.parse(savedWorkouts)
        : [];

      // Already saved?
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

      // Update Navbar counter
      window.dispatchEvent(new Event("fitlog-update"));

      showToast("Saved for later");

      // Go to My Plan
      setTimeout(() => {
        router.push("/my-plan");
      }, 700);
    } catch (error) {
      console.error("Failed to save workout:", error);
      showToast("Something went wrong");
    }
  };

  // Check whether plan already has 5 workouts
  let planFull = false;

  try {
    const savedPlan = localStorage.getItem("fitlog-plan");

    const plan: Workout[] = savedPlan
      ? JSON.parse(savedPlan)
      : [];

    planFull = plan.length >= 5;
  } catch {
    planFull = false;
  }

  return (
    <>
      <div className="mt-7 flex flex-wrap gap-3">

        {/* Add to Today's Plan */}
        <button
          type="button"
          onClick={addToPlan}
          disabled={planFull}
          className={`rounded-lg px-5 py-3 text-xs font-bold transition ${
            planFull
              ? "cursor-not-allowed bg-[#30343b] text-gray-500"
              : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
          }`}
        >
          ✓{" "}
          {planFull
            ? "Plan is full (5/5)"
            : "Add to today's plan"}
        </button>

        {/* Save for Later */}
        <button
          type="button"
          onClick={saveForLater}
          className="rounded-lg border border-[#303640] px-5 py-3 text-xs font-medium text-white transition hover:border-[#ccff00]"
        >
          ♡ Save for later
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-[#303640] bg-[#151920] px-5 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
};

export default WorkoutActions;