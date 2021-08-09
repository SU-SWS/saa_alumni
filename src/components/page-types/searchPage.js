import React, { useState, useEffect, useImperativeHandle } from "react";
import SbEditable from "storyblok-react";
import algoliasearch from "algoliasearch";
import { Container, FlexCell, FlexBox, Heading } from "decanter-react";
import scrollTo from "gatsby-plugin-smoothscroll";
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
import SearchKeywordBanner from "../search/searchKeywordBanner";
import CreateBloks from "../../utilities/createBloks";

const SearchPage = (props) => {
  const { blok } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [queryParam, setQueryParam] = useQueryParam("q", StringParam);
  const [pageParam, setPageParam] = useQueryParam("page", NumberParam);
  const [siteParam, setSiteParam] = useQueryParam("site", ArrayParam);
  const [fileTypeParam, setFileTypeParam] = useQueryParam("type", ArrayParam);
  const [query, setQuery] = useState(queryParam || "");
  const [page, setPage] = useState(pageParam || 0);
  const [siteNameValues, setSiteNameValues] = useState(null);
  const [fileTypeValues, setFileTypeValues] = useState(null);
  const [selectedFacets, setSelectedFacets] = useState({
    siteName: siteParam || [],
    fileType: fileTypeParam || [],
  });
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

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
  const submitSearchQuery = (queryText, action = "submit") => {
    if (!queryText.length) {
      if (action === "submit") {
        setShowEmptyMessage(true);
      } else {
        setShowEmptyMessage(false);
      }
    } else {
      setShowEmptyMessage(false);
      setPageParam(undefined);
      setQueryParam(queryText || undefined);
      setPage(0);
      setQuery(queryText);
    }
  };

  // Update page parameter when pager link is selected.
  const updatePage = (pageNumber) => {
    setPage(pageNumber);
    setPageParam(pageNumber);
    scrollTo("#search-results");
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

  // Update facet values when facet is selected.
  const updateFileTypeFacet = (values) => {
    const newFacets = { ...selectedFacets };
    newFacets.fileType = values;
    setSelectedFacets(newFacets);
    setPageParam(undefined);
    setPage(0);
    setFileTypeParam(values);
  };

  // Fetch search results from Algolia. (Typically triggered by state changes in useEffect())
  const updateSearchResults = () => {
    const facetFilters = Object.keys(selectedFacets).map((attribute) =>
      selectedFacets[attribute].map((value) => `${attribute}:${value}`)
    );

    const siteNameFilters = [];
    Object.keys(selectedFacets).forEach((attribute) => {
      if (attribute !== "siteName") {
        const filters = selectedFacets[attribute].map(
          (value) => `${attribute}:${value}`
        );
        siteNameFilters.push(filters);
      }
    });

    const fileTypeFilters = [];
    Object.keys(selectedFacets).forEach((attribute) => {
      if (attribute !== "fileType") {
        const filters = selectedFacets[attribute].map(
          (value) => `${attribute}:${value}`
        );
        fileTypeFilters.push(filters);
      }
    });

    client
      .multipleQueries([
        // Query for search results.
        {
          indexName: "crawler_federated-search",
          query,
          params: {
            hitsPerPage,
            page,
            facets: ["siteName", "fileType"],
            facetFilters,
          },
        },
        // Disjunctive query for siteName facet values.
        {
          indexName: "crawler_federated-search",
          query,
          params: {
            facets: ["siteName", "fileType"],
            facetFilters: siteNameFilters,
          },
        },
        // Disjunctive query for fileType facet values.
        {
          indexName: "crawler_federated-search",
          query,
          params: {
            facets: ["siteName", "fileType"],
            facetFilters: fileTypeFilters,
          },
        },
      ])
      .then((queryResults) => {
        setResults(queryResults.results[0]);
        setSiteNameValues(queryResults.results[1].facets.siteName);
        setFileTypeValues(queryResults.results[2].facets.fileType);
      });
  };

  // Listen for changes to query, pager, or facets and update search results.
  useEffect(() => {
    updateSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, selectedFacets]);

  const wrapperClasses = `su-border-0 su-border-b su-border-solid su-border-black-60`;

  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hover:su-bg-transparent su-text-21 su-font-semibold
  hover:su-text-black su-border-none su-text-black-70 su-p-0 focus:su-bg-transparent focus:su-text-black-70 su-rs-mr-1`;

  const inputClasses = `su-text-30 su-w-full su-flex-1 su-rs-px-1 su-py-10 su-text-m2`;

  const submitBtnClasses = `su-w-40 su-h-40 su-rounded-full su-bg-digital-red-light
   su-p-10 su-origin-center su-transform su-ml-10`;

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
          className="su-py-45 su-max-w-full su-w-full md:su-py-80 "
        >
          {showEmptyMessage && (
            <p className="su-text-center">{blok.emptySearchMessage}</p>
          )}

          <FlexBox gap justifyContent="center" className="su-z-10 su-relative">
            <FlexCell xs="full" lg={results.facets ? 6 : 8}>
              <SearchField
                onInput={(queryText) => updateAutocomplete(queryText)}
                onSubmit={(queryText) => submitSearchQuery(queryText)}
                onReset={() => submitSearchQuery("", "reset")}
                defaultValue={query}
                autocompleteSuggestions={suggestions}
                clearBtnClasses={clearBtnClasses}
                inputClasses={inputClasses}
                wrapperClasses={wrapperClasses}
                submitBtnClasses={submitBtnClasses}
                autocompleteLinkClasses={autocompleteLinkClasses}
                autocompleteLinkFocusClasses={autocompleteLinkFocusClasses}
                autocompleteContainerClasses={autocompleteContainerClasses}
                clearOnEscape
              />
            </FlexCell>
          </FlexBox>
          {blok.aboveResultsContent && (
            <div className="su-mt-50 md:su-mt-70 xl:su-mt-[12rem]">
              <CreateBloks blokSection={blok.aboveResultsContent} />
            </div>
          )}
          <FlexBox
            wrap="wrap"
            justifyContent={results.facets ? "start" : "center"}
            className="su-mt-50 md:su-mt-70 xl:su-mt-[12rem] lg:su-grid-gap"
          >
            {results.facets && (
              <FlexCell xs="full" lg={3} className="su-mb-[4rem] ">
                {siteNameValues && (
                  <SearchFacet
                    label="Sites"
                    attribute="siteName"
                    facetValues={siteNameValues}
                    selectedOptions={selectedFacets.siteName}
                    onChange={(values) => updateSiteFacet(values)}
                    exclude={["YouTube", "SoundCloud", "Apple Podcasts"]}
                  />
                )}
                {fileTypeValues && (
                  <SearchFacet
                    label="Media"
                    attribute="fileType"
                    facetValues={fileTypeValues}
                    selectedOptions={selectedFacets.fileType}
                    onChange={(values) => updateFileTypeFacet(values)}
                    optionClasses="su-capitalize"
                    exclude={["html", "pdf"]}
                  />
                )}
              </FlexCell>
            )}
            <FlexCell xs="full" lg={8}>
              <SearchKeywordBanner queryText={query} />
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

          {blok.belowResultsContent && (
            <div>
              <CreateBloks blokSection={blok.belowResultsContent} />
            </div>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default SearchPage;
