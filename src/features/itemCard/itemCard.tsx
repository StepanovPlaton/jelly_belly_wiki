import {
  BeanType,
  CombinationType,
  FactType,
  ItemService,
  ItemType,
  RecipeType,
  TypesOfItems,
} from "@/entities/item";
import { BeanCard } from "./beanCard";
import React from "react";
import { FactCard } from "./factCard";
import { RecipeCard } from "./recipeCard";
import { CombinationCard } from "./combinationCard";
import { MileStoneCard } from "./mileStoneCard";
import { MileStoneType } from "@/entities/item/mileStones";

const ItemTypeToCard = (
  item: ItemType,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return {
    [TypesOfItems.bean]: <BeanCard item={item as BeanType} ref={ref} />,
    [TypesOfItems.fact]: <FactCard item={item as FactType} ref={ref} />,
    [TypesOfItems.recipe]: <RecipeCard item={item as RecipeType} ref={ref} />,
    [TypesOfItems.combination]: (
      <CombinationCard item={item as CombinationType} ref={ref} />
    ),
    [TypesOfItems.mileStone]: (
      <MileStoneCard item={item as MileStoneType} ref={ref} />
    ),
  }[ItemService.GetTypeOfItem(item)];
};

export const ItemCard = React.forwardRef<HTMLDivElement, { item: ItemType }>(
  ({ item }, ref) => {
    return ItemTypeToCard(item, ref);
  }
);
