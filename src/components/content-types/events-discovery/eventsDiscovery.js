import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, InfiniteHits, Configure } from 'react-instantsearch';
import { Hit } from './components/Hit/Hit';
import { LoadingComponent } from './components/Loading/LoadingComponent';
import { LoadingIndicator } from './components/Loading/LoadingIndicator';
import { NoResultsComponent } from './components/NoResults/NoResultsComponent';
import { NoResultsBoundary } from './components/NoResults/NoResultsBoundary';
import { ChipsComponent } from './components/Chips/ChipsComponent';
import { DesktopFilter } from './components/Filters/DesktopFilter';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const EventsDiscovery = () => {
  // TODO: Review the loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="dev_alumni-events_start-asc"
      future={{ preserveSharedStateOnUnmount: true }}
      routing
      insights
    >
      <LoadingIndicator />
      <Configure hitsPerPage={2} />
      <div className="su-flex su-flex-row su-justify-center lg:su-space-x-40 su-mx-12">
        <DesktopFilter />
        <div className="su-flex su-flex-col su-space-y-20">
          <div className="su-flex su-flex-row su-justify-between">
            <ChipsComponent />
            <div className="lg:su-hidden su-p-4 su-border-2">
              <span className="">Mobile Filters</span>
            </div>
          </div>
          <NoResultsBoundary fallback={<NoResultsComponent />}>
            <InfiniteHits
              hitComponent={Hit}
              translations={{
                showMoreButtonText: 'Show more events',
                showPreviousButtonText: 'Show previous events',
              }}
              classNames={{
                root: '',
                list: 'su-list-none su-pl-0 su-grid su-grid-cols-1 su-w-full',
                item: 'su-mb-0 su-w-full',
                loadPrevious:
                  'su-w-full su-text-center su-mt-8 su-border-2 su-border-cardinal-red su-text-cardinal-red-light su-rounded-md su-p-4 su-cursor-pointer su-transition su-duration-200 su-ease-in-out hover:su-bg-cardinal-red hover:su-text-white',
                disabledLoadPrevious: 'su-hidden',
                loadMore:
                  'su-w-full su-text-center su-mt-8 su-border-2 su-border-cardinal-red su-text-cardinal-red-light su-rounded-md su-p-4 su-cursor-pointer su-transition su-duration-200 su-ease-in-out hover:su-bg-cardinal-red hover:su-text-white',
                disabledLoadMore: 'su-hidden',
              }}
            />
          </NoResultsBoundary>
        </div>
      </div>
    </InstantSearch>
  );
};

export default EventsDiscovery;
