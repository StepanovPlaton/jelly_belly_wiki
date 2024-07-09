import { TypesOfItems } from "@/entities/item";

export type SectionType = (typeof SectionService.sections)[number];

export abstract class SectionService {
  static get itemTypeToSection(): { [k in TypesOfItems]: SectionType } {
    return {
      [TypesOfItems.bean]: "beans",
      [TypesOfItems.fact]: "facts",
      [TypesOfItems.recipe]: "recipes",
      [TypesOfItems.combination]: "combinations",
      [TypesOfItems.mileStone]: "history",
    };
  }

  static get sectionsConfiguration(): {
    [k in SectionType]: {
      sectionName: string;
      sectionUrl: string;
      itemType: TypesOfItems;
      partOfSectionName: string;
      sectionInviteText: string;
    };
  } {
    return {
      beans: {
        sectionName: "Beans",
        sectionUrl: "beans",
        itemType: TypesOfItems.bean,
        partOfSectionName: "Some beans",
        sectionInviteText: 'Go to section "Beans"',
      },
      facts: {
        sectionName: "Facts",
        sectionUrl: "facts",
        itemType: TypesOfItems.fact,
        partOfSectionName: "Some facts",
        sectionInviteText: 'Go to section "Facts"',
      },
      recipes: {
        sectionName: "Recipes",
        sectionUrl: "recipes",
        itemType: TypesOfItems.recipe,
        partOfSectionName: "Some recipes",
        sectionInviteText: 'Go to section "Recipes"',
      },
      combinations: {
        sectionName: "Combinations",
        sectionUrl: "combinations",
        itemType: TypesOfItems.combination,
        partOfSectionName: "Some combinations",
        sectionInviteText: 'Go to section "Combinations"',
      },
      history: {
        sectionName: "History",
        sectionUrl: "history",
        itemType: TypesOfItems.mileStone,
        partOfSectionName: "Some history",
        sectionInviteText: 'Go to section "History"',
      },
    };
  }

  static sections = [
    "beans",
    "facts",
    "recipes",
    "combinations",
    "history",
  ] as const;

  static isSection = (a: string): a is SectionType => {
    return this.sections.includes(a as SectionType);
  };
}
