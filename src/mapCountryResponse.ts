export interface RawLanguage {
  name: string;
}

export interface RawCurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface RawCountryResponse {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  area: number;
  borders: string[];
  currencies: RawCurrency[];
  languages: RawLanguage[];
}

export interface Country {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  area: number;
  borders: string[];
  currencies: string[];
  languages: string[];
}

export function mapCountryResponse(rawCountry: RawCountryResponse): Country {
  const languages = rawCountry.languages.map((language) => language.name);
  const borders = [...rawCountry.borders];
  const currencies = rawCountry.currencies.map((currency) => {
    const formattedCurrency = `${currency.name} (${currency.symbol})`;

    return formattedCurrency;
  });

  const country: Country = {
    name: rawCountry.name,
    flag: rawCountry.flag,
    capital: rawCountry.capital,
    region: rawCountry.region,
    population: rawCountry.population,
    area: rawCountry.area,
    borders,
    currencies,
    languages,
  };

  return country;
}
