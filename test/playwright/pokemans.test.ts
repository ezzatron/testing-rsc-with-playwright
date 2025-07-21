import { expect, test } from "@playwright/test";
import { EndpointFeature, WireMock } from "wiremock-captain";
import pokemansFixture from "../fixture/pokemans.json" with { type: "json" };

const wireMock = new WireMock("http://localhost:7358");

test.beforeAll(async () => {
  await wireMock.register(
    { method: "POST", endpoint: "/graphql" },
    { status: 200, body: pokemansFixture },
    { requestEndpointFeature: EndpointFeature.UrlPath },
  );
});

test.afterAll(async () => {
  await wireMock.clearAllExceptDefault();
});

test("displays the first pokeman", async ({ page }) => {
  await page.goto("/pokemans");

  await expect(page.getByRole("img", { name: /bulbasaurman/i })).toBeVisible();
});

test("displays the last pokeman", async ({ page }) => {
  await page.goto("/pokemans");

  await expect(page.getByRole("img", { name: /voltorbman/i })).toBeVisible();
});
