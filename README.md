# Playwright Tickets

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of the Shohoz air tickets booking site.

## Project Structure

- `tests/pages/flightBooking.ts` – Page Object Model for the flight booking page.
- `tests/pages/flightSelect.ts` – Page Object Model for the flight selection page.
- `tests/flightRunner.spec.ts` – Main test runner using the page objects.
- `.github/workflows/playwright.yml` – GitHub Actions workflow for running tests on push.
- `playwright.config.ts` – Playwright configuration.

## Running Tests Locally

```sh
npm install
npx playwright install
npx playwright test
```

## Continuous Integration

Tests run automatically on every push via GitHub Actions. See `.github/workflows/playwright.yml`.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)