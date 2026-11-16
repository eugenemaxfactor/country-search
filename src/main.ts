import { createApp } from './createApp.js';
import { createCountryCard } from './createCountryCard.js';
import { createCountrySearchHandler } from './createCountrySearchHandler.js';
import type { Country } from './mapCountryResponse.js';

const app = createApp();

const showResults = (countries: Country[]): void => {
  app.results.replaceChildren();

  if (app.searchInput.value.trim() === '') {
    app.status.textContent = 'Enter a country name to start searching.';

    return;
  }

  if (countries.length === 0) {
    app.status.textContent = 'No countries found.';

    return;
  }

  app.status.textContent = `Found countries: ${countries.length}.`;

  countries.forEach((country) => {
    const card = createCountryCard(country);

    app.results.append(card);
  });
};

const showError = (): void => {
  app.results.replaceChildren();
  app.status.textContent = 'Something went wrong. Please try again.';
};

const handleSearchInput = createCountrySearchHandler(
  showResults,
  showError,
  300,
);

const handleInput = (): void => {
  const query = app.searchInput.value;

  if (query.trim() !== '') {
    app.status.textContent = 'Searching…';
  }

  handleSearchInput(query);
};

app.searchInput.addEventListener('input', handleInput);
document.body.append(app.root);
