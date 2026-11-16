export function mapCountryResponse(rawCountry) {
    const languages = rawCountry.languages.map((language) => language.name);
    const borders = [...rawCountry.borders];
    const currencies = rawCountry.currencies.map((currency) => {
        const formattedCurrency = `${currency.name} (${currency.symbol})`;
        return formattedCurrency;
    });
    const country = {
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
