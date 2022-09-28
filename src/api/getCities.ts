import { cities } from 'data/worldcities/cities';
import type { CityRaw } from 'data/worldcities/cities';

export type City = {
  id: number;
  name: string;
  nameAscii: string;
  country: string;
  countryIso3: string;
  capital: string;
  population: number;
};

export type SearchOptions = Partial<{
  filterBy: string;
  limit: number;
  offset: number;
  searchTerm: string;
  sortDirection: 'ascending' | 'descending';
}>;

const keyIndexMap = {
  id: 0,
  name: 1,
  nameAscii: 2,
  country: 3,
  countryIso3: 4,
  capital: 5,
  population: 6,
};

type Response = {
  cities: City[];
  totalResultsCount: number;
};

const collator = new Intl.Collator('en', { sensitivity: 'base' });

export const getCities = async ({
  filterBy,
  limit = 10000,
  offset = 0,
  searchTerm,
  sortDirection,
}: SearchOptions = {}): Promise<Response> => {
  let filteredList: CityRaw[];

  if (!searchTerm) {
    filteredList = cities;
  } else {
    if (collator.compare(searchTerm, 'error') === 0) {
      const error = new Error('Something terrible just happened!');
      console.log('error', error);
      throw new Error('Something terrible just happened!');
    }

    filteredList = cities.filter(
      (c: CityRaw): boolean =>
        collator.compare(c[2], searchTerm) === 0 ||
        collator.compare(c[3], searchTerm) === 0
    );
  }

  // TODO: performance optimizations depending on use case
  // @ts-ignore
  if (filterBy && keyIndexMap[filterBy] && sortDirection) {
    if (sortDirection === 'ascending') {
      filteredList.sort((a, b) =>
        // @ts-ignore
        a[keyIndexMap[filterBy]] > b[keyIndexMap[filterBy]] ? 1 : -1
      );
    } else if (sortDirection === 'descending') {
      filteredList.sort((a, b) =>
        // @ts-ignore
        a[keyIndexMap[filterBy]] > b[keyIndexMap[filterBy]] ? -1 : 1
      );
    }
  }

  const slicedCities = filteredList
    .slice(offset, offset + limit)
    .map((row: CityRaw) => ({
      id: row[0],
      name: row[1],
      nameAscii: row[2],
      country: row[3],
      countryIso3: row[4],
      capital: row[5],
      population: row[6],
    }));

  return {
    cities: slicedCities,
    totalResultsCount: filteredList.length,
  };
};
