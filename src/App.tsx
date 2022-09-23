import { useEffect, useCallback, useState, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import type { City } from 'api/getCities';
import { getCities } from 'api/getCities';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error>();

  const cityRows = useMemo(() =>
    cities.map(s => <pre key={s.id}>{JSON.stringify(s)}</pre>),
  [cities]);

  const runSearch = useCallback(async (term: string) => {
    try
    {
      const searchResult = await getCities({ searchTerm: term });
      setCities(searchResult);
    } catch (err: any) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    runSearch(searchTerm);
  }, [runSearch, searchTerm]);

  const onSearchTermChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>City List</h1>
      <form>
        <label htmlFor="search">Search</label>
        <input id="search" name="search" type="text" onChange={() => onSearchTermChange}/>
      </form>
      {error ? <pre>{`Eek! ${error.message}`}</pre> : cityRows}
    </div>
  );
 };

export default App;
