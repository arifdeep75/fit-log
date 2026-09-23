import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#202126] bg-[#090a0c] px-9 py-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={22}
            height={22}
          />

          <span className="text-base font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-[#686c76]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;