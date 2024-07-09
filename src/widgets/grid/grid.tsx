"use client";

import {
  ItemService,
  ItemType,
  PageOfItemsType,
  TypesOfItems,
} from "@/entities/item";
import { ItemCard } from "@/features/itemCard";
import React, { useRef } from "react";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export const Grid = <U extends ItemType>({
  firstPage,
  typeOfItems,
}: {
  firstPage: PageOfItemsType;
  typeOfItems: TypesOfItems;
}) => {
  const [pageIndex, changePageIndex] = useState(1);
  const [totalPages, _] = useState(firstPage.totalPages);
  const [items, changeItems] = useState(firstPage.items as U[]);
  const [loadingPage, changeLoadingPage] = useState(false);

  const firstItemRef = useRef<HTMLDivElement>(null);

  const handleGridScroll = async (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    if ((scrollTop + clientHeight) / scrollHeight > 0.5) {
      if (!loadingPage) {
        changeLoadingPage(true);
        setTimeout(() => changeLoadingPage(false), 1000);
        if (pageIndex >= totalPages) return;
        const nextPage = await ItemService.itemsConfiguration[
          typeOfItems
        ].service.GetPage(pageIndex + 1);
        if (nextPage) {
          changePageIndex(pageIndex + 1);
          changeItems([...items, ...(nextPage.items as U[])]);
          console.log("new page");
        }
      }
    }
  };

  return (
    <div
      className="grid grid-cols-1 tb:grid-cols-2 lp:grid-cols-3 gap-3 p-2 h-full overflow-auto"
      onScroll={handleGridScroll}
    >
      {items.length > 0 && <ItemCard item={items[0]} ref={firstItemRef} />}
      {items.length > 1 &&
        items
          .slice(1)
          .map((item, i) => (
            <ItemCard item={item} key={ItemService.GetItemId(item)} />
          ))}
    </div>
  );
};
