"use client";

import { useState } from "react";
import LoadMore from "./LoadMore";
import Pokemans from "./Pokemans";

export default function PokemansPage() {
  const [pageCount, setPageCount] = useState(1);

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="w-full text-2xl font-bold tracking-tight text-gray-900 uppercase">
          Let me show you my Pokemans
        </h2>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <Pokemans pageCount={pageCount} />
        </div>

        <LoadMore setPageCount={setPageCount} />
      </div>
    </div>
  );
}
