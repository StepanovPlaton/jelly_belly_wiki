import { HTTPService } from "@/shared/utils/http";
import { IItemService, staticImplements } from "../types";
import { beanSchema, pageOfBeansSchema } from "./schema";

@staticImplements<IItemService>()
export abstract class BeansService {
  public static urlPrefix = "beans";
  public static cacheOptions = {
    next: {
      revalidate: 60 * 5,
    },
  };

  public static async Get(id: number) {
    return await HTTPService.get(
      `/${this.urlPrefix}/${id}`,
      beanSchema,
      this.cacheOptions
    );
  }

  public static async GetPage(page: number, pageSize?: number) {
    return await HTTPService.get(
      `/${this.urlPrefix}?pageIndex=${page}&pageSize=${pageSize ?? 2 * 3 * 2}`,
      pageOfBeansSchema,
      this.cacheOptions
    );
  }
}
