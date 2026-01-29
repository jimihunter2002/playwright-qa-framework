### This automation framework test both UI and API as well as accuracy, correctness and completeness of business rules/logic as well as field validation using playwright test

- To generate report here is the command
  `npx allure generate ~/Downloads/allure-results --clean -o ~/Downloads/allure-report-view`
- To view report : `npx allure open <report-file-name>`
- To run all tests: `npm run test`

- To run UI tests: `npx playwright test --project="UI-Tests"`

- To run API tests: `npx playwright test --project="API-Tests"`
