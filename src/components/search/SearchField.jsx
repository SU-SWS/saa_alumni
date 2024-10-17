import React, { useCallback, useContext, useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Autocomplete, TextField } from '@mui/material';
import { useSearchBox } from 'react-instantsearch';
import { X, Search } from 'react-hero-icon/solid';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import SearchModalContext from './Modal/SearchModalContext';

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
const SearchField = ({ emptySearchMessage }) => {
  // Algolia Client.
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const indexName = 'federated-search-with-events'; // TODO: CHANGE THIS BACK BEFORE MERGING
  const index = algoliaClient.initIndex(indexName);

  // Hooks and state.
  const { query, refine } = useSearchBox();
  const [value, setValue] = useState(query);
  const [inputValue, setInputValue] = useState(query);
  const [emptySearch, setEmptySearch] = useState(false);
  const debouncedInputValue = useDebouncedValue(inputValue);
  const [options, setOptions] = useState([]);
  const { searchInputRef } = useContext(SearchModalContext);

  // Update the values when the query changes.
  // ------------------------------------------
  useEffect(() => {
    setValue(query);
    setInputValue(query);
  }, [query]);

  // Debounce the input value and fetch options.
  // -------------------------------------------
  useEffect(() => {
    const fetchOptions = async () => {
      if (!debouncedInputValue) {
        setOptions([]);
        return;
      }

      try {
        const res = await index.search(debouncedInputValue, {
          attributesToRetrieve: ['title'],
          hitsPerPage: 10,
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

  // Handle input change as the user types
  // --------------------------------------
  const handleInputChange = useCallback(
    (v) => {
      setInputValue(v);
    },
    [setInputValue]
  );

  // Handle value change when the user selects an option.
  // ----------------------------------------------------
  const handleValueChange = useCallback(
    (v) => {
      setValue(v);
      refine(v);
    },
    [setValue, refine]
  );

  // Handle form submission.
  // -----------------------
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(inputValue);
      if (inputValue.length === 0) {
        setEmptySearch(true);
      } else {
        refine(inputValue);
        setEmptySearch(false);
      }
    },
    [setValue, refine, inputValue]
  );

  // Handle clearing the search field.
  // ---------------------------------
  const handleClear = useCallback(() => {
    setInputValue('');
    setValue('');
    refine('');
  }, [setInputValue, setValue, refine]);

  // The search field component.
  // ---------------------------
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        role="search"
        className="su-flex su-items-center su-w-full su-gap-16"
      >
        <div className="su-w-full">
          <Autocomplete
            freeSolo
            id="search-field-input"
            popupIcon={null}
            disableClearable
            disablePortal
            inputValue={inputValue}
            onInputChange={(_e, v) => handleInputChange(v)}
            value={value}
            onChange={(_e, v) => handleValueChange(v)}
            filterOptions={(x) => x}
            options={options}
            className="[&_label.MuiInputLabel-shrink]:su-text-black-80 [&_label.MuiInputLabel-shrink]:!-su-translate-y-8 [&_label.MuiInputLabel-shrink]:!su-scale-75"
            renderInput={(params) => (
              <TextField
                inputRef={searchInputRef}
                {...params}
                variant="standard"
                placeholder="Search for something..."
                InputProps={{ ...params.InputProps, type: 'searchbox' }}
                InputLabelProps={{
                  className: 'su-font-sans !su-text-18 md:!su-text-21 su-pl-20',
                }}
              />
            )}
            renderOption={(props, option) => {
              // eslint-disable-next-line no-unused-vars
              const { className, ...rest } = props;
              return (
                <li
                  className="su-border-none su-rounded-full su-rs-px-1 su-mx-10 su-py-5 su-text-white su-decoration-1 su-underline-offset-2 su-cursor-pointer"
                  {...rest}
                >
                  <span>{option}</span>
                </li>
              );
            }}
            slotProps={{
              popper: {
                sx: {
                  '& .Mui-focused': {
                    backgroundColor: 'rgb(177, 4, 14)',
                  },
                },
              },
            }}
            classes={{
              inputRoot:
                '!su-text-18 md:!su-text-21 !su-font-sans !su-p-0 focus-within:before:!su-border-lagunita before:!su-border-b-2 before:!su-border-b-black-50 after:!su-border-b-0',
              input: '!su-pl-20 !su-pr-40 su-text-m2',
              clearIndicator:
                '!su-text-18 !su-bg-transparent !su-text-transparent',
              paper:
                '!su-w-[calc(100%_+_53px)] md:!su-w-[calc(100%_+_106px)] !su-shadow-none md:!su-shadow-lg su-mt-2 md:!su-shadow-black/30 md:!su-rounded-b !su-font-sans !su-text-18 md:!su-text-21 !su-bg-cardinal-red-xxdark !su-border !su-border-digital-red su-z-10',
            }}
          />
          {!!value && (
            <button
              type="button"
              onClick={handleClear}
              className="su-flex su-items-center su-text-16 su-text-digital-red hocus:su-text-digital-red-dark su-transition-colors su-ml-auto su-mt-8"
            >
              <X className="su-w-16 su-h-16" aria-hidden />
              Clear search
            </button>
          )}
        </div>
        <div>
          <button
            type="submit"
            aria-label="Search events"
            className="su-flex su-items-center su-justify-center su-shrink-0 su-rounded-full su-w-36 su-h-36 md:su-w-50 md:su-h-50 su-bg-digital-red-light hocus:su-bg-cardinal-red-dark su-transition-colors"
          >
            <Search className="su-transition su-text-white su-w-18 md:su-w-30 su-h-18 md:su-h-30" />
          </button>
        </div>
      </form>
      {emptySearch && emptySearchMessage && (
        <p className="su-text-m1 su-font-serif su-font-bold su-rs-mt-2 su-mb-0">
          {emptySearchMessage}
        </p>
      )}
    </>
  );
};

export default SearchField;
