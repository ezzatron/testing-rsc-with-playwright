import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BodyType, WireMock } from "wiremock-captain";
import productsFixture from "../fixture/api/dummyjson.com/products.json" with { type: "json" };

const wireMock = new WireMock("http://localhost:7358");

test("placeholder", async ({ page }) => {
  await wireMock.register(
    { method: "GET", endpoint: "/products?limit=100" },
    { status: 200, body: productsFixture },
  );

  for (const product of productsFixture.products) {
    const thumbnailUrl = new URL(product.thumbnail);
    if (thumbnailUrl.hostname !== "cdn.dummyjson.com") continue;

    const thumbnailPath = join(
      import.meta.dirname,
      "../fixture/api/cdn.dummyjson.com",
      thumbnailUrl.pathname,
    );

    await wireMock.register(
      { method: "GET", endpoint: thumbnailUrl.pathname },
      {
        status: 200,
        headers: { "Content-Type": "image/webp" },
        body: (await readFile(thumbnailPath)).toString("base64"),
      },
      {
        responseBodyType: BodyType.Base64Body,
      },
    );
  }

  await page.goto("/product-listing");

  await expect(
    page.getByRole("img", { name: /Essence Mascara Lash Princess/i }),
  ).toBeVisible();
});
