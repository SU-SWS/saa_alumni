import React, { useState, createRef } from "react";
import { X, Search } from "react-hero-icon/solid";
import SearchAutocomplete from "./searchAutocomplete";
import UseEscape from "../../hooks/useEscape";
import UseOnClickOutside from "../../hooks/useOnClickOutside";

const SearchField = React.forwardRef(
  ({ 
    onSubmit, 
    onInput, 
    autocompleteSuggestions, 
    defaultValue, 
    inputClasses, 
    submitBtnClasses, 
    clearBtnClasses,
    autocompleteLinkClasses, 
    autocompleteContainerClasses 
  }, ref) => {
    const [query, setQuery] = useState(defaultValue || "");
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    const inputWrapper = createRef();

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

    const clearHandler = () => {
      setQuery("");
      setShowAutocomplete(false);
      onSubmit("");
    };

    const selectSuggestion = (e, suggestion) => {
      e.preventDefault();
      setQuery(suggestion);
      setShowAutocomplete(false);
      onSubmit(suggestion);
    };

    UseOnClickOutside(inputWrapper, () => {
      setShowAutocomplete(false);
    });

    const handleArrowKeys = (e) => {
      if (e.key === "ArrowDown") {
        setSelectedSuggestion(selectedSuggestion + 1);
      } else if (e.key === "ArrowUp") {
        setSelectedSuggestion(selectedSuggestion - 1);
      } else if (
        e.key === "Enter" &&
        autocompleteSuggestions[selectedSuggestion]
      ) {
        selectSuggestion(e, autocompleteSuggestions[selectedSuggestion].query);
      }
    };

    UseEscape(() => {
      clearHandler();
    });

    return (
      <div>
        <form onSubmit={submitHandler}>
          <div className="su-flex su-items-center">
            <span className="" />
            <div
              className="su-flex su-w-full su-items-center su-relative"
              ref={inputWrapper}
            >
              <label className="su-flex-grow su-max-w-full">
                <span className="su-sr-only">Search</span>
                <input
                  type="text"
                  role="combobox"
                  aria-controls="search-autocomplete-listbox"
                  aria-expanded={showAutocomplete ? "true" : "false"}
                  onChange={inputHandler}
                  onKeyDown={handleArrowKeys}
                  className={inputClasses}
                  value={query}
                  ref={ref}
                />
              </label>
              <button
                type="button"
                onClick={clearHandler}
                className={clearBtnClasses}
              >
                Clear <X className="su-inline-block su-ml-3 su-mt-5" />
              </button>
              <SearchAutocomplete
                autocompleteSuggestions={autocompleteSuggestions}
                showAutocomplete={showAutocomplete}
                onSelect={selectSuggestion}
                selectedSuggestion={selectedSuggestion}
                autocompleteContainerClasses={autocompleteContainerClasses}
                autocompleteLinkClasses={autocompleteLinkClasses}
              />
            </div>
            <button type="submit" className={submitBtnClasses}>
              <Search className="su-text-white" />
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default SearchField;
