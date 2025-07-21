import { defineConfig } from "@playwright/test";

const isCI = process.env.CI === "true";
const isDefaultProjects =
  process.argv.some((a) => a === "test") &&
  !process.argv.some((a) => a.match(/^--project\b/));

const envBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = envBaseURL || "http://localhost:7357";

const iphone15 = {
  screen: { width: 393, height: 852 },
  viewport: { width: 393, height: 659 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
} as const;

export default defineConfig({
  testDir: "test/playwright",
  retries: 1,
  timeout: isCI ? 30_000 : 10_000,
  reporter: [["dot"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: envBaseURL
    ? undefined
    : {
        command: "npx next dev --port 7357",
        url: "http://localhost:7357/robots.txt",
        reuseExistingServer: false,
        timeout: 60_000,
        gracefulShutdown: { signal: "SIGINT", timeout: 500 },
        env: {
          API_URL: "http://localhost:7358/graphql",
        },
      },
  projects: [
    {
      name: "chromium",
      use: { ...iphone15, browserName: "chromium" },
    },
    ...(isDefaultProjects
      ? []
      : ([
          {
            name: "firefox",
            use: { ...iphone15, browserName: "firefox", isMobile: false },
          },
          {
            name: "webkit",
            use: { ...iphone15, browserName: "webkit" },
          },
        ] as const)),
  ],
});
