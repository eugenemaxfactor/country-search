import type { Country } from './mapCountryResponse.js';

export function createCountryCard(country: Country): HTMLElement {
  const card = document.createElement('details');
  const summary = document.createElement('summary');
  const flag = document.createElement('span');
  const name = document.createElement('strong');
  const description = document.createElement('p');
  const area = document.createElement('p');
  const borders = document.createElement('p');
  const languages = document.createElement('p');
  const currencies = document.createElement('p');

  const formattedPopulation = country.population.toLocaleString();
  const formattedArea = country.area.toLocaleString();
  const formattedBorders = country.borders.join(', ') || 'None';
  const formattedLanguages = country.languages.join(', ') || 'Not available';
  const formattedCurrencies = country.currencies.join(', ') || 'Not available';

  flag.textContent = country.flag;
  name.textContent = country.name;
  description.textContent = `${country.name} is located in ${country.region}. Its capital is ${country.capital}, and its population is ${formattedPopulation}.`;
  area.textContent = `Area: ${formattedArea} km²`;
  borders.textContent = `Borders: ${formattedBorders}`;
  languages.textContent = `Languages: ${formattedLanguages}`;
  currencies.textContent = `Currencies: ${formattedCurrencies}`;

  summary.append(
    flag,
    ' ',
    name,
    ` — ${country.capital}, ${country.region}, population ${formattedPopulation}`,
  );
  card.append(summary, description, area, borders, languages, currencies);

  return card;
}
