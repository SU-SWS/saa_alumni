import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { InstantSearch, Configure } from 'react-instantsearch';
import SearchPageContent from '../search/SearchPageContent';

/**
 * Main Search Page Component.
 *
 * @param {*} props
 * @returns
 */
const SearchPage = (props) => {
  // No destructuring here because I want to keep the props object and pass it down.
  // eslint-disable-next-line react/destructuring-assignment
  const itemsPerPageInt = parseInt(props.blok.itemsPerPage, 10);

  // Algolia.
  // --------------------------------------------------
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );
  const indexName = 'federated-search-with-events'; // TODO: Change this back before merging.

  const routing = {
    router: history({
      cleanUrlOnDispose: false,
    }),
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
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <Configure
        hitsPerPage={itemsPerPageInt}
        attributesToHighlight={['body:400']}
        highlightPreTag="<b>"
        highlightPostTag="</b>"
      />
      <SearchPageContent {...props} />
    </InstantSearch>
  );
};

export default SearchPage;
