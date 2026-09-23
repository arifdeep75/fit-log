import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 border-b border-[#202126] bg-[#0b0c0f] px-9 flex items-center justify-between">

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

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        <Link
          href="/"
          className="rounded-full bg-[#17240c] px-5 py-2 text-[13px] font-medium text-[#ccff00]"
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className="rounded-full px-5 py-2 text-[13px] font-medium text-[#9699a3] transition hover:text-white"
        >
          My Plan
        </Link>
      </div>


      <div className="flex items-center gap-6">


        <Link href="/my-plan" className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[#b5b7c0]">
            Plan
          </span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[12px] font-bold text-black">
            0
          </span>
        </Link>


        <Link href="/my-plan" className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[#9699a3]">
            Saved
          </span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#3a3d46] px-1.5 text-[12px] font-medium text-[#b5b7c0]">
            0
          </span>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;