import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { navigate } from "gatsby";
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

  const inputClasses = `su-bg-transparent su-text-30 su-text-black-40 su-font-semibold su-w-full su-flex-1 su-border-0 su-border-b-2
  su-border-solid su-border-black-10 su-pl-20 su-pr-70 xl:su-pr-126 su-py-10 su-text-m2 focus:su-outline-none`;

  const submitBtnClasses = `su-w-70 su-h-70 su-rounded-full su-bg-digital-red
   su-p-20 su-origin-center su-transform su-rotate-90 su-ml-20`;

  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hover:su-bg-transparent su-text-21 su-font-semibold
  hover:su-text-black su-border-none su-text-black-70 su-p-0 su-absolute su-top-[1.5rem] su-right-0 xl:su-right-50
  focus:su-bg-transparent focus:su-text-black-70`;

  const autocompleteLinkClasses = `su-font-regular su-inline-block su-w-full su-text-black su-no-underline su-px-15
   su-py-10 su-rounded-[1rem] hover:su-bg-black-20 hover:su-text-digital-red-light`;

  const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-white su-p-10 su-shadow-md su-w-full su-border
   su-border-digital-red-light su-rounded-b-[0.5rem]`;

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
    navigate(`/search?q=${queryText}`);
  };

  return (
    <div>
      <SearchField
        onInput={(queryText) => updateAutocomplete(queryText)}
        onSubmit={(queryText) => submitSearchQuery(queryText)}
        defaultValue={query}
        autocompleteSuggestions={suggestions}
        clearBtnClasses={clearBtnClasses}
        inputClasses={inputClasses}
        submitBtnClasses={submitBtnClasses}
        autocompleteLinkClasses={autocompleteLinkClasses}
        autocompleteContainerClasses={autocompleteContainerClasses}
        ref={ref}
      />
    </div>
  );
});

export default SearchFieldModal;
