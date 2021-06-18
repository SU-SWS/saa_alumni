import React, { useState, useEffect, createRef } from "react";
import { X } from "react-hero-icon/solid";
import { Search } from "react-hero-icon/solid";

const SearchField = ({ onSubmit, onInput, autocompleteSuggestions }) => {
  const [query, setQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputWrapper = createRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setShowAutocomplete(false);
    onSubmit(query);
  };

  const inputHandler = async (e) => {
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

  const clickOutside = (e) => {
    if (inputWrapper.current && !inputWrapper.current.contains(e.target)) {
      setShowAutocomplete(false);
    }
  };

  const handleArrowKeys = (e) => {
    if (e.key == "ArrowDown") {
      setSelectedSuggestion(selectedSuggestion + 1);
    } else if (e.key == "ArrowUp") {
      setSelectedSuggestion(selectedSuggestion - 1);
    } else if (e.key == "Enter") {
      selectSuggestion(e, autocompleteSuggestions[selectedSuggestion].query);
    }
  };

  // Close autocomplete when clicking outside of area.
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
  });

  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hover:su-bg-transparent su-text-21 su-font-semibold
  hover:su-text-black su-border-none su-text-black-70 su-p-0 su-absolute su-top-[1.5rem] su-right-0 xl:su-right-50`;

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
            className="su-items-end su-flex su-w-full su-items-center su-relative"
            ref={inputWrapper}
          >
            <label className="su-flex-grow su-max-w-full">
              <span className="su-sr-only">Search</span>
              <input
                type="text"
                onChange={inputHandler}
                onKeyDown={handleArrowKeys}
                className={inputClasses}
                value={query}
              />
            </label>
            <button
              type="reset"
              onClick={clearHandler}
              className={clearBtnClasses}
            >
              Clear <X className="su-inline-block su-ml-3 su-mt-5" />
            </button>
            <div className={autocompleteContainerClasses}>
              {Array.isArray(autocompleteSuggestions) && (
                <ul className="su-list-unstyled">
                  {autocompleteSuggestions.map((suggestion, index) => (
                    <li
                      key={`autocomplete-item-${index}`}
                      className="su-mb-0"
                      aria-selected={
                        index == selectedSuggestion ? "true" : "false"
                      }
                    >
                      <a
                        href=""
                        onClick={(e) => selectSuggestion(e, suggestion)}
                        className={`
                        ${autocompleteLinkClasses}
                        ${
                          index == selectedSuggestion
                            ? "su-bg-black-20 su-text-digital-red-light"
                            : ""
                        }
                      `}
                      >
                        {suggestion._highlightResult && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: suggestion._highlightResult.query.value,
                            }}
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
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
