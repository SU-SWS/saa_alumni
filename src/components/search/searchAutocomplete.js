import React from "react";
import sanitize from "sanitize-html";

const searchAutocompleteListboxID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  const hash = Math.random().toString(36).substr(2, 9);

  return `search-autocomplete-listbox_${hash}`;
};

const searchAutocomplete = ({
  autocompleteSuggestions,
  showAutocomplete,
  onSelect,
  selectedSuggestion,
  setSelectedSuggestion,
  autocompleteContainerClasses,
  autocompleteLinkClasses,
  autocompleteLinkFocusClasses,
}) => (
  <div
    className={`${autocompleteContainerClasses}
    ${showAutocomplete && autocompleteSuggestions.length ? "" : "su-hidden"}`}
  >
    {Array.isArray(autocompleteSuggestions) && (
      <ul className="su-list-unstyled" role="listbox">
        {autocompleteSuggestions.map((suggestion, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <li
            key={`autocomplete-item-${suggestion.objectID}`}
            role="option"
            tabIndex={index === selectedSuggestion ? 0 : -1}
            className={`su-mb-0
                        ${autocompleteLinkClasses}
                        ${
                          index === selectedSuggestion
                            ? autocompleteLinkFocusClasses
                            : ""
                        }
                      `}
            onClick={(e) => onSelect(e, suggestion.query)}
            onKeyDown={(e) => {
              // On Enter or Spacebar
              if (e.key === "Enter" || e.key === " ") {
                onSelect(e, suggestion.query);
              }
            }}
            onFocus={(e) => setSelectedSuggestion(index)}
            aria-selected={selectedSuggestion === index ? "true" : "false"}
            id={searchAutocompleteListboxID()}
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
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default searchAutocomplete;
