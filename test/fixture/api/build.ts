import { createWriteStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type Product = {
  images: string[];
  thumbnail: string;
};

const productsRes = await fetchJSON<ProductsResponse>(
  "https://dummyjson.com/products?limit=100",
);
await writeFile(
  join(import.meta.dirname, "dummyjson.com/products.json"),
  JSON.stringify(productsRes, null, 2),
);

for (const product of productsRes.products) {
  const thumbnailURL = new URL(product.thumbnail);

  if (thumbnailURL.origin === "https://cdn.dummyjson.com") {
    await fetchStreaming(
      product.thumbnail,
      join(import.meta.dirname, "cdn.dummyjson.com", thumbnailURL.pathname),
    );
  }

  for (const image of product.images) {
    const imageURL = new URL(image);
    if (imageURL.origin !== "https://cdn.dummyjson.com") continue;

    await fetchStreaming(
      image,
      join(import.meta.dirname, "cdn.dummyjson.com", imageURL.pathname),
    );
  }
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unexpected HTTP status ${response.status}`);
  }
  return response.json();
}

async function fetchStreaming(url: string, dest: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`Unexpected HTTP status ${response.status}`);
  }
  await mkdir(dirname(dest), { recursive: true });
  await finished(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Readable.fromWeb(response.body as any).pipe(createWriteStream(dest)),
  );
}
