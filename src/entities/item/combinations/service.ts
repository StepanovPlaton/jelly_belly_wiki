import { HTTPService } from "@/shared/utils/http";
import { IItemService, staticImplements } from "../types";
import { combinationSchema, pageOfCombinationsSchema } from "./schema";

@staticImplements<IItemService>()
export abstract class CombinationsService {
  public static urlPrefix = "combinations";
  public static cacheOptions = {
    next: {
      revalidate: 60 * 5,
    },
  };

  public static async Get(id: number) {
    return await HTTPService.get(
      `/${this.urlPrefix}/${id}`,
      combinationSchema,
      this.cacheOptions
    );
  }

  public static async GetPage(page: number, pageSize?: number) {
    return await HTTPService.get(
      `/${this.urlPrefix}?pageIndex=${page}&pageSize=${pageSize ?? 2 * 3 * 3}`,
      pageOfCombinationsSchema,
      this.cacheOptions
    );
  }
}
