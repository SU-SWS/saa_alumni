import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import algoliasearch from 'algoliasearch/lite';
import { Autocomplete, TextField } from '@mui/material';
import { useSearchBox } from 'react-instantsearch';
import { X, Search } from 'react-hero-icon/solid';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

/**
 * @typedef {object} Props
 * @property {SearchClient} searchClient
 * @property {string} indexName
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
const SearchField = () => {
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const indexName = 'federated-search-with-events';
  const index = algoliaClient.initIndex(indexName);
  const { query, refine } = useSearchBox();
  const [value, setValue] = useState(query);
  const [inputValue, setInputValue] = useState(query);
  const debouncedInputValue = useDebouncedValue(inputValue);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(query);
    setInputValue(query);
  }, [query]);

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
      setInputValue(v);
    },
    [setInputValue]
  );

  const handleValueChange = useCallback(
    (v) => {
      setValue(v);
      refine(v);
    },
    [setValue, refine]
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

  const handleClear = useCallback(() => {
    setInputValue('');
    setValue('');
    refine('');
  }, [setInputValue, setValue, refine]);

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      role="search"
      className="su-flex su-items-center su-w-full su-gap-16"
    >
      <div className="su-w-full">
        <Autocomplete
          freeSolo
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
              {...params}
              variant="standard"
              placeholder="Search for something..."
              InputProps={{ ...params.InputProps, type: 'searchbox' }}
              InputLabelProps={{
                className: 'su-font-sans !su-text-18 md:!su-text-21 su-pl-20',
              }}
            />
          )}
          classes={{
            inputRoot:
              '!su-text-18 md:!su-text-21 !su-font-sans !su-p-0 focus-within:before:!su-border-lagunita before:!su-border-b-2 before:!su-border-b-black-50 after:!su-border-b-0',
            input: '!su-pl-20 !su-pr-40',
            clearIndicator:
              '!su-text-18 !su-bg-transparent !su-text-transparent',
            paper:
              '!su-w-[calc(100%_+_106px)] md:!su-w-auto !-su-ml-26 md:!su-ml-0 !su-mt-18 md:!su-mt-0 !su-shadow-none md:!su-shadow-lg md:!su-shadow-black/30 md:!su-rounded-b !su-font-sans !su-text-18 md:!su-text-21',
            option:
              'su-border-b su-border-black-50 md:su-border-b-0 md:su-rounded-full !su-my-0 md:!su-my-10 md:!su-mx-18 !su-py-14 md:!su-py-3 !su-px-36 md:!su-px-20 first:!su-border-t md:first:!su-border-t-0 first:su-mt-20 last:su-mb-10 !su-text-black-70 !su-decoration-1 !su-underline-offset-2',
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
  );
};

export default SearchField;
