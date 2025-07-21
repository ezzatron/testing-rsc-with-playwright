import { expect, test } from "@playwright/test";
import { WireMockAPI } from "wiremock-captain";
import pokemansFixture from "../fixture/pokemans.json" with { type: "json" };

const wireMock = new WireMockAPI("http://localhost:7358", "/graphql", "POST", {
  requestIgnoreExtraElements: true,
});

function slicePokemansFixture(pageCount: number) {
  return {
    data: {
      pokemonspecies: pokemansFixture.data.pokemonspecies.slice(
        0,
        pageCount * 12,
      ),
    },
  };
}

test.beforeAll(async () => {
  await wireMock.register(
    {
      body: {
        operationName: "ListPokemans",
        variables: { offset: 0, limit: 12 },
      },
    },
    { status: 200, body: slicePokemansFixture(1) },
  );

  await wireMock.register(
    {
      body: {
        operationName: "ListPokemans",
        variables: { offset: 0, limit: 24 },
      },
    },
    { status: 200, body: slicePokemansFixture(2) },
  );
});

test.afterAll(async () => {
  await wireMock.clearAllExceptDefault();
});

test("displays the first page of pokemans", async ({ page }) => {
  await page.goto("/pokemans");

  await expect(page.getByRole("img", { name: /bulbasaurman/i })).toBeVisible();
  await expect(page.getByRole("img", { name: /butterfreeman/i })).toBeVisible();
  expect(await page.getByRole("img", { name: /weedleman/i }).count()).toBe(0);
});

test("can load more pokemans", async ({ page }) => {
  await page.goto("/pokemans");
  await page.getByRole("button", { name: /more pokemans/i }).click();

  await expect(page.getByRole("img", { name: /weedleman/i })).toBeVisible();
  await expect(page.getByRole("img", { name: /arbokman/i })).toBeVisible();
  expect(await page.getByRole("img", { name: /pikachuman/i }).count()).toBe(0);
});
