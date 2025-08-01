/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query ListPokemans($offset: Int!, $limit: Int!) {\n    pokemonspecies(order_by: { id: asc }, offset: $offset, limit: $limit) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n            typenames(limit: 1, where: { language_id: { _eq: 9 } }) {\n              name\n            }\n          }\n        }\n        pokemonsprites(limit: 1) {\n          artwork: sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n": typeof types.ListPokemansDocument,
};
const documents: Documents = {
    "\n  query ListPokemans($offset: Int!, $limit: Int!) {\n    pokemonspecies(order_by: { id: asc }, offset: $offset, limit: $limit) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n            typenames(limit: 1, where: { language_id: { _eq: 9 } }) {\n              name\n            }\n          }\n        }\n        pokemonsprites(limit: 1) {\n          artwork: sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n": types.ListPokemansDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListPokemans($offset: Int!, $limit: Int!) {\n    pokemonspecies(order_by: { id: asc }, offset: $offset, limit: $limit) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n            typenames(limit: 1, where: { language_id: { _eq: 9 } }) {\n              name\n            }\n          }\n        }\n        pokemonsprites(limit: 1) {\n          artwork: sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPokemans($offset: Int!, $limit: Int!) {\n    pokemonspecies(order_by: { id: asc }, offset: $offset, limit: $limit) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n            typenames(limit: 1, where: { language_id: { _eq: 9 } }) {\n              name\n            }\n          }\n        }\n        pokemonsprites(limit: 1) {\n          artwork: sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;