import LoadMore from "./LoadMore";
import Pokemans from "./Pokemans";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PokemansPage({ searchParams }: Props) {
  const pageCount = parsePageCount(await searchParams);

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="w-full text-2xl font-bold tracking-tight text-gray-900 uppercase">
          Let me show you my Pokemans
        </h2>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <Pokemans pageCount={pageCount} />
        </div>

        <LoadMore pageCount={pageCount} />
      </div>
    </div>
  );
}

function parsePageCount({ pages }: SearchParams): number {
  if (typeof pages !== "string") return 1;

  const parsed = parseInt(pages, 10);

  if (isNaN(parsed) || parsed < 1 || parsed > 10) return 1;

  return parsed;
}
