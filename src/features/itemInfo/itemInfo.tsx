import {
  BeanType,
  ItemService,
  ItemType,
  RecipeType,
  TypesOfItems,
} from "@/entities/item";
import React from "react";
import { redirect } from "next/navigation";
import { SectionService } from "../sections";
import { BeanInfo } from "./beanInfo";
import { RecipeInfo } from "./recipeInfo";

const ItemTypeToInfo = (item: ItemType) => {
  const ItemInfoComponents = {
    [TypesOfItems.bean]: <BeanInfo item={item as BeanType} />,
    [TypesOfItems.recipe]: <RecipeInfo item={item as RecipeType} />,
  };
  const typeOfItem = ItemService.GetTypeOfItem(item);
  if (typeOfItem in ItemInfoComponents)
    return ItemInfoComponents[typeOfItem as keyof typeof ItemInfoComponents];
  redirect(
    "/" +
      SectionService.sectionsConfiguration[
        SectionService.itemTypeToSection[ItemService.GetTypeOfItem(item)]
      ].sectionUrl
  );
};

export const ItemInfo = ({ item }: { item: ItemType }) => {
  return ItemTypeToInfo(item);
};
