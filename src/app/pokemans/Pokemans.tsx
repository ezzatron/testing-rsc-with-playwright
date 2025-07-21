import Image from "next/image";
import { getClient } from "../../client";
import { graphql } from "../../gql";

export default async function Pokemans() {
  const result = await getClient().query(ListPokemans, {
    offset: 0,
    limit: 151,
  });
  const { data, error } = result;

  if (!data) {
    throw new Error(
      `Unable to fetch Pokémon: ${error?.message ?? "Unknown error"}`,
    );
  }

  return (
    <>
      {data.pokemonspecies.map((s, i) => (
        <div key={s.pokemons[0].id} className="group relative">
          <Image
            priority={i < 6}
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
    </>
  );
}

const ListPokemans = graphql(`
  query ListPokemans($offset: Int!, $limit: Int!) {
    pokemonspecies(order_by: { id: asc }, offset: $offset, limit: $limit) {
      pokemons {
        id
        name
        pokemontypes {
          type {
            name
            typenames(limit: 1, where: { language_id: { _eq: 9 } }) {
              name
            }
          }
        }
        pokemonsprites(limit: 1) {
          artwork: sprites(path: "other.official-artwork.front_default")
        }
      }
    }
  }
`);
