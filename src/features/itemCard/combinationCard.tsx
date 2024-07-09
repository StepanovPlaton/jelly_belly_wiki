import { CombinationType, TypesOfItems } from "@/entities/item";
import Link from "next/link";
import { SectionService } from "@/features/sections";
import Image from "next/image";
import React from "react";

export const CombinationCard = React.forwardRef<
  HTMLDivElement,
  { item: CombinationType }
>(({ item: combination }, ref) => {
  return (
    <div ref={ref} className="p-4 shadow-md rounded-lg h-full w-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pr-2">
          <h2 className="text-3xl tb:text-xl py-1 underline-offset-1">
            {combination.name}
          </h2>
        </div>
        <p className="text-lg tb:text-sm pr-2 text-justify line-clamp-5 text-fg4">
          {combination.tag.join(" ")}
        </p>
      </div>
    </div>
  );
});
