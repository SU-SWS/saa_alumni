import React, { useState, createRef } from "react";
import { X, Search } from "react-hero-icon/solid";
import sanitize from "sanitize-html";
import UseEscape from "../../hooks/useEscape";
import UseOnClickOutside from "../../hooks/useOnClickOutside";

const SearchField = ({
  onSubmit,
  onInput,
  autocompleteSuggestions,
  defaultValue,
}) => {
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
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && autocompleteSuggestions[selectedSuggestion]) {
      selectSuggestion(e, autocompleteSuggestions[selectedSuggestion].query);
    }
  };

  UseEscape(() => {
    clearHandler();
  });

  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hover:su-bg-transparent su-text-21 su-font-semibold
  hover:su-text-black su-border-none su-text-black-70 su-p-0 su-absolute su-top-[1.5rem] su-right-0 xl:su-right-50
  focus:su-bg-transparent focus:su-text-black-70`;

  const inputClasses = `su-text-30 su-font-semibold su-w-full su-flex-1 su-border-0 su-border-b
  su-border-solid su-border-black-60 su-pl-20 su-pr-70 xl:su-pr-126 su-py-10 su-text-m2`;

  const submitBtnClasses = `su-w-40 su-h-40 su-rounded-full su-bg-digital-red-light
   su-p-10 su-origin-center su-transform su-rotate-90 su-ml-10`;

  const autocompleteLinkClasses = `su-font-regular su-inline-block su-w-full su-text-black su-no-underline su-px-15
   su-py-10 su-rounded-[1rem] hover:su-bg-black-20 hover:su-text-digital-red-light`;

  const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-white su-p-10 su-shadow-md su-w-full su-border
   su-border-digital-red-light su-rounded-b-[0.5rem]
   ${showAutocomplete ? "" : "su-hidden"}`;

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
              />
            </label>
            <button
              type="button"
              onClick={clearHandler}
              className={clearBtnClasses}
            >
              Clear <X className="su-inline-block su-ml-3 su-mt-5" />
            </button>
            <div className={autocompleteContainerClasses}>
              {Array.isArray(autocompleteSuggestions) && (
                <div className="su-list-unstyled" role="listbox">
                  {autocompleteSuggestions.map((suggestion, index) => (
                    <div
                      key={`autocomplete-item-${suggestion.objectID}`}
                      role="option"
                      tabIndex={showAutocomplete ? 0 : -1}
                      className={`su-mb-0
                        ${autocompleteLinkClasses}
                        ${
                          index === selectedSuggestion
                            ? "su-bg-black-20 su-text-digital-red"
                            : ""
                        }
                      `}
                      onKeyDown={(e) => handleEnterKey}
                      onClick={(e) => selectSuggestion(e, suggestion.query)}
                      aria-selected={
                        selectedSuggestion === index ? "true" : "false"
                      }
                      id="search-autocomplete-listbox"
                    >
                      {
                        // eslint-disable-next-line no-underscore-dangle
                        suggestion._highlightResult && (
                          <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: sanitize(
                                // eslint-disable-next-line no-underscore-dangle
                                suggestion._highlightResult.query.value
                              ),
                            }}
                          />
                        )
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className={submitBtnClasses}>
            <Search className="su-text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchField;
