import { ItemService } from "@/entities/item";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { SectionService } from "@/features/sections";
import { Grid } from "@/widgets/grid";

export async function generateMetadata({
  params: { section },
}: {
  params: { section: string };
}): Promise<Metadata> {
  if (!SectionService.isSection(section)) redirect("/");
  return {
    title: `JellyBelly: ${SectionService.sectionsConfiguration[section].sectionName}`,
  };
}

export default async function SectionPage({
  params: { section },
}: {
  params: { section: string };
}) {
  const pageOfItems = SectionService.isSection(section)
    ? await ItemService.itemsConfiguration[
        SectionService.sectionsConfiguration[section].itemType
      ].service.GetPage(1)
    : redirect("/");

  return (
    <>
      {SectionService.isSection(section) && pageOfItems && (
        <Grid
          firstPage={pageOfItems}
          typeOfItems={SectionService.sectionsConfiguration[section].itemType}
        />
      )}
    </>
  );
}
