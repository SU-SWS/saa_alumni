import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  InfiniteHits,
  Configure,
  useInstantSearch,
} from 'react-instantsearch';
import SynchronizedEvent from '../synchronized-event/synchronizedEvent';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const Hit = ({ hit }) => <SynchronizedEvent blok={hit} />;

const LoadingIndicator = () => {
  const { status } = useInstantSearch();
  /* Best practice is to display a loading indicator only when status is stalled,
   * not during a standard (fast) search.
   * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/loading-indicator/react/
   * Added status === 'loading' to show loading indicator when search is in progress.
   * We might want to show a loading indicator when search is in progress.
   */
  if (status === 'stalled' || status === 'loading') {
    return <p>Loading search results</p>;
  }
  return null;
};

const EventsDiscovery = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName="dev_alumni-events_start-asc"
    future={{ preserveSharedStateOnUnmount: true }}
    insights
  >
    <LoadingIndicator />
    <Configure hitsPerPage={2} />
    <div className="su-flex su-flex-row su-justify-center lg:su-space-x-40 su-mx-12">
      <div className="su-hidden lg:su-block su-h-600 su-w-300 su-border-2">
        Filters
      </div>
      <div className="su-flex su-flex-col su-space-y-20">
        <div className="su-flex su-flex-row su-justify-between">
          <div className="su-h-100 su-min-w-200 lg:su-min-w-400 su-max-w-800 su-border-2">
            Chips
          </div>
          <div className="lg:su-hidden su-h-100 su-max-w-100 su-border-2">
            <span className="">Mobile Filters</span>
          </div>
        </div>
        <InfiniteHits
          hitComponent={Hit}
          showPrevious={false}
          translations={{
            showMoreButtonText: 'Show more',
          }}
          classNames={{
            root: '',
            list: 'su-list-none su-pl-0 su-grid su-grid-cols-1 su-w-full',
            item: 'su-mb-0 su-w-full',
            loadMore:
              'su-w-full su-text-center su-mt-8 su-border-2 su-border-cardinal-red su-text-cardinal-red-light su-rounded-md su-p-4 su-cursor-pointer su-transition su-duration-200 su-ease-in-out hover:su-bg-cardinal-red hover:su-text-white',
            disabledLoadMore: 'su-hidden',
          }}
        />
      </div>
    </div>
  </InstantSearch>
);

export default EventsDiscovery;
