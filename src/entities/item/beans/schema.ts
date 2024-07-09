import { z } from "zod";
import { ItemType, TypesOfItems } from "../types";

export const beanSchema = z.object({
  beanId: z.number(),
  groupName: z.array(z.string()),
  ingredients: z.array(z.string()),
  flavorName: z.string(),
  description: z.string(),
  colorGroup: z.string(),
  backgroundColor: z.string(),
  imageUrl: z.string(),
  glutenFree: z.boolean(),
  sugarFree: z.boolean(),
  seasonal: z.boolean(),
  kosher: z.boolean(),

  // Показывает, что этот item - bean
  type: z
    .any()
    .optional()
    .transform(() => TypesOfItems.bean),
});
export type BeanType = z.infer<typeof beanSchema>;

export const isBean = (a: any): a is BeanType => {
  return beanSchema.safeParse(a).success;
};

export const beansSchema = z.array(z.any()).transform((a) => {
  const beans: BeanType[] = [];
  a.forEach((e) => {
    if (isBean(e)) beans.push(beanSchema.parse(e));
    else console.error("Bean parse error - ", e);
  });
  return beans;
});

export const pageOfBeansSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  items: beansSchema,
});

export type PageOfBeansType = z.infer<typeof pageOfBeansSchema>;

export const thisItemIsBean = (i: ItemType): i is BeanType => {
  return (i as BeanType).type === TypesOfItems.bean;
};
