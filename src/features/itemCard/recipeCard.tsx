import { BeanType, RecipeType, TypesOfItems } from "@/entities/item";
import Link from "next/link";
import { SectionService } from "@/features/sections";
import Image from "next/image";
import React from "react";

export const RecipeCard = React.forwardRef<
  HTMLDivElement,
  { item: RecipeType }
>(({ item: recipe }, ref) => {
  return (
    <div ref={ref} className="p-4 shadow-md rounded-lg h-full w-full">
      <Link
        className="group/itemcard cursor-pointer flex flex-col justify-between h-full"
        href={
          "/" +
          SectionService.sectionsConfiguration[
            SectionService.itemTypeToSection[TypesOfItems.recipe]
          ].sectionUrl +
          "/" +
          recipe.recipeId
        }
      >
        <Image
          src={recipe.imageUrl}
          alt=""
          className="w-full rounded-lg object-cover aspect-video"
          width={1280}
          height={720}
        />
        <div className="flex items-center justify-between pr-2">
          <h2 className="text-3xl tb:text-base py-1 group-hover/itemcard:underline underline-offset-1">
            {recipe.name}
          </h2>
        </div>
        <p className="text-lg tb:text-sm pr-2 text-justify line-clamp-5 text-fg4">
          {recipe.description}
        </p>
      </Link>
    </div>
  );
});
