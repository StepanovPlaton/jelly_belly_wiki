import { HTTPService } from "@/shared/utils/http";
import { IItemService, staticImplements } from "../types";
import { mileStoneSchema, pageOfMileStonesSchema } from "./schema";

@staticImplements<IItemService>()
export abstract class MileStonesService {
  public static urlPrefix = "mileStones";
  public static cacheOptions = {
    next: {
      revalidate: 60 * 5,
    },
  };

  public static async Get(id: number) {
    return await HTTPService.get(
      `/${this.urlPrefix}/${id}`,
      mileStoneSchema,
      this.cacheOptions
    );
  }

  public static async GetPage(page: number, pageSize?: number) {
    return await HTTPService.get(
      `/${this.urlPrefix}?pageIndex=${page}&pageSize=${pageSize ?? 2 * 3 * 3}`,
      pageOfMileStonesSchema,
      this.cacheOptions
    );
  }
}
