"use client";

import type { ReactNode } from "react";
import {
  Client,
  Provider as URQLProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

export const client = new Client({
  url: "https://graphql.pokeapi.co/v1beta2",
  exchanges: [cacheExchange, fetchExchange],
});

type Props = {
  children: ReactNode;
};

export default function Provider(props: Props) {
  return <URQLProvider value={client}>{props.children}</URQLProvider>;
}
