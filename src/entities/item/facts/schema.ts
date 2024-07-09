import { z } from "zod";
import { ItemType, TypesOfItems } from "../types";

export const factSchema = z.object({
  factId: z.number(),
  title: z.string(),
  description: z.string(),

  // Показывает, что этот item - fact
  type: z
    .any()
    .optional()
    .transform(() => TypesOfItems.fact),
});
export type FactType = z.infer<typeof factSchema>;

export const isFact = (a: any): a is FactType => {
  return factSchema.safeParse(a).success;
};

export const factsSchema = z.array(z.any()).transform((a) => {
  const facts: FactType[] = [];
  a.forEach((e) => {
    if (isFact(e)) facts.push(factSchema.parse(e));
    else console.error("Fact parse error - ", e);
  });
  return facts;
});

export const pageOfFactsSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  items: factsSchema,
});

export type PageOfFactsType = z.infer<typeof pageOfFactsSchema>;

export const thisItemIsFact = (i: ItemType): i is FactType => {
  return (i as FactType).type === TypesOfItems.fact;
};
