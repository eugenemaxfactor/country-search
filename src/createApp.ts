export interface AppElements {
  root: HTMLElement;
  searchInput: HTMLInputElement;
  status: HTMLParagraphElement;
  results: HTMLElement;
}

export function createApp(): AppElements {
  const main = document.createElement('main');
  const heading = document.createElement('h1');
  const searchGroup = document.createElement('div');
  const searchLabel = document.createElement('label');
  const searchInput = document.createElement('input');
  const status = document.createElement('p');
  const results = document.createElement('section');

  heading.textContent = 'Country Search';

  searchLabel.htmlFor = 'country-search';
  searchLabel.textContent = 'Search for a country';

  searchInput.id = 'country-search';
  searchInput.type = 'search';
  searchInput.name = 'country-search';
  searchInput.autocomplete = 'off';

  status.id = 'search-status';
  status.setAttribute('aria-live', 'polite');
  status.textContent = 'Enter a country name to start searching.';

  results.id = 'search-results';
  results.setAttribute('aria-label', 'Search results');

  searchGroup.append(searchLabel, searchInput);
  main.append(heading, searchGroup, status, results);

  const appElements: AppElements = {
    root: main,
    searchInput,
    status,
    results,
  };

  return appElements;
}
