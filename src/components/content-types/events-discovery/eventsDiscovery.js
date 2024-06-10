import React, { useEffect, useState } from 'react';
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

const LoadingComponent = () => (
  <div className="su-w-full su-flex su-items-center su-justify-center su-rs-my-1">
    <div className="su-flex su-justify-center su-items-center su-h-300 su-w-400">
      <div className="su-animate-spin su-rounded-full su-h-32 su-w-32 su-border-t-4 su-border-b-4 su-border-cardinal-red-light su-mr-8" />
      Loading search results...
    </div>
  </div>
);

const LoadingIndicator = () => {
  const { status } = useInstantSearch();
  /* Best practice is to display a loading indicator only when status is stalled,
   * not during a standard (fast) search.
   * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/loading-indicator/react/
   * Added status === 'loading' to show loading indicator when search is in progress.
   * We might want to show a loading indicator when search is in progress.
   */
  if (status === 'stalled' || status === 'loading') {
    return <LoadingComponent />;
  }
  return null;
};

const EventsDiscovery = () => {
  // TODO: We might want to remove this loading state and show the loading indicator only when search is in progress.
  // Show loading indicator for 3 seconds before initial page load
  // I added this because before the Algolia search results are loaded, the page is blank for a few seconds.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
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
};

export default EventsDiscovery;
