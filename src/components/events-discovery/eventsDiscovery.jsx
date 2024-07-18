import React, { useEffect, useMemo } from 'react';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import {
  InstantSearch,
  Hits,
  Configure,
  useInstantSearch,
} from 'react-instantsearch';
import { DateTime } from 'luxon';
import { LoadingIndicator } from './components/Loading';
import { NoResultsComponent, NoResultsBoundary } from './components/NoResults';
import { ChipsComponent } from './components/Chips';
import { DesktopFilter, MobileFilter } from './components/Filters';
import { Pagination } from './components/Pagination';
import { StatusHeader } from './components/StatusHeader';
import { Hit } from './components/Hit/Hit';
import { FacetProvider } from './components/Facets/FacetCtx';
import { SearchBar } from './components/SearchBar';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const hitsPerPage = 6;

const EventDiscoveryContent = () => {
  const { status } = useInstantSearch();
  /* Best practice is to display a loading indicator only when status is stalled,
   * not during a standard (fast) search.
   * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/loading-indicator/react/
   */

  const isStalled = useMemo(() => status === 'stalled', [status]);

  return (
    <FacetProvider>
      <div className="su-cc su-mx-12">
        <div className="su-max-w-600 su-mx-auto">
          <SearchBar
            searchClient={searchClient}
            indexName="dev_alumni-events_start-asc"
          />
        </div>
        <div className="lg:su-flex lg:su-gap-x-40 su-mt-40">
          <div className="su-hidden lg:su-block su-flex-none su-w-300">
            <DesktopFilter />
          </div>
          <div className="su-flex su-flex-col su-gap-y-20 su-w-full">
            <StatusHeader hitsPerPage={hitsPerPage} />
            <div className="su-flex su-flex-none su-flex-row">
              <ChipsComponent />
              <MobileFilter />
            </div>
            {isStalled && <LoadingIndicator />}
            <NoResultsBoundary fallback={<NoResultsComponent />}>
              <Hits
                hitComponent={Hit}
                classNames={{
                  root: `${isStalled ? 'su-opacity-50' : ''}`,
                  list: 'su-list-none su-pl-0 su-grid su-grid-cols-1 su-w-full',
                  item: 'su-mb-0 su-w-full su-border-b su-pb-30 su-mb-30 sm:su-px-20',
                }}
              />
              <Pagination />
            </NoResultsBoundary>
          </div>
        </div>
      </div>
    </FacetProvider>
  );
};

const EventsDiscovery = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName="dev_alumni-events_start-asc"
    future={{ preserveSharedStateOnUnmount: true }}
    stalledSearchDelay={2000}
    routing={{
      router: history(),
      stateMapping: {
        stateToRoute(uiState) {
          const indexUiState = uiState['dev_alumni-events_start-asc'];

          return {
            q: indexUiState.query,
            page: indexUiState.page,
            format: indexUiState.refinementList?.format,
            experience: indexUiState.refinementList?.experience,
            subject: indexUiState.refinementList?.subject,
            startTimestamp: indexUiState.numericMenu?.startTimestamp,
          };
        },
        routeToState(routeState) {
          return {
            'dev_alumni-events_start-asc': {
              query: routeState.q,
              page: routeState.page,
              refinementList: {
                format: routeState.format,
                experience: routeState.experience,
                subject: routeState.subject,
              },
              numericMenu: {
                startTimestamp: routeState.startTimestamp,
              },
            },
          };
        },
      },
    }}
    insights
  >
    <Configure
      hitsPerPage={hitsPerPage}
      // Don't let any expired events slip through
      filters={`endTimestamp > ${DateTime.now()
        .startOf('day')
        .toUnixInteger()}`}
    />
    <EventDiscoveryContent />
  </InstantSearch>
);

export default EventsDiscovery;
