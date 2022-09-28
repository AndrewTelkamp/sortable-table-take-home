import { memo, useRef } from 'react';

import Icon from '../../Icon';

import type { ChangeEvent } from 'react';

import './styles.css';

interface Props {
  id: string;
  label?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  tabIndex?: number;
  value: string;
}

const SearchField = ({
  id,
  label,
  onValueChange,
  placeholder = 'Search',
  tabIndex = 0,
  value,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onValueChange(event.target.value);
  };

  return (
    <>
      {label && <label htmlFor={'search'}>{label}</label>}

      <div onClick={focusInput} className='searchField'>
        <Icon fill='#bobob3' name='search' />

        <input
          className='searchInput'
          id={id}
          name='search'
          onChange={handleChange}
          placeholder={placeholder}
          ref={inputRef}
          tabIndex={tabIndex}
          type='text'
          value={value}
        />
      </div>
    </>
  );
};

export default memo(SearchField);
