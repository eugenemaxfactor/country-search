export interface RawLanguage {
  name: string;
}

export interface RawCountryResponse {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: RawLanguage[];
}

export interface Country {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: string[];
}

export function mapCountryResponse(rawCountry: RawCountryResponse): Country {
  const languages = rawCountry.languages.map((language) => language.name);

  const country: Country = {
    name: rawCountry.name,
    flag: rawCountry.flag,
    capital: rawCountry.capital,
    region: rawCountry.region,
    population: rawCountry.population,
    languages,
  };

  return country;
}
