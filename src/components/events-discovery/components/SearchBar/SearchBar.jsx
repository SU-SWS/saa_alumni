import React, { useCallback, useEffect, useState } from 'react';
import { SearchClient } from 'algoliasearch/lite';
import {
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useSearchBox } from 'react-instantsearch';
import { X, Search } from 'react-hero-icon/solid';
import { useDebouncedValue } from '../../../../hooks/useDebouncedValue';

const theme = createTheme({
  typography: {
    fontSize: 18,
    fontFamily: [
      '"Source Sans 3"',
      '"Source Sans Pro"',
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ],
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '2rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderBottom: '2px solid rgb(109 108 105)',
          paddingLeft: '0.8rem',
          fontSize: '2rem',
          '::before': {
            display: 'none',
          },
          '::after': {
            display: 'none',
          },
        },
        input: {
          boxShadow: 'none !important',
          paddingTop: '0.8rem',
          paddingBottom: '0.8rem',
        },
      },
    },
  },
});

/**
 * @typedef {object} Props
 * @property {SearchClient} searchClient
 * @property {string} indexName
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const SearchBar = ({ searchClient, indexName }) => {
  const index = searchClient.initIndex(indexName);
  const { query, refine } = useSearchBox();
  const [value, setValue] = useState(query);
  const [inputValue, setInputValue] = useState(query);
  const debouncedInputValue = useDebouncedValue(inputValue);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!debouncedInputValue) {
        setOptions([]);
        return;
      }

      try {
        const res = await index.search(debouncedInputValue, {
          attributesToRetrieve: ['title'],
          hitsPerPage: 5,
        });
        const newOptions = res.hits.map((hit) => hit.title);

        if (!newOptions?.length && !options?.length) {
          return;
        }

        setOptions(newOptions);
      } catch (err) {
        setOptions([]);
      }
    };

    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  const handleInputChange = useCallback(
    (v) => {
      console.log('Input Value: ', v);
      setInputValue(v);
    },
    [setInputValue]
  );

  const handleValueChange = useCallback(
    (v) => {
      console.log('Value: ', v);
      setValue(v);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(inputValue);
      refine(inputValue);
    },
    [setValue, refine, inputValue]
  );

  return (
    <ThemeProvider theme={theme}>
      <form
        action=""
        onSubmit={handleSubmit}
        role="search"
        className="su-flex su-items-center su-w-full su-gap-16"
      >
        <div className="su-w-full">
          <Autocomplete
            freeSolo
            inputValue={inputValue}
            onInputChange={(_e, v) => handleInputChange(v)}
            value={value}
            onChange={(_e, v) => handleValueChange(v)}
            filterOptions={(x) => x}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                aria-label="Search by title"
                placeholder="Search by title"
                InputProps={{ ...params.InputProps, type: 'searchbox' }}
              />
            )}
          />
        </div>
        <div>
          <button
            type="submit"
            aria-label="Search events"
            className="su-flex su-items-center su-justify-center su-rounded-full su-bg-digital-red-light hocus:su-bg-digital-red-dark su-text-white su-w-50 su-aspect-1 su-transition-colors"
          >
            <Search className="su-w-30 su-h-30" />
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};
