import { ItemService } from "@/entities/item";
import { SectionService } from "@/features/sections";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ItemInfo } from "@/features/itemInfo";
import { ItemCard } from "@/features/itemCard";

export async function generateMetadata({
  params: { section, item_id },
}: {
  params: { section: string; item_id: number };
}): Promise<Metadata> {
  if (!SectionService.isSection(section)) redirect("/"); //
  return {
    title: `JellyBelly: ${SectionService.sectionsConfiguration[section].sectionName}`,
  };
}

export default async function Item({
  params: { section, item_id },
}: {
  params: { section: string; item_id: number };
}) {
  const item = SectionService.isSection(section)
    ? await ItemService.itemsConfiguration[
        SectionService.sectionsConfiguration[section].itemType
      ].service.Get(item_id)
    : redirect("/");

  const firstPage =
    SectionService.isSection(section) &&
    (await ItemService.itemsConfiguration[
      SectionService.sectionsConfiguration[section].itemType
    ].service.GetPage(1));

  return (
    <>
      {item && <ItemInfo item={item} />}

      {SectionService.isSection(section) && firstPage && (
        <>
          <h2 className="text-5xl p-2 pt-8">
            {SectionService.sectionsConfiguration[section].partOfSectionName}
          </h2>
          <div className="grid grid-cols-1 tb:grid-cols-2 lp:grid-cols-3 gap-3 px-2">
            {firstPage.items.map((item) => (
              <ItemCard item={item} key={ItemService.GetItemId(item)} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
