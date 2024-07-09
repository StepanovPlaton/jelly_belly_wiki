import React from "react";
import { MileStoneType } from "@/entities/item/mileStones";

export const MileStoneCard = React.forwardRef<
  HTMLDivElement,
  { item: MileStoneType }
>(({ item: mileStone }, ref) => {
  return (
    <div ref={ref} className="p-4 shadow-md rounded-lg h-full w-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pr-2">
          <h2 className="text-3xl tb:text-xl py-1 underline-offset-1">
            {mileStone.year}
          </h2>
        </div>
        <p className="text-lg tb:text-sm pr-2 text-justify line-clamp-5 text-fg4">
          {mileStone.description}
        </p>
      </div>
    </div>
  );
});
MileStoneCard.displayName = "MileStoneCard";
