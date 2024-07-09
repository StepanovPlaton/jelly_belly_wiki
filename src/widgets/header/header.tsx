"use client";

import { MobileMenu } from "./mobileMenu/mobileMenu";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { SectionService } from "@/features/sections";
import { ColorSchemeSwitch } from "@/features/colorSchemeSwitch";

export const Header = () => {
  const currentPageName = useSelectedLayoutSegment();

  return (
    <header className="w-full h-20 z-10 bg-bg1 sticky top-0 shadow-xl">
      <div
        className="w-full h-full max-w-[var(--app-width)] m-auto px-5
              flex items-center justify-between"
      >
        <h1 className="text-4xl font-bold flex items-center">
          <div className="lp:hidden">
            <MobileMenu />
          </div>
          <Link href="/">JellyBelly</Link>
        </h1>
        <div className="hidden text-2xl lp:block">
          {SectionService.sections.map((section) => (
            <Link
              key={section}
              className={
                "px-5 cursor-pointer hover:underline underline-offset-2 " +
                (currentPageName === section ? "underline" : "")
              }
              href={"/" + section}
            >
              {SectionService.sectionsConfiguration[section].sectionName}
            </Link>
          ))}
        </div>
        <ColorSchemeSwitch />
      </div>
    </header>
  );
};
