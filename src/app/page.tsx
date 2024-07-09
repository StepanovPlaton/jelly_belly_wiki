import { ItemService, ItemType } from "@/entities/item";
import { ItemCard } from "@/features/itemCard";
import { SectionService, SectionType } from "@/features/sections";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: ".Torrent",
  description:
    ".Torrent - сервис обмена .torrent файлами видеоигр, фильмов и аудиокниг",
};

export default async function Home() {
  const requests = SectionService.sections.map((section) =>
    ItemService.itemsConfiguration[
      SectionService.sectionsConfiguration[section].itemType
    ].service.GetPage(1)
  );
  const data = await Promise.all(requests);

  const items = await SectionService.sections.reduce(
    (cards, section, i) => ({
      ...cards,
      [section]: data[i]?.items,
    }),
    {} as { [k in SectionType]: ItemType[] | null }
  );

  return (
    <div className="h-full overflow-auto pb-4">
      {items &&
        SectionService.sections.map((section, i) => (
          <section key={section}>
            {items[section] && (
              <>
                <h2 className="text-5xl p-2 pt-8">
                  {
                    SectionService.sectionsConfiguration[section]
                      .partOfSectionName
                  }
                </h2>
                <div className="grid grid-cols-1 tb:grid-cols-2 lp:grid-cols-3 gap-3 px-2">
                  {items[section].map((item) => (
                    <ItemCard item={item} key={ItemService.GetItemId(item)} />
                  ))}
                </div>
                <div className="w-full flex justify-end p-2">
                  <Link
                    className="text-2xl text-fg4 cursor-pointer hover:underline"
                    href={
                      "/" +
                      SectionService.sectionsConfiguration[section].sectionUrl
                    }
                  >
                    {
                      SectionService.sectionsConfiguration[section]
                        .sectionInviteText
                    }
                  </Link>
                </div>
              </>
            )}
          </section>
        ))}
    </div>
  );
}
