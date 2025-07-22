import type { Dispatch, SetStateAction } from "react";

type Props = {
  setPageCount: Dispatch<SetStateAction<number>>;
};

export default function LoadMore({ setPageCount }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        setPageCount((c) => c + 1);
      }}
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 uppercase shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
    >
      I demand more Pokemans!
    </button>
  );
}
