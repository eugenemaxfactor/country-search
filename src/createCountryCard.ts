import type { Country } from './mapCountryResponse.js';

export function createCountryCard(country: Country): HTMLElement {
  const card = document.createElement('article');
  const flag = document.createElement('p');
  const name = document.createElement('h2');
  const capital = document.createElement('p');
  const region = document.createElement('p');
  const population = document.createElement('p');
  const languages = document.createElement('p');

  flag.textContent = country.flag;
  name.textContent = country.name;
  capital.textContent = `Capital: ${country.capital}`;
  region.textContent = `Region: ${country.region}`;
  population.textContent = `Population: ${country.population.toLocaleString()}`;
  languages.textContent = `Languages: ${country.languages.join(', ')}`;

  card.append(flag, name, capital, region, population, languages);

  return card;
}
