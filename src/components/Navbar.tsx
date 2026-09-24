"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const updateCounts = () => {
      try {
        const savedPlan = localStorage.getItem("fitlog-plan");
        const savedWorkouts = localStorage.getItem("fitlog-saved");

        const plan = savedPlan ? JSON.parse(savedPlan) : [];
        const saved = savedWorkouts
          ? JSON.parse(savedWorkouts)
          : [];

        setPlanCount(Array.isArray(plan) ? plan.length : 0);
        setSavedCount(Array.isArray(saved) ? saved.length : 0);
      } catch (error) {
        console.error("Failed to load navbar counts:", error);
        setPlanCount(0);
        setSavedCount(0);
      }
    };

    // Load counts when Navbar first appears
    updateCounts();

    // Update counts after add/save/remove
    window.addEventListener("fitlog-update", updateCounts);

    // Also update when localStorage changes from another tab
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener(
        "fitlog-update",
        updateCounts
      );

      window.removeEventListener(
        "storage",
        updateCounts
      );
    };
  }, []);

  const isWorkoutsPage = pathname === "/";
  const isMyPlanPage = pathname === "/my-plan";

  return (
    <nav className="flex h-16 items-center justify-between border-b border-[#202126] bg-[#0b0c0f] px-9">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/assets/logo.png"
          alt="FitLog Logo"
          width={26}
          height={26}
        />

        <span className="text-[20px] font-extrabold tracking-tight text-white">
          FITLOG
        </span>
      </Link>

      {/* NAVIGATION */}
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">

        <Link
          href="/"
          className={`rounded-full px-5 py-2 text-[13px] font-medium transition ${
            isWorkoutsPage
              ? "bg-[#17240c] text-[#ccff00]"
              : "text-[#9699a3] hover:text-white"
          }`}
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={`rounded-full px-5 py-2 text-[13px] font-medium transition ${
            isMyPlanPage
              ? "bg-[#17240c] text-[#ccff00]"
              : "text-[#9699a3] hover:text-white"
          }`}
        >
          My Plan
        </Link>

      </div>

      {/* COUNTERS */}
      <div className="flex items-center gap-6">

        {/* PLAN */}
        <Link
          href="/my-plan"
          className="flex items-center gap-2"
        >
          <span className="text-[13px] font-medium text-[#b5b7c0]">
            Plan
          </span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[12px] font-bold text-black">
            {planCount}
          </span>
        </Link>

        {/* SAVED */}
        <Link
          href="/my-plan"
          className="flex items-center gap-2"
        >
          <span className="text-[13px] font-medium text-[#9699a3]">
            Saved
          </span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#3a3d46] px-1.5 text-[12px] font-medium text-[#b5b7c0]">
            {savedCount}
          </span>
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;