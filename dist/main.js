import { createApp } from './createApp.js';
import { createCountryCard } from './createCountryCard.js';
import { createCountrySearchHandler } from './createCountrySearchHandler.js';
const app = createApp();
const showResults = (countries) => {
    app.results.replaceChildren();
    app.retryButton.hidden = true;
    if (app.searchInput.value.trim() === '') {
        app.status.dataset.state = 'idle';
        app.status.textContent = 'Enter a country name to start searching.';
        return;
    }
    if (countries.length === 0) {
        app.status.dataset.state = 'empty';
        app.status.textContent = 'No countries found.';
        return;
    }
    app.status.dataset.state = 'success';
    app.status.textContent = `Found countries: ${countries.length}.`;
    countries.forEach((country) => {
        const card = createCountryCard(country);
        app.results.append(card);
    });
};
const showError = () => {
    app.results.replaceChildren();
    app.status.dataset.state = 'error';
    app.status.textContent = 'Something went wrong. Please try again.';
    app.retryButton.hidden = false;
};
const handleSearchInput = createCountrySearchHandler(showResults, showError, 300);
const handleInput = () => {
    const query = app.searchInput.value;
    app.retryButton.hidden = true;
    if (query.trim() !== '') {
        app.status.dataset.state = 'loading';
        app.status.textContent = 'Searching…';
    }
    handleSearchInput(query);
};
const retrySearch = () => {
    const query = app.searchInput.value;
    if (query.trim() === '') {
        return;
    }
    app.retryButton.hidden = true;
    app.status.dataset.state = 'loading';
    app.status.textContent = 'Searching…';
    handleSearchInput(query);
};
app.searchInput.addEventListener('input', handleInput);
app.retryButton.addEventListener('click', retrySearch);
document.body.append(app.root);
