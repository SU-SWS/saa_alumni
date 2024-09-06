import React, { useState, useEffect, useRef } from 'react';
import SbEditable from 'storyblok-react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import {
  InstantSearch,
  Hits,
  Configure,
  useInstantSearch,
  useCurrentRefinements,
  useHits,
} from 'react-instantsearch';
import Icon from 'react-hero-icon';
import { dcnb } from 'cnbuilder';
import { SAAButton } from '../simple/SAAButton';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';
import { Skiplink } from '../accessibility/Skiplink';
import { Heading } from '../simple/Heading';
import Layout from '../partials/layout';
import SearchField from '../search/searchField';
import SearchResults from '../search/searchResults';
import SearchPager from '../search/searchPager';
import SearchFacet from '../search/searchFacet';
import SearchNoResults from '../search/searchNoResults';
import SearchKeywordBanner from '../search/searchKeywordBanner';
import CreateBloks from '../../utilities/createBloks';
import useEscape from '../../hooks/useEscape';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import getNumBloks from '../../utilities/getNumBloks';

const SearchPageContent = ({ blok, ...props }) => {
  const { status } = useInstantSearch();
  const { items } = useHits();
  const { items: currentRefinements } = useCurrentRefinements();

  return (
    <SbEditable content={blok}>
        <Layout hasHero={false} {...props}>
          <Container
            as="section"
            width="full"
            className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-foggy-light su-flex-wrap"
            id="main-content"
          >
            <Heading level={1} font="serif" className="su-mb-0">
              {blok.pageTitle}
            </Heading>
          </Container>
          <Container
            as="section"
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
                {/* <SearchField
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
                /> */}
                {/* {showEmptyMessage && (
                  <p className="su-text-m1 su-font-serif su-font-bold su-rs-mt-2 su-mb-0">
                    {blok.emptySearchMessage}
                  </p>
                )} */}
              </GridCell>
            </Grid>
            {getNumBloks(blok.aboveResultsContent) > 0 && (
              <div className="above-results-content su-rs-mt-7">
                <CreateBloks blokSection={blok.aboveResultsContent} />
              </div>
            )}
            <Grid xs={12} className="filters su-rs-mt-7 lg:su-grid-gap">
              {/* {results.nbHits > 0 && (
                <React.Fragment>
                  <GridCell
                    xs={12}
                    lg={3}
                    className={`lg:su-hidden su-relative su-mb-40
                    ${opened ? 'su-shadow-xl' : ''}`}
                  >
                    <div ref={ref}>
                      <button
                        type="button"
                        className={dcnb(
                          'su-group su-flex su-w-full su-justify-between su-border su-px-20 su-text-21 su-font-semibold su-items-center su-transition-colors',
                          {
                            'su-border-digital-red su-text-white su-bg-digital-red':
                              opened,
                            'su-border-black-30 su-text-digital-red-light hocus:su-bg-digital-red hocus:su-border-digital-red hocus:su-text-white hocus:su-shadow-lg':
                              !opened,
                          }
                        )}
                        aria-expanded={opened}
                        ref={filterOpenRef}
                        onClick={() => setOpened(!opened)}
                      >
                        <span className="su-py-14 su-flex">
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
                        <div className="su-absolute su-top-[100%] su-left-0 su-w-full su-z-10 su-bg-white su-shadow-2xl su-border su-border-black-10">
                          <div className="su-rs-p-0">{facets}</div>

                          <div className="su-flex su-justify-end su-rs-px-0 su-rs-py-1 su-bg-foggy-light su-border-t su-border-black-20">
                            <button
                              type="button"
                              onClick={() => clearFilters()}
                              className="su-text-digital-red-light su-text-18 md:su-text-20 hocus:su-text-cardinal-red hocus:su-shadow-none hocus:su-underline su-transition-colors"
                            >
                              Clear all
                            </button>
                            <SAAButton
                              buttonStyle="primary"
                              size="small-short"
                              className="su-ml-36"
                              onClick={() => {
                                setOpened(false);
                                scrollTo('#search-results');
                                document
                                  .getElementById('number-search-results')
                                  .focus();
                              }}
                            >
                              View results
                            </SAAButton>
                          </div>
                        </div>
                      )}
                    </div>
                  </GridCell>

                  <GridCell
                    xs={12}
                    lg={3}
                    className="su-mb-40 su-hidden lg:su-flex"
                  >
                    <Skiplink
                      anchorLink="#search-results-section"
                      className="su-hidden lg:su-block"
                    >
                      Skip past filters to search results
                    </Skiplink>
                    <Heading level={2} srOnly>
                      Filter Search Results
                    </Heading>
                    <div>{facets}</div>
                  </GridCell>
                </React.Fragment>
              )} */}
              <GridCell
                xs={12}
                lg={results.nbHits > 0 ? 9 : 8}
                xxl={8}
                className={
                  results.nbHits > 0 ? '' : 'lg:su-col-start-3 2xl:su-col-start-3'
                }
                id="search-results-section"
              >
                {/* <SearchKeywordBanner queryText={query} />
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
                )} */}
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
  )
}




const SearchPage = (props) => {
  const { blok } = props;

  // Algolia.
  // --------------------------------------------------
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const suggestionsIndex = 'federated-search-with-events';
  const hitsPerPage = blok.itemsPerPage;

  // Mobile Menu.
  // --------------------------------------------------
  const ref = useRef(null);
  const filterOpenRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const isExpanded = (x) => x.getAttribute('aria-expanded') === 'true';
  // Close menu if escape key is pressed and return focus to the menu button
  useEscape(() => {
    if (filterOpenRef.current && isExpanded(filterOpenRef.current)) {
      setOpened(false);
      filterOpenRef.current.focus();
    }
  });
  useOnClickOutside(ref, () => setOpened(false));

  // CSS Classes.
  // --------------------------------------------------
  const wrapperClasses = `su-grow su-w-auto su-border-0 su-border-b su-border-black-60`;
  const clearBtnClasses = `su-flex su-items-center su-bg-transparent hocus:su-bg-transparent su-text-black-70 hocus:su-text-black hocus:su-underline su-text-m0 su-font-semibold su-border-none  su-p-0 su-rs-mr-1 su-mt-03em`;
  const inputClasses = `su-border-0 su-text-m2 su-leading-display su-w-full su-flex-1 su-rs-px-1 su-py-10 su-outline-none focus:su-ring-0 focus:su-ring-transparent`;
  const submitBtnClasses = `su-flex su-items-center su-justify-center su-w-40 su-min-w-[4rem] su-h-40 md:children:su-w-20 md:children:su-h-20 su-rounded-full su-transition-colors su-bg-digital-red-light hocus:su-bg-cardinal-red-xdark su-ml-10`;
  const autocompleteLinkClasses = `su-cursor-pointer su-font-regular su-inline-block su-w-full su-text-white su-no-underline su-px-15 su-py-10 su-rounded-full hover:su-bg-digital-red hover:su-text-white`;
  const autocompleteLinkFocusClasses = `su-bg-digital-red`;
  const autocompleteContainerClasses = `su-absolute su-top-[100%] su-bg-cardinal-red-xxdark su-p-10 su-shadow-md su-w-full su-border su-border-digital-red-light su-rounded-b-[0.5rem] su-z-20`;


  // const facets = results.facets && (
  //   <React.Fragment>
  //     {siteNameValues && (
  //       <SearchFacet
  //         label="Sites"
  //         attribute="siteName"
  //         facetValues={siteNameValues}
  //         selectedOptions={selectedFacets.siteName}
  //         onChange={(values) => updateSiteFacet(values)}
  //         className={!!selectedFacets.siteName.length && 'su-mb-16'}
  //         exclude={['YouTube', 'SoundCloud', 'Apple Podcasts']}
  //       />
  //     )}
  //     {fileTypeValues && (
  //       <SearchFacet
  //         label="Media"
  //         attribute="fileType"
  //         facetValues={fileTypeValues}
  //         selectedOptions={selectedFacets.fileType}
  //         onChange={(values) => updateFileTypeFacet(values)}
  //         optionClasses="su-capitalize"
  //         className="su-mb-16"
  //         exclude={['html', 'pdf']}
  //       />
  //     )}
  //   </React.Fragment>
  // );

  return (
    <InstantSearch
      searchClient={algoliaClient}
      indexName={suggestionsIndex}
      stalledSearchDelay={2000}
      routing={{
        router: history({
          cleanUrlOnDispose: true,
        }),
        stateMapping: {
          stateToRoute(uiState) {
            return {
              query: uiState.query,
              page: uiState.page,
              filters: uiState.refinementList,
            };
          },
          routeToState(routeState) {
            return {
              query: routeState.query,
              page: routeState.page,
              refinementList: routeState.filters,
            };
          },
        },
      }}
    >
      <Configure hitsPerPage={hitsPerPage} />
      <SearchPageContent blok={blok} {...props} />
    </InstantSearch>
  );
};

export default SearchPage;
