import React from "react";
import sanitize from "sanitize-html";
import UseEscape from "../../hooks/useEscape";

const searchAutocomplete = ({
  autocompleteSuggestions,
  setShowAutocomplete,
  showAutocomplete,
  onSelect,
  selectedSuggestion,
  setSelectedSuggestion,
  autocompleteContainerClasses,
  autocompleteLinkClasses,
  autocompleteLinkFocusClasses,
}) => {
  // Use Escape key to close autocomplete dropdown if it's currently open
  UseEscape(() => {
    if (showAutocomplete) {
      setShowAutocomplete(false);
    }
  });

  return (
    <div
      className={`${autocompleteContainerClasses}
      ${showAutocomplete && autocompleteSuggestions.length ? "" : "su-hidden"}`}
    >
      {Array.isArray(autocompleteSuggestions) && (
        <ul
          className="su-list-unstyled"
          role="listbox"
          id="search-autocomplete-listbox"
        >
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
              id={`search-autocomplete-listbox-${index}`}
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
};

export default searchAutocomplete;
