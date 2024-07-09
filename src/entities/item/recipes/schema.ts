import { z } from "zod";
import { ItemType, TypesOfItems } from "../types";

export const recipeSchema = z.object({
  recipeId: z.number(),
  name: z.string(),
  description: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  totalTime: z.string(),
  makingAmount: z.string(),
  imageUrl: z.string(),
  ingredients: z.array(z.string()),
  additions1: z.array(z.string()),
  additions2: z.array(z.unknown()),
  additions3: z.array(z.unknown()),
  directions: z.array(z.string()),
  tips: z.array(z.string()),

  // Показывает, что этот item - recipe
  type: z
    .any()
    .optional()
    .transform(() => TypesOfItems.recipe),
});
export type RecipeType = z.infer<typeof recipeSchema>;

export const isRecipe = (a: any): a is RecipeType => {
  return recipeSchema.safeParse(a).success;
};

export const recipesSchema = z.array(z.any()).transform((a) => {
  const recipes: RecipeType[] = [];
  a.forEach((e) => {
    if (isRecipe(e)) recipes.push(recipeSchema.parse(e));
    else console.error("Recipe parse error - ", e);
  });
  return recipes;
});

export const pageOfRecipesSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  items: recipesSchema,
});

export type PageOfRecipesType = z.infer<typeof pageOfRecipesSchema>;

export const thisItemIsRecipe = (i: ItemType): i is RecipeType => {
  return (i as RecipeType).type === TypesOfItems.recipe;
};
