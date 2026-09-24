export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#30343b] border-t-[#ccff00]" />

        <p className="text-sm text-gray-500">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}