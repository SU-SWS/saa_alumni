import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { SearchClient } from 'algoliasearch/lite';
import { Autocomplete, TextField } from '@mui/material';
import { useSearchBox } from 'react-instantsearch';
import { X, Search } from 'react-hero-icon/solid';
import { useDebouncedValue } from '../../../../hooks/useDebouncedValue';

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
          className="[&_label.Mui-focused]:su-text-lagunita"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Search by event title"
              InputProps={{ ...params.InputProps, type: 'searchbox' }}
              InputLabelProps={{
                className: 'su-font-sans !su-text-18 md:!su-text-21 su-pl-20',
              }}
            />
          )}
          classes={{
            inputRoot:
              '!su-text-18 md:!su-text-21 !su-font-sans !su-p-0 focus-within:before:!su-border-lagunita-light before:!su-border-b-2 before:!su-border-b-black-50 after:!su-border-b-0',
            input: '!su-px-20',
            clearIndicator:
              '!su-text-18 !su-bg-transparent !su-text-transparent',
            paper:
              '!su-w-[calc(100%_+_106px)] md:!su-w-auto !-su-ml-26 md:!su-ml-0 !su-mt-18 md:!su-mt-0 !su-shadow-none md:!su-shadow-lg md:!su-shadow-black/30 md:!su-rounded-b !su-font-sans !su-text-18 md:!su-text-21',
            option:
              'su-border-b su-border-black-50 md:su-border-b-0 md:su-rounded-full !su-my-0 md:!su-my-10 md:!su-mx-18 !su-py-14 md:!su-py-3 !su-px-36 md:!su-px-20 first:!su-border-t md:first:!su-border-t-0 first:su-mt-20 last:su-mb-10 !su-text-black-70 !su-decoration-1 !su-underline-offset-2',
          }}
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
  );
};
