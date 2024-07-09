import { BeanType, TypesOfItems } from "@/entities/item";
import Link from "next/link";
import { SectionService } from "@/features/sections";
import Image from "next/image";
import React from "react";

export const BeanCard = React.forwardRef<HTMLDivElement, { item: BeanType }>(
  ({ item: bean }, ref) => {
    return (
      <div ref={ref} className="p-4 shadow-md rounded-lg h-full w-full">
        <Link
          className="group/itemcard cursor-pointer flex flex-col justify-evenly h-full"
          href={
            "/" +
            SectionService.sectionsConfiguration[
              SectionService.itemTypeToSection[TypesOfItems.bean]
            ].sectionUrl +
            "/" +
            bean.beanId
          }
        >
          <Image
            src={bean.imageUrl}
            alt=""
            className="w-full rounded-lg object-contain p-4"
            width={1280}
            height={720}
          />
          <div className="flex items-center justify-between pr-2">
            <h2 className="text-3xl tb:text-xl py-1 group-hover/itemcard:underline underline-offset-1">
              {bean.flavorName}
            </h2>
          </div>
          <p className="text-lg tb:text-sm pr-2 text-justify line-clamp-5 text-fg4">
            {bean.description}
          </p>
        </Link>
      </div>
    );
  }
);
BeanCard.displayName = "BeanCard";
