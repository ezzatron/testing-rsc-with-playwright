import type { ListPokemansQuery } from "@/gql/graphql";
import Image from "next/image";

type Props = {
  species: ListPokemansQuery["pokemonspecies"];
};

export default function PokemansLayout({ species }: Props) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
          Let me show you my Pokemans
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {species.map((s) => (
            <div key={s.pokemons[0].id} className="group relative">
              <Image
                alt={s.pokemons[0].name + "man"}
                src={s.pokemons[0].pokemonsprites[0].artwork}
                width={475}
                height={475}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    {s.pokemons[0].name}man
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {s.pokemons[0].pokemontypes
                      .map((t) => t.type?.name)
                      .join(" / ")}
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  {s.pokemons[0].id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
