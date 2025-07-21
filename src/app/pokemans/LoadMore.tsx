"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { u } from "../../u";

type Props = {
  pageCount: number;
};

export default function LoadMore({ pageCount }: Props) {
  const [desiredPageCount, setDesiredPageCount] = useState(pageCount);
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick() {
    const nextPageCount = pageCount + 1;
    setDesiredPageCount(nextPageCount);
    replace(pathname + u`?pages=${nextPageCount}`, { scroll: false });
  }

  return (
    <>
      {desiredPageCount > pageCount && (
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
          <div className="aspect-square w-full rounded-md bg-gray-200" />
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 uppercase shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        I demand more Pokemans!
      </button>
    </>
  );
}
