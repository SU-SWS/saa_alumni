import React, { useState, createRef, useEffect } from 'react';
import { X, Search } from 'react-hero-icon/solid';
import SearchAutocomplete from './searchAutocomplete';
import UseEscape from '../../hooks/useEscape';
import UseOnClickOutside from '../../hooks/useOnClickOutside';

const SearchField = React.forwardRef(
  (
    {
      onSubmit,
      onReset,
      onInput,
      autocompleteSuggestions,
      defaultValue,
      inputClasses,
      wrapperClasses,
      submitBtnClasses,
      clearBtnClasses,
      autocompleteLinkClasses,
      autocompleteLinkFocusClasses,
      autocompleteContainerClasses,
      placeholder,
      clearOnEscape,
    },
    ref
  ) => {
    const [query, setQuery] = useState(defaultValue || '');
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const inputWrapper = createRef();
    const inputRef = ref || createRef();

    const submitHandler = (e) => {
      e.preventDefault();
      setShowAutocomplete(false);
      onSubmit(query);
    };

    const inputHandler = (e) => {
      setQuery(e.target.value);
      onInput(e.target.value);
      setShowAutocomplete(true);
    };

    const clearHandler = (e) => {
      e.preventDefault();
      setQuery('');
      setShowAutocomplete(false);
      setSelectedSuggestion(null);
      onReset();
    };

    const selectSuggestion = (e, suggestion) => {
      e.preventDefault();
      setQuery(suggestion);
      setShowAutocomplete(false);
      setSelectedSuggestion(null);
      onSubmit(suggestion);
    };

    useEffect(() => {
      setQuery(defaultValue);
    }, [defaultValue]);

    UseOnClickOutside(inputWrapper, () => {
      setShowAutocomplete(false);
    });

    // If no suggestion is selected, or if the last suggested item is selected,
    // using the down arrow will set focus on the first suggestion
    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowDown') {
        if (
          selectedSuggestion === null ||
          selectedSuggestion === autocompleteSuggestions.length - 1
        ) {
          setSelectedSuggestion(0);
        } else {
          setSelectedSuggestion(selectedSuggestion + 1);
        }
        // if the first suggested selection is selected,
        // using the up arrow will loop back to set focus on the last suggestion
      } else if (e.key === 'ArrowUp') {
        if (selectedSuggestion === 0) {
          setSelectedSuggestion(autocompleteSuggestions.length - 1);
        } else {
          setSelectedSuggestion(selectedSuggestion - 1);
        }
      } else if (
        e.key === 'Enter' &&
        autocompleteSuggestions[selectedSuggestion]
      ) {
        selectSuggestion(e, autocompleteSuggestions[selectedSuggestion].query);
      }
    };

    UseEscape(() => {
      if (clearOnEscape && document.activeElement === inputRef.current) {
        clearHandler();
      }
    });

    return (
      <div>
        <form onSubmit={submitHandler}>
          <div className="su-flex su-items-center">
            <span className="" />
            <div
              className={`su-flex su-w-full su-items-center su-relative ${wrapperClasses}`}
              ref={inputWrapper}
            >
              <label className="su-flex-grow su-max-w-full">
                <span className="su-sr-only">Search</span>
                <input
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-controls="search-autocomplete-listbox"
                  aria-expanded={showAutocomplete ? 'true' : 'false'}
                  aria-activedescendant={
                    selectedSuggestion !== null
                      ? `search-autocomplete-listbox-${selectedSuggestion}`
                      : ''
                  }
                  aria-haspopup="listbox"
                  onChange={inputHandler}
                  onKeyDown={handleArrowKeys}
                  className={inputClasses}
                  placeholder={placeholder || ''}
                  value={query}
                  ref={inputRef}
                />
              </label>
              <button
                type="button"
                onClick={clearHandler}
                className={clearBtnClasses}
              >
                Clear
                <X
                  className="su-inline-block su-ml-3 su-h-[1.1em] su-w-[1.1em]"
                  aria-hidden="true"
                />
              </button>
              <SearchAutocomplete
                autocompleteSuggestions={autocompleteSuggestions}
                showAutocomplete={showAutocomplete}
                onSelect={selectSuggestion}
                selectedSuggestion={selectedSuggestion}
                setSelectedSuggestion={setSelectedSuggestion}
                autocompleteContainerClasses={autocompleteContainerClasses}
                autocompleteLinkClasses={autocompleteLinkClasses}
                autocompleteLinkFocusClasses={autocompleteLinkFocusClasses}
              />
            </div>
            <button type="submit" className={submitBtnClasses}>
              <Search
                className="su-text-white su-w-20 su-h-20"
                aria-hidden="true"
              />
              <span className="su-sr-only">Search</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default SearchField;
