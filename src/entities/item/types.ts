import { BeanType, PageOfBeansType } from "./beans";
import { CombinationType, PageOfCombinationsType } from "./combinations";
import { FactType, PageOfFactsType } from "./facts";
import { MileStoneType, PageOfMileStonesType } from "./mileStones";
import { PageOfRecipesType, RecipeType } from "./recipes";

export type ItemType =
  | BeanType
  | FactType
  | RecipeType
  | CombinationType
  | MileStoneType;
export type PageOfItemsType =
  | PageOfBeansType
  | PageOfFactsType
  | PageOfRecipesType
  | PageOfCombinationsType
  | PageOfMileStonesType;

export enum TypesOfItems {
  bean,
  fact,
  recipe,
  combination,
  mileStone,
}

export interface IItemService {
  urlPrefix: string;
  Get(id: number): Promise<ItemType | null>;
  GetPage(page: number, pageSize?: number): Promise<PageOfItemsType | null>;
}

export const staticImplements =
  <T>() =>
  <U extends T>(constructor: U) =>
    constructor;
