import PokemansChunk from "./PokemansChunk";

type Props = {
  pageCount: number;
};

export default function Pokemans({ pageCount }: Props) {
  return (
    <>
      {Array.from({ length: pageCount }).map((_, i) => (
        <PokemansChunk key={i} chunkNumber={i} />
      ))}
    </>
  );
}
