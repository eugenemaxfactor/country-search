export function createApp() {
    const main = document.createElement('main');
    const heading = document.createElement('h1');
    const searchGroup = document.createElement('div');
    const searchLabel = document.createElement('label');
    const searchInput = document.createElement('input');
    const status = document.createElement('p');
    const retryButton = document.createElement('button');
    const results = document.createElement('section');
    main.className = 'page';
    heading.textContent = 'Country Search';
    searchGroup.className = 'search';
    searchLabel.htmlFor = 'country-search';
    searchLabel.textContent = 'Search for a country';
    searchInput.id = 'country-search';
    searchInput.type = 'search';
    searchInput.name = 'country-search';
    searchInput.autocomplete = 'off';
    status.id = 'search-status';
    status.dataset.state = 'idle';
    status.setAttribute('aria-live', 'polite');
    status.textContent = 'Enter a country name to start searching.';
    retryButton.type = 'button';
    retryButton.textContent = 'Retry';
    retryButton.hidden = true;
    results.id = 'search-results';
    results.setAttribute('aria-label', 'Search results');
    searchGroup.append(searchLabel, searchInput);
    main.append(heading, searchGroup, status, retryButton, results);
    const appElements = {
        root: main,
        searchInput,
        status,
        retryButton,
        results,
    };
    return appElements;
}
