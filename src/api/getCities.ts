import { cities } from 'data/worldcities/cities';
import type { CityRaw } from 'data/worldcities/cities';

type SearchOptions = Partial<{
  limit: number;
  offset: number;
  searchTerm: string;
}>;

export type City = {
  id: number;
  name: string;
  nameAscii: string;
  country: string;
  countryIso3: string;
  capital: string;
  population: number;
};

const collator = new Intl.Collator('en', {  sensitivity: 'base' });

export const getCities = async ({
  limit = 10000,
  offset = 0,
  searchTerm
}: SearchOptions = {}): Promise<City[]> => {

  let filteredList: CityRaw[];
  if (!searchTerm) {
    filteredList = cities;
  } else {
    if (collator.compare(searchTerm, 'error') === 0) {
      throw new Error('Something terrible just happened!');
    }

    filteredList = cities.filter((c: CityRaw): boolean =>
      // City name
      collator.compare(c[2], searchTerm) === 0 ||
      // Country name
      collator.compare(c[3], searchTerm) === 0);
  }

  return filteredList.slice(offset, offset + limit).map((row: CityRaw) => ({
    id: row[0],
    name: row[1],
    nameAscii: row[2],
    country: row[3],
    countryIso3: row[4],
    capital: row[5],
    population: row[6],
  }));
}
