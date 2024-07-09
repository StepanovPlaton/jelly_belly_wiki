import { BeansService, thisItemIsBean } from "./beans";
import { CombinationsService, thisItemIsCombination } from "./combinations";
import { FactsService, thisItemIsFact } from "./facts";
import { MileStonesService, thisItemIsMileStone } from "./mileStones";
import { RecipesService, thisItemIsRecipe } from "./recipes";
import { IItemService, ItemType, TypesOfItems } from "./types";

export abstract class ItemService {
  static get itemsConfiguration(): {
    [k in TypesOfItems]: {
      service: IItemService;
    };
  } {
    return {
      [TypesOfItems.bean]: {
        service: BeansService,
      },
      [TypesOfItems.fact]: {
        service: FactsService,
      },
      [TypesOfItems.recipe]: {
        service: RecipesService,
      },
      [TypesOfItems.combination]: {
        service: CombinationsService,
      },
      [TypesOfItems.mileStone]: {
        service: MileStonesService,
      },
    };
  }

  public static GetTypeOfItem(i: ItemType): TypesOfItems {
    if (thisItemIsBean(i)) return TypesOfItems.bean;
    if (thisItemIsFact(i)) return TypesOfItems.fact;
    if (thisItemIsRecipe(i)) return TypesOfItems.recipe;
    if (thisItemIsCombination(i)) return TypesOfItems.combination;
    if (thisItemIsMileStone(i)) return TypesOfItems.mileStone;
    throw Error("unknown Item");
  }
  public static GetItemId(i: ItemType): number {
    if (thisItemIsBean(i)) return i.beanId;
    if (thisItemIsFact(i)) return i.factId;
    if (thisItemIsRecipe(i)) return i.recipeId;
    if (thisItemIsCombination(i)) return i.combinationId;
    if (thisItemIsMileStone(i)) return i.mileStoneId;
    throw Error("unknown Item");
  }
}
