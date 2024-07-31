import React, { useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import {
  InstantSearch,
  Hits,
  Configure,
  useInstantSearch,
  useCurrentRefinements,
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

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const searchClient = {
  ...algoliaClient,
  search(requests) {
    const processedRequests = requests.map((request) => {
      const numericFilters = request?.params?.numericFilters?.filter(
        (f) => !f.includes('startTimestamp')
      );

      return {
        ...request,
        params: {
          ...request?.params,
          ...(!!numericFilters?.length && numericFilters),
        },
      };
    });

    return algoliaClient.search(processedRequests);
  },
};

const indexName = process.env.GATSBY_EVENT_ALGOLIA_INDEX;

const EventDiscoveryContent = () => {
  const { items } = useCurrentRefinements({
    includedAttributes: ['startTimestamp'],
  });
  const dateRefinements = items?.[0]?.refinements;

  const filters = useMemo(() => {
    const baseFilter = `endTimestamp > ${DateTime.now()
      .startOf('day')
      .toUnixInteger()}`;

    if (!dateRefinements?.length) {
      return baseFilter;
    }

    if (dateRefinements.length === 1) {
      const refinement = dateRefinements[0];
      return `(startTimestamp ${refinement.operator} ${refinement.value} OR endTimestamp ${refinement.operator} ${refinement.value}) AND (${baseFilter})`;
    }

    const startRefinement = dateRefinements.find((r) => r.operator === '>=');
    const endRefinement = dateRefinements.find((r) => r.operator === '<=');

    return `((startTimestamp:${startRefinement.value} TO ${endRefinement.value}) OR (endTimestamp:${startRefinement.value} TO ${endRefinement.value})) AND (${baseFilter})`;
  }, [dateRefinements]);

  const { status } = useInstantSearch();
  /* Best practice is to display a loading indicator only when status is stalled,
   * not during a standard (fast) search.
   * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/loading-indicator/react/
   */

  const isStalled = useMemo(() => status === 'stalled', [status]);

  return (
    <FacetProvider>
      <Configure filters={filters} />
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
            date: indexUiState.numericMenu?.startTimestamp,
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
                startTimestamp: routeState.date,
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
    <EventDiscoveryContent />
  </InstantSearch>
);

export default EventsDiscovery;
