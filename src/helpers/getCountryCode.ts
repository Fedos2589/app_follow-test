import lookup from 'country-code-lookup';

export const getCountryCode = (country: string) => lookup.byCountry(country)?.internet;
