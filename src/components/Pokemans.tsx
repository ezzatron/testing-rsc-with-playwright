import { getClient } from "@/client";
import { graphql } from "@/gql";
import PokemansLayout from "./PokemansLayout";

const ListPokemans = graphql(`
  query ListPokemans {
    pokemonspecies(order_by: { id: asc }, offset: 0, limit: 151) {
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

export default async function Pokemans() {
  const result = await getClient().query(ListPokemans, {});
  const { data, error } = result;

  if (!data) {
    throw new Error(
      `Unable to fetch Pokémon: ${error?.message ?? "Unknown error"}`,
    );
  }

  return <PokemansLayout species={data.pokemonspecies} />;
}
