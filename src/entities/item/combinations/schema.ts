import { z } from "zod";
import { ItemType, TypesOfItems } from "../types";

export const combinationSchema = z.object({
  combinationId: z.number(),
  name: z.string(),
  tag: z.array(z.string()),

  // Показывает, что этот item - combination
  type: z
    .any()
    .optional()
    .transform(() => TypesOfItems.combination),
});
export type CombinationType = z.infer<typeof combinationSchema>;

export const isCombination = (a: any): a is CombinationType => {
  return combinationSchema.safeParse(a).success;
};

export const combinationsSchema = z.array(z.any()).transform((a) => {
  const combinations: CombinationType[] = [];
  a.forEach((e) => {
    if (isCombination(e)) combinations.push(combinationSchema.parse(e));
    else console.error("Combination parse error - ", e);
  });
  return combinations;
});

export const pageOfCombinationsSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  items: combinationsSchema,
});

export type PageOfCombinationsType = z.infer<typeof pageOfCombinationsSchema>;

export const thisItemIsCombination = (i: ItemType): i is CombinationType => {
  return (i as CombinationType).type === TypesOfItems.combination;
};
