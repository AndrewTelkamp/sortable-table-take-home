import { useEffect, useCallback, memo, useState } from 'react';

import { getCities } from 'api/getCities';
import { SearchField, SortableTable } from './components';
import { debounce } from './utilities';

import './App.css';

import type { City } from 'api/getCities';
import { FetchStatus } from './constants';
import type {
  SortDirection,
  SortArgs,
} from './components/table/TableHeaderCell';

const tableHeaders = [
  { dataKey: 'id', title: 'ID' },
  { dataKey: 'name', title: 'Name' },
  { dataKey: 'nameAscii', title: 'ASCII' },
  { dataKey: 'country', title: 'Country' },
  { dataKey: 'countryIso3', title: 'Country ISO3' },
  { dataKey: 'capital', title: 'Capital' },
  { dataKey: 'population', title: 'Population' },
];

type SearchArgs = {
  filterBy?: string;
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortDirection?: SortDirection;
};

const App = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error>();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    FetchStatus.UNFETCHED
  );
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOptions, setSortOptions] = useState<SortArgs>({});
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const resetFetchStatus = () => setFetchStatus(FetchStatus.UNFETCHED);
  const resetSearchValue = () => setSearchValue('');

  const handleSortChange = (header: SortArgs) => {
    const { direction } = header;
    let newDirection: SortDirection;

    if (!direction) {
      newDirection = 'ascending';
    } else if (direction === 'ascending') {
      newDirection = 'descending';
    } else {
      newDirection = undefined;
    }

    setSortOptions({
      ...header,
      direction: newDirection,
    });
  };

  const searchCities = async ({
    filterBy,
    page,
    pageSize,
    searchTerm,
    sortDirection,
  }: SearchArgs) => {
    try {
      setFetchStatus(FetchStatus.FETCHING);
      const searchResult = await getCities({
        filterBy,
        limit: pageSize,
        offset: (page - 1) * pageSize,
        searchTerm,
        sortDirection,
      });

      setFetchStatus(FetchStatus.SUCCESS);
      const numberOfPages = Math.ceil(
        searchResult.totalResultsCount / pageSize
      );

      setTotalPageCount(numberOfPages);
      setCities(searchResult.cities);
    } catch (err: any) {
      setFetchStatus(FetchStatus.FAIL);
      setError(err);
    }
  };

  // eslint-disable-next-line
  const debouncedSearchCities = useCallback(
    debounce((args: SearchArgs) => searchCities(args), 150),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    setFetchStatus(FetchStatus.FETCHING);
    debouncedSearchCities({
      filterBy: sortOptions.dataKey,
      page,
      pageSize,
      searchTerm: searchValue,
      sortDirection: sortOptions.direction,
    });
    // eslint-disable-next-line
  }, [debouncedSearchCities, searchValue]);

  useEffect(() => {
    searchCities({
      filterBy: sortOptions.dataKey,
      page,
      pageSize,
      searchTerm: searchValue,
      sortDirection: sortOptions.direction,
    });
    // eslint-disable-next-line
  }, [page, pageSize, sortOptions.dataKey, sortOptions.direction]);

  return (
    <div className='app'>
      <div className='searchContainer'>
        <SearchField
          id='search'
          onValueChange={setSearchValue}
          placeholder='Search for a city'
          value={searchValue}
        />
      </div>

      <SortableTable
        caption='Sortable City Search'
        data={cities}
        emptyState={
          <UIStateExample
            title='No Results'
            buttonTitle='Clear Search'
            onButtonClick={resetSearchValue}
          />
        }
        errorState={
          <UIStateExample
            buttonTitle='Retry'
            onButtonClick={resetFetchStatus}
            title={error?.message || 'Unable to get cities at this time'}
          />
        }
        fetchStatus={fetchStatus}
        headers={tableHeaders}
        loadState={<UIStateExample title='Loading Cities...' />}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        page={page}
        pageSize={pageSize}
        onTableHeaderClick={handleSortChange}
        sortOptions={sortOptions}
        totalPageCount={totalPageCount}
      />
    </div>
  );
};

// Code below not pretty, just for example sake.

interface UIStateExampleProps {
  buttonTitle?: string;
  onButtonClick?: () => any;
  title: string;
}

const UIStateExample = memo(
  ({ title, buttonTitle, onButtonClick }: UIStateExampleProps) => (
    <div className='uiStateExampleContainer'>
      <p>{title}</p>

      {buttonTitle && onButtonClick && (
        <button onClick={onButtonClick}>{buttonTitle}</button>
      )}
    </div>
  )
);

export default App;
