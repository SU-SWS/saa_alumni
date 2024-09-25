import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import algoliasearch from 'algoliasearch/lite';
import { Autocomplete, TextField } from '@mui/material';
import { X, Search } from 'react-hero-icon/solid';
import { navigate } from 'gatsby-link';
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
const SearchFieldModal = () => {
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const indexName = 'federated-search-with-events';
  const index = algoliaClient.initIndex(indexName);
  const query = '';
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
          hitsPerPage: 8,
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
      // navigate(`/search?q=${v}`);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(inputValue);
      navigate(`/search?q=${inputValue}`);
    },
    [setValue, inputValue]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    setValue('');
  }, [setInputValue, setValue]);

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      role="search"
      className="su-flex su-items-center su-w-full su-gap-16"
    >
      <div className="su-flex su-w-full su-items-center su-relative su-border-b-2 su-border-black-10">
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
          className="[&_label.MuiInputLabel-shrink]:su-text-black-80 [&_label.MuiInputLabel-shrink]:!-su-translate-y-8 [&_label.MuiInputLabel-shrink]:!su-scale-75 su-grow"
          renderInput={(params) => (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label>
              <span className="su-sr-only">Search</span>
              <TextField
                {...params}
                variant="standard"
                placeholder="Search"
                InputProps={{ ...params.InputProps, type: 'searchbox' }}
                InputLabelProps={{
                  className: 'su-font-sans !su-text-18 md:!su-text-21 su-pl-20',
                }}
              />
            </label>
          )}
          renderOption={(props, option) => {
            // eslint-disable-next-line no-unused-vars
            const { className, ...rest } = props;
            return (
              <li
                className="su-border-none su-rounded-full su-my-0 md:su-my-10 md:su-mx-18 su-py-14 md:su-py-3 su-px-36 md:su-px-20 su-text-white su-decoration-1 su-underline-offset-2 su-cursor-pointer"
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
              '!su-text-18 md:!su-text-21 !su-font-sans !su-p-0 focus-within:before:!su-border-none before:!su-border-none after:!su-border-none',
            input:
              'search-input-modal !su-border-0 !su-bg-transparent !su-text-black-10 !su-text-black-40::placeholder !su-w-full !su-flex-1 !su-rs-px-2 !su-py-02em !su-text-m4 !md:su-text-m4 !su-leading-display focus:!su-outline-none focus:!su-ring-0 focus:!su-ring-transparent',
            paper:
              '!su-w-[calc(100%_+_106px)] !su-shadow-none md:!su-shadow-lg md:!su-shadow-black/30 md:!su-rounded-b !su-font-sans !su-text-18 md:!su-text-21 !su-bg-cardinal-red-xxdark !su-border !su-border-digital-red',
          }}
        />
        {!!inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="su-flex su-items-center su-transition-colors su-ml-auto hocus:su-text-digital-red-xlight hocus:su-underline su-text-m0 md:su-text-m1 su-font-semibold su-border-none su-text-white su-p-0 focus:!su-bg-transparent su-rs-mr-1 su-mt-03em"
          >
            Clear
            <X
              className="su-inline-block su-ml-3 su-h-[1.1em] su-w-[1.1em]"
              aria-hidden
            />
          </button>
        )}
      </div>
      <div>
        <button
          type="submit"
          aria-label="Search events"
          className="su-flex su-items-center su-justify-center su-min-w-[4rem] su-w-40 su-h-40 md:su-min-w-[7rem] md:su-w-70 md:su-h-70 md:children:su-w-40 md:children:su-h-40 su-rounded-full su-transition-colors su-bg-digital-red hocus:su-bg-digital-red-xlight su-origin-center !su-ml-0"
        >
          <Search className="su-transition su-text-white su-w-18 md:su-w-30 su-h-18 md:su-h-30" />
        </button>
      </div>
    </form>
  );
};

export default SearchFieldModal;
