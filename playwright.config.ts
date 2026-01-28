import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',

  /* Fail fast on local, tolerate one retry on CI */
  retries: process.env.CI ? 1 : 0,

  /* Parallel execution */
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,

  /* Global timeouts */
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  /* Reports */
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['allure-playwright'],
  ],

  /* Shared settings */
  use: {},

  /* Browser coverage (keep tight for CI speed) */
  projects: [
    {
      name: 'UI-Tests',
      testMatch: /.*ui\/.*spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        actionTimeout: 10_000,
        navigationTimeout: 15_000,
      },
    },
    {
      name: 'API-Tests',
      testMatch: /.*api\/.*spec\.ts/,
      use: {
        baseURL: 'https://reqres.in',
        extraHTTPHeaders: {
          Accept: 'application/json',
          'x-api-key': process.env.REQUEST_API_KEY || '',
        },
      },
    },
  ],

  /* Output folders */
  outputDir: 'test-results',
});
