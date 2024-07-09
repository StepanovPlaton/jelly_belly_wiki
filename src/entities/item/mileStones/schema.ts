import { z } from "zod";
import { ItemType, TypesOfItems } from "../types";

export const mileStoneSchema = z.object({
  mileStoneId: z.number(),
  year: z.number(),
  description: z.string(),

  // Показывает, что этот item - mileStone
  type: z
    .any()
    .optional()
    .transform(() => TypesOfItems.mileStone),
});
export type MileStoneType = z.infer<typeof mileStoneSchema>;

export const isMileStone = (a: any): a is MileStoneType => {
  return mileStoneSchema.safeParse(a).success;
};

export const mileStonesSchema = z.array(z.any()).transform((a) => {
  const mileStones: MileStoneType[] = [];
  a.forEach((e) => {
    if (isMileStone(e)) mileStones.push(mileStoneSchema.parse(e));
    else console.error("MileStone parse error - ", e);
  });
  return mileStones;
});

export const pageOfMileStonesSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  items: mileStonesSchema,
});

export type PageOfMileStonesType = z.infer<typeof pageOfMileStonesSchema>;

export const thisItemIsMileStone = (i: ItemType): i is MileStoneType => {
  return (i as MileStoneType).type === TypesOfItems.mileStone;
};
