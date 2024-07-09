import { FactType, TypesOfItems } from "@/entities/item";
import Link from "next/link";
import { SectionService } from "@/features/sections";
import Image from "next/image";
import React from "react";

export const FactCard = React.forwardRef<HTMLDivElement, { item: FactType }>(
  ({ item: fact }, ref) => {
    return (
      <div
        ref={ref}
        className="p-4 shadow-lg shadow-bg1 rounded-lg h-full w-full"
      >
        <div className="flex flex-col justify-evenly h-full">
          <div className="flex items-center justify-between pr-2">
            <h2 className="text-3xl tb:text-xl py-1 underline-offset-1">
              {fact.title}
            </h2>
          </div>
          <p className="text-lg tb:text-sm pr-2 text-justify line-clamp-5 text-fg4">
            {fact.description}
          </p>
        </div>
      </div>
    );
  }
);
