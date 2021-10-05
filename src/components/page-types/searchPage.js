import React, { useState, useEffect, useRef } from 'react';
import SbEditable from 'storyblok-react';
import algoliasearch from 'algoliasearch';
import {
  Container,
  Heading,
  Button,
  Grid,
  GridCell,
  Skiplink,
} from 'decanter-react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import {
  useQueryParam,
  NumberParam,
  StringParam,
  ArrayParam,
} from 'use-query-params';
import Icon from 'react-hero-icon';
import Layout from '../partials/layout';
import SearchField from '../search/searchField';
import SearchResults from '../search/searchResults';
import SearchPager from '../search/searchPager';
import SearchFacet from '../search/searchFacet';
import SearchNoResults from '../search/searchNoResults';
import SearchKeywordBanner from '../search/searchKeywordBanner';
import CreateBloks from '../../utilities/createBloks';
import UseEscape from '../../hooks/useEscape';
import UseOnClickOutside from '../../hooks/useOnClickOutside';
import getNumBloks from '../../utilities/getNumBloks';

const SearchPage = (props) => {
  const { blok } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useQueryParam('q', StringParam);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [siteParam, setSiteParam] = useQueryParam('site', ArrayParam);
  const [fileTypeParam, setFileTypeParam] = useQueryParam('type', ArrayParam);
  const [siteNameValues, setSiteNameValues] = useState(null);
  const [fileTypeValues, setFileTypeValues] = useState(null);
  const [selectedFacets, setSelectedFacets] = useState({
    siteName: siteParam || [],
    fileType: fileTypeParam || [],
  });
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [opened, setOpened] = useState(false);

  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const suggestionsIndex = client.initIndex(
    'crawler_federated-search_suggestions'
  );
  const hitsPerPage = blok.itemsPerPage;

  const ref = useRef(null);
  const filterOpenRef = useRef(null);

  const isExpanded = (x) => x.getAttribute('aria-expanded') === 'true';

  // Close menu if escape key is pressed and return focus to the menu button
  UseEscape(() => {
    if (filterOpenRef.current && isExpanded(filterOpenRef.current)) {
      setOpened(false);
      filterOpenRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setOpened(false));

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
  const submitSearchQuery = (queryText, action = 'submit') => {
    if (!queryText.length) {
      if (action === 'submit') {
        setShowEmptyMessage(true);
      } else {
        setShowEmptyMessage(false);
      }
    } else {
      setShowEmptyMessage(false);
      setPage(undefined);
      setQuery(queryText);
    }
  };

  // Update page parameter when pager link is selected.
  const updatePage = (pageNumber) => {
    setPage(pageNumber);
    scrollTo('#search-results');
  };

  // Update facet values when facet is selected.
  const updateSiteFacet = (values) => {
    const newFacets = { ...selectedFacets };
    newFacets.siteName = values;
    setSelectedFacets(newFacets);
    setPage(undefined);
    setSiteParam(values);
  };

  // Update facet values when facet is selected.
  const updateFileTypeFacet = (values) => {
    const newFacets = { ...selectedFacets };
    newFacets.fileType = values;
    setSelectedFacets(newFacets);
    setPage(undefined);
    setFileTypeParam(values);
  };

  const clearFilters = (e) => {
    const filters = document.getElementsByClassName('filters');
    if (filters) {
      Object.values(filters).forEach((set) => {
        Object.values(set.getElementsByTagName('input')).forEach((checkbox) => {
          // eslint-disable-next-line no-param-reassign
          checkbox.checked = false;
        });
      });
    }

    setSelectedFacets({
      siteName: [],
      fileType: [],
    });

    setPage(undefined);
    setFileTypeParam([]);
    setSiteParam([]);
  };

  // Fetch search results from Algolia. (Typically triggered by state changes in useEffect())
  const updateSearchResults = () => {
    const facetFilters = Object.keys(selectedFacets).map((attribute) =>
      selectedFacets[attribute].map((value) => `${attribute}:${value}`)
    );

    const siteNameFilters = [];
    Object.keys(selectedFacets).forEach((attribute) => {
      if (attribute !== 'siteName') {
        const filters = selectedFacets[attribute].map(
          (value) => `${attribute}:${value}`
        );
        siteNameFilters.push(filters);
      }
    });

    const fileTypeFilters = [];
    Object.keys(selectedFacets).forEach((attribute) => {
      if (attribute !== 'fileType') {
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
          indexName: 'crawler_federated-search',
          query,
          params: {
            hitsPerPage,
            page,
            facets: ['siteName', 'fileType'],
            facetFilters,
          },
        },
        // Disjunctive query for siteName facet values.
        {
          indexName: 'crawler_federated-search',
          query,
          params: {
            facets: ['siteName', 'fileType'],
            facetFilters: siteNameFilters,
          },
        },
        // Disjunctive query for fileType facet values.
        {
          indexName: 'crawler_federated-search',
          query,
          params: {
            facets: ['siteName', 'fileType'],
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

  const wrapperClasses = `su-flex-grow su-w-auto su-border-0 su-border-b su-border-solid su-border-black-60`;

  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hocus:su-bg-transparent su-text-black-70 hocus:su-text-black hocus:su-underline su-text-m0 su-font-semibold su-border-none  su-p-0 su-rs-mr-1 su-mt-03em`;

  const inputClasses = `su-border-0 su-text-m2 su-leading-display su-w-full su-flex-1 su-rs-px-1 su-py-10 su-outline-none focus:su-ring-0 focus:su-ring-transparent`;

  const submitBtnClasses = `su-flex su-items-center su-justify-center su-w-40 su-min-w-[4rem] su-h-40 md:children:su-w-20 md:children:su-h-20 su-rounded-full su-transition-colors su-bg-digital-red-light hocus:su-bg-cardinal-red-xdark su-ml-10`;

  const autocompleteLinkClasses = `su-cursor-pointer su-font-regular su-inline-block su-w-full su-text-white su-no-underline su-px-15 su-py-10 su-rounded-full hover:su-bg-digital-red hover:su-text-white`;

  const autocompleteLinkFocusClasses = `su-bg-digital-red`;

  const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-cardinal-red-xxdark su-p-10 su-shadow-md su-w-full su-border su-border-digital-red-light su-rounded-b-[0.5rem] su-z-20`;
  const facets = results.facets && (
    <React.Fragment>
      {siteNameValues && (
        <SearchFacet
          label="Sites"
          attribute="siteName"
          facetValues={siteNameValues}
          selectedOptions={selectedFacets.siteName}
          onChange={(values) => updateSiteFacet(values)}
          className={!!selectedFacets.siteName.length && 'su-mb-[16px]'}
          exclude={['YouTube', 'SoundCloud', 'Apple Podcasts']}
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
          className="su-mb-[16px]"
          exclude={['html', 'pdf']}
        />
      )}
    </React.Fragment>
  );

  return (
    <SbEditable content={blok}>
      <Layout hasHero={false} {...props}>
        <Container
          element="section"
          width="full"
          className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-foggy-light su-flex-wrap"
          id="main-content"
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
          <Grid gap xs={12} className="su-z-10 su-relative su-basefont-19">
            <GridCell
              xs={12}
              lg={results.nbHits > 0 ? 6 : 8}
              className={
                results.nbHits > 0 ? 'lg:su-col-start-4' : 'lg:su-col-start-3'
              }
            >
              <SearchField
                onInput={(queryText) => updateAutocomplete(queryText)}
                onSubmit={(queryText) => submitSearchQuery(queryText)}
                onReset={() => submitSearchQuery('', 'reset')}
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
              {showEmptyMessage && (
                <p className="su-text-m1 su-font-serif su-font-bold su-rs-mt-2 su-mb-0">
                  {blok.emptySearchMessage}
                </p>
              )}
            </GridCell>
          </Grid>
          {getNumBloks(blok.aboveResultsContent) > 0 && (
            <div className="above-results-content su-rs-mt-7">
              <CreateBloks blokSection={blok.aboveResultsContent} />
            </div>
          )}
          <Grid xs={12} className="filters su-rs-mt-7 lg:su-grid-gap">
            {results.nbHits > 0 && (
              <React.Fragment>
                <GridCell
                  xs={12}
                  lg={3}
                  className={`lg:su-hidden su-relative su-mb-[4rem] ${
                    opened ? 'su-shadow-xl' : ''
                  }`}
                >
                  <div ref={ref}>
                    <button
                      type="button"
                      className={`su-group su-flex su-w-full su-justify-between su-border su-px-[20px] su-text-21 su-font-semibold su-items-center su-transition-colors
                        ${
                          opened
                            ? 'su-border-digital-red su-text-white su-bg-digital-red'
                            : 'su-border-black-30 su-text-digital-red-light hocus:su-bg-digital-red hocus:su-border-digital-red hocus:su-text-white hocus:su-shadow-lg'
                        }`}
                      aria-expanded={opened}
                      ref={filterOpenRef}
                      onClick={() => setOpened(!opened)}
                    >
                      <span className="su-py-[14px] su-flex">
                        {opened ? 'Filters' : ' Filter results'}
                      </span>
                      {opened ? (
                        <span className="su-ml-02em su-font-regular su-flex su-items-center su-text-18 group-hocus:su-underline">
                          Close
                          <Icon icon="x" className="su-w-14 su-ml-6" />
                        </span>
                      ) : (
                        <span className="su-flex su-items-center su-mt-0 su-text-digital-red-light group-hocus:su-text-white hocus:su-shadow-none">
                          <Icon icon="chevron-down" />
                        </span>
                      )}
                    </button>

                    {opened && (
                      <div className="su-absolute su-top-[100%] su-left-0 su-w-full su-z-10 su-bg-white su-shadow-2xl su-border su-border-solid su-border-black-10">
                        <div className="su-rs-p-0">{facets}</div>

                        <div className="su-flex su-justify-end su-rs-px-0 su-rs-pt-0 su-rs-pb-2 su-bg-foggy-light su-border-t su-border-black-20">
                          <Button
                            text="Clear all"
                            variant="unset"
                            onClick={() => clearFilters()}
                            className={{
                              'su-text-16': false,
                              'md:su-text-20': false,
                              'su-text-digital-red-light su-text-18 hocus:su-text-cardinal-red hocus:su-shadow-none': true,
                            }}
                          >
                            Clear all
                          </Button>

                          <Button
                            animate="right"
                            icon="more"
                            variant="solid"
                            size="default"
                            className={{
                              'su-text-16': false,
                              'md:su-text-20': false,
                              'su-text-18 hocus:su-bg-cardinal-red-xdark hocus:su-border-cardinal-red-xdark': true,
                            }}
                            onClick={() => {
                              setOpened(false);
                              scrollTo('#search-results');
                              document
                                .getElementById('number-search-results')
                                .focus();
                            }}
                          >
                            View Results
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </GridCell>

                <GridCell
                  xs={12}
                  lg={3}
                  className="su-mb-[4rem] su-hidden lg:su-flex"
                >
                  <Skiplink
                    anchorLink="#search-results-section"
                    className="su-hidden lg:su-block"
                  >
                    Skip pass filters to search results
                  </Skiplink>
                  <h2 className="su-sr-only">Filter Search Results</h2>
                  <div>{facets}</div>
                </GridCell>
              </React.Fragment>
            )}
            <GridCell
              xs={12}
              lg={results.nbHits > 0 ? 9 : 8}
              xxl={8}
              className={
                results.nbHits > 0 ? '' : 'lg:su-col-start-3 2xl:su-col-start-3'
              }
              id="search-results-section"
            >
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
                  heading={blok.noResultsHeading.replace('[query]', query)}
                  body={blok.noResultsBody}
                  additionalContent={blok.noResultsAdditionalContent}
                />
              )}
            </GridCell>
          </Grid>

          {getNumBloks(blok.belowResultsContent) > 0 && (
            <div className="below-results-content">
              <CreateBloks blokSection={blok.belowResultsContent} />
            </div>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default SearchPage;
