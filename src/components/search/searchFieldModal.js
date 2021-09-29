import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import SearchField from "./searchField";

const SearchFieldModal = React.forwardRef((props, ref) => {
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );

  const suggestionsIndex = client.initIndex(
    "crawler_federated-search_suggestions"
  );

  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const wrapperClasses = `su-border-0 su-border-b-2 su-border-solid su-border-black-10`;

  const inputClasses = `search-input-modal su-border-0 su-bg-transparent su-text-black-10 su-text-black-40::placeholder su-w-full su-flex-1
  su-rs-px-1 su-py-02em su-text-m2 md:su-text-m4 su-leading-display focus:su-outline-none focus:su-ring-0 focus:su-ring-transparent`;

  const submitBtnClasses = `su-flex su-items-center su-justify-center su-min-w-[4rem] su-w-40 su-h-40 md:su-min-w-[7rem] md:su-w-70 md:su-h-70 md:children:su-w-40 md:children:su-h-40 su-rounded-full su-transition-colors
  su-bg-digital-red hocus:su-bg-digital-red-xlight su-origin-center su-rs-ml-0`;

  const clearBtnClasses = `su-flex su-items-end su-transition-colors su-bg-transparent hover:su-bg-transparent
  hocus:su-text-digital-red-xlight hocus:su-underline su-text-m0 md:su-text-m1 su-font-semibold
  su-border-none su-text-white su-p-0 focus:su-bg-transparent su-rs-mr-1 su-mt-03em`;

  const autocompleteLinkClasses = `su-cursor-pointer su-font-regular su-inline-block su-w-full su-text-white su-no-underline su-px-15 su-py-10 su-rounded-full hover:su-bg-digital-red hover:su-text-white`;

  const autocompleteLinkFocusClasses = `su-bg-digital-red`;

  const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-cardinal-red-xxdark su-p-10 su-shadow-md su-w-full su-border su-border-digital-red su-rounded-b-[0.5rem] su-z-20`;

  // Update autocomplete suggestions when search input changes.
  const updateAutocomplete = (queryText) => {
    suggestionsIndex
      .search(queryText, {
        hitsPerPage: 10,
      })
      .then((queryResults) => {
        setSuggestions(queryResults.hits);
      });
  };

  const submitSearchQuery = (queryText) => {
    setQuery(queryText);
    props.onSubmit(queryText);
  };

  return (
    <div>
      <SearchField
        onInput={(queryText) => updateAutocomplete(queryText)}
        onSubmit={(queryText) => submitSearchQuery(queryText)}
        onReset={() => null}
        defaultValue={query}
        autocompleteSuggestions={suggestions}
        clearBtnClasses={clearBtnClasses}
        wrapperClasses={wrapperClasses}
        inputClasses={inputClasses}
        submitBtnClasses={submitBtnClasses}
        autocompleteLinkClasses={autocompleteLinkClasses}
        autocompleteLinkFocusClasses={autocompleteLinkFocusClasses}
        autocompleteContainerClasses={autocompleteContainerClasses}
        placeholder="Search"
        ref={ref}
      />
    </div>
  );
});

export default SearchFieldModal;
