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
  void rawCountry;

  throw new Error('Not implemented');
}
