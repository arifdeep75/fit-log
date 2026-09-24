import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-6 text-white">
      <div className="text-center">
        <p className="text-7xl font-black text-[#ccff00]">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}