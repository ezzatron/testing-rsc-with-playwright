import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BodyType, EndpointFeature, WireMock } from "wiremock-captain";
import productsFixture from "../fixture/api/dummyjson.com/products.json" with { type: "json" };

const wireMock = new WireMock("http://localhost:7358");

test.beforeAll(async () => {
  await wireMock.register(
    { method: "GET", endpoint: "/products" },
    { status: 200, body: productsFixture },
    { requestEndpointFeature: EndpointFeature.UrlPath },
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
});

test.afterAll(async () => {
  await wireMock.clearAllExceptDefault();
});

test("displays the first product", async ({ page }) => {
  await page.goto("/product-listing");

  await expect(
    page.getByRole("img", { name: /Essence Mascara Lash Princess/i }),
  ).toBeVisible();
});

test("displays the last product", async ({ page }) => {
  await page.goto("/product-listing");

  await expect(page.getByRole("img", { name: /Apple Airpods/i })).toBeVisible();
});
