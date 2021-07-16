import React, { useState, useEffect } from "react";
import SbEditable from "storyblok-react";
import algoliasearch from "algoliasearch";
import { Container, FlexCell, FlexBox, Heading } from "decanter-react";
import {
  useQueryParam,
  NumberParam,
  StringParam,
  ArrayParam,
} from "use-query-params";
import Layout from "../partials/layout";
import SearchField from "../search/searchField";
import SearchResults from "../search/searchResults";
import SearchPager from "../search/searchPager";
import SearchFacet from "../search/searchFacet";
import SearchNoResults from "../search/searchNoResults";

const SearchPage = (props) => {
  const { blok } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [queryParam, setQueryParam] = useQueryParam("q", StringParam);
  const [pageParam, setPageParam] = useQueryParam("page", NumberParam);
  const [siteParam, setSiteParam] = useQueryParam("site", ArrayParam);
  const [query, setQuery] = useState(queryParam || "");
  const [page, setPage] = useState(pageParam || 0);
  const [selectedFacets, setSelectedFacets] = useState({
    siteName: siteParam || [],
  });

  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const index = client.initIndex("crawler_federated-search");
  const suggestionsIndex = client.initIndex(
    "crawler_federated-search_suggestions"
  );
  const hitsPerPage = blok.itemsPerPage;

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

  // Submit handler for search input.
  const submitSearchQuery = (queryText) => {
    setPageParam(undefined);
    setQueryParam(queryText || undefined);
    setPage(0);
    setQuery(queryText);
  };

  // Update page parameter when pager link is selected.
  const updatePage = (pageNumber) => {
    setPage(pageNumber);
    setPageParam(pageNumber);
  };

  // Update facet values when facet is selected.
  const updateSiteFacet = (values) => {
    const newFacets = { ...selectedFacets };
    newFacets.siteName = values;
    setSelectedFacets(newFacets);
    setPageParam(undefined);
    setPage(0);
    setSiteParam(values);
  };

  // Fetch search results from Algolia. (Typically triggered by state changes in useEffect())
  const updateSearchResults = () => {
    const facetFilters = Object.keys(selectedFacets).map((attribute) =>
      selectedFacets[attribute].map((value) => `${attribute}:${value}`)
    );

    index
      .search(query, {
        hitsPerPage,
        page,
        facets: ["domain", "siteName"],
        facetFilters,
      })
      .then((queryResults) => {
        setResults(queryResults);
      });
  };

  // Listen for changes to query, pager, or facets and update search results.
  useEffect(() => {
    updateSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, selectedFacets]);

  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hover:su-bg-transparent su-text-21 su-font-semibold
  hover:su-text-black su-border-none su-text-black-70 su-p-0 su-absolute su-top-[1.5rem] su-right-0 xl:su-right-50
  focus:su-bg-transparent focus:su-text-black-70`;

  const inputClasses = `su-text-30 su-font-semibold su-w-full su-flex-1 su-border-0 su-border-b
  su-border-solid su-border-black-60 su-pl-20 su-pr-70 xl:su-pr-126 su-py-10 su-text-m2`;

  const submitBtnClasses = `su-w-40 su-h-40 su-rounded-full su-bg-digital-red-light
   su-p-10 su-origin-center su-transform su-rotate-90 su-ml-10`;

  const autocompleteLinkClasses = `su-font-regular su-inline-block su-w-full su-text-black su-no-underline su-px-15
   su-py-10 su-rounded-[1rem] hover:su-bg-black-20 hover:su-text-digital-red-light`;

  const autocompleteLinkFocusClasses = `su-bg-black-20 su-text-digital-red`;

  const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-white su-p-10 su-shadow-md su-w-full su-border
   su-border-digital-red-light su-rounded-b-[0.5rem]`;

  return (
    <SbEditable content={blok}>
      <Layout hasHero={false} isDark {...props}>
        <Container
          element="section"
          width="full"
          className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-foggy-light su-flex-wrap"
        >
          <Heading level={1} font="serif" weight="bold" className="su-mb-0">
            {blok.pageTitle}
          </Heading>
        </Container>
        <Container
          element="section"
          width="site"
          className="su-py-45 su-max-w-full md:su-py-80 "
        >
          <FlexBox gap justifyContent="center">
            <FlexCell xs="full" lg={results.facets ? 6 : 8}>
              <SearchField
                onInput={(queryText) => updateAutocomplete(queryText)}
                onSubmit={(queryText) => submitSearchQuery(queryText)}
                defaultValue={query}
                autocompleteSuggestions={suggestions}
                clearBtnClasses={clearBtnClasses}
                inputClasses={inputClasses}
                submitBtnClasses={submitBtnClasses}
                autocompleteLinkClasses={autocompleteLinkClasses}
                autocompleteLinkFocusClasses={autocompleteLinkFocusClasses}
                autocompleteContainerClasses={autocompleteContainerClasses}
                clearOnEscape
              />
            </FlexCell>
          </FlexBox>
          <FlexBox
            wrap="wrap"
            justifyContent={results.facets ? "start" : "center"}
            className="su-mt-50 md:su-mt-70 xl:su-mt-[12rem]"
          >
            {results.facets && (
              <FlexCell xs="full" lg={3} className="su-mb-[4rem] ">
                {results.facets.siteName && (
                  <SearchFacet
                    attribute="siteName"
                    facetValues={results.facets.siteName}
                    selectedOptions={selectedFacets.siteName}
                    onChange={(values) => updateSiteFacet(values)}
                  />
                )}
              </FlexCell>
            )}
            <FlexCell xs="full" lg={8}>
              {results.nbHits > 0 && (
                <>
                  <SearchResults results={results} />
                </>
              )}

              {results.nbHits > hitsPerPage && (
                <SearchPager
                  activePage={page}
                  nbPages={results.nbPages}
                  maxLinks={blok.maxPagerLinks}
                  selectPage={updatePage}
                />
              )}

              {!results.nbHits && query && (
                <SearchNoResults
                  heading={blok.noResultsHeading.replace("[query]", query)}
                  body={blok.noResultsBody}
                  additionalContent={blok.noResultsAdditionalContent}
                />
              )}
            </FlexCell>
          </FlexBox>
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default SearchPage;
