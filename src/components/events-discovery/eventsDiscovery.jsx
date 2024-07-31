import React, { useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
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
import { Chips } from './components/Chips';
import { DesktopFilter, MobileFilter } from './components/Filters';
import { Pagination } from './components/Pagination';
import { StatusHeader } from './components/StatusHeader';
import { Hit } from './components/Hit/Hit';
import { FacetProvider } from './components/Facets/FacetCtx';
import { MobileSearchBar, SearchBar } from './components/SearchBar';
import { EventsPerPage } from './components/EventsPerPage';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

// TODO: Swap out for env var.
const indexName = 'dev_alumni-events_start-asc';

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
        <div className="su-flex su-items-center su-max-w-600 su-mx-auto su-gap-x-16">
          <div className="su-hidden lg:su-block su-w-full">
            <SearchBar searchClient={searchClient} indexName={indexName} />
          </div>
          <div className="su-block lg:su-hidden su-w-full">
            <MobileSearchBar
              searchClient={searchClient}
              indexName={indexName}
            />
          </div>
          <MobileFilter />
        </div>
        <div className="lg:su-flex lg:su-gap-x-40 su-mt-40 lg:su-mt-80">
          <div className="su-hidden lg:su-block su-flex-none su-w-350">
            <DesktopFilter />
          </div>
          <div className="su-flex su-flex-col su-gap-y-20 su-w-full">
            <div className="su-flex su-gap-y-20 su-flex-col">
              <Chips />
              <div className="su-flex su-items-center su-justify-between sm:su-px-20">
                <StatusHeader />
                <EventsPerPage />
              </div>
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
    indexName={indexName}
    future={{ preserveSharedStateOnUnmount: true }}
    stalledSearchDelay={2000}
    routing={{
      router: history({
        cleanUrlOnDispose: true,
      }),
      stateMapping: {
        stateToRoute(uiState) {
          const indexUiState = uiState[indexName];

          return {
            q: indexUiState.query,
            page: indexUiState.page,
            format: indexUiState.refinementList?.format,
            experience: indexUiState.refinementList?.experience,
            subject: indexUiState.refinementList?.subject,
            us: indexUiState.refinementList?.usRegion,
            int: indexUiState.refinementList?.intRegion,
            startTimestamp: indexUiState.numericMenu?.startTimestamp,
            country: indexUiState.refinementList?.country,
            state: indexUiState.refinementList?.state,
            eventsPerPage: indexUiState.hitsPerPage,
            near: indexUiState.radialGeoSearch?.name
              ? indexUiState.radialGeoSearch
              : undefined,
          };
        },
        routeToState(routeState) {
          return {
            [indexName]: {
              page: routeState.page,
              refinementList: {
                format: routeState.format,
                subject: routeState.subject,
                experience: routeState.experience,
                country: routeState.country,
                state: routeState.state,
                usRegion: routeState.us,
                intRegion: routeState.int,
              },
              numericMenu: {
                startTimestamp: routeState.startTimestamp,
              },
              radialGeoSearch: routeState.near,
              query: routeState.q,
              hitsPerPage: routeState.eventsPerPage,
            },
          };
        },
      },
    }}
    insights
  >
    <Configure
      // Don't let any expired events slip through
      filters={`endTimestamp > ${DateTime.now()
        .startOf('day')
        .toUnixInteger()}`}
    />
    <EventDiscoveryContent />
  </InstantSearch>
);

export default EventsDiscovery;
