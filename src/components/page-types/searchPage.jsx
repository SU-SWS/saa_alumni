import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { InstantSearch } from 'react-instantsearch';
import SearchPageContent from '../search/SearchPageContent';

/**
 * Main Search Page Component.
 *
 * @param {*} props
 * @returns
 */
const SearchPage = (props) => {
  // Algolia.
  // --------------------------------------------------
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const indexName = 'federated-search-with-events';

  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState) {
        const uiIndexState = uiState[indexName];
        return {
          q: uiIndexState.query,
          page: uiIndexState.page,
          sites: uiIndexState.refinementList?.siteName,
          media: uiIndexState.refinementList?.fileType,
        };
      },
      routeToState(routeState) {
        return {
          [indexName]: {
            query: routeState.q,
            page: routeState.page,
            refinementList: {
              siteName: routeState.sites,
              fileType: routeState.media,
            },
          },
        };
      },
    },
  };

  return (
    <InstantSearch
      searchClient={algoliaClient}
      indexName={indexName}
      stalledSearchDelay={2000}
      routing={routing}
    >
      <SearchPageContent {...props} />
    </InstantSearch>
  );
};

export default SearchPage;
