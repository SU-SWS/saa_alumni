import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Configure, usePagination } from 'react-instantsearch';
import { Hit } from './components/Hit/Hit';
import { LoadingComponent } from './components/Loading/LoadingComponent';
import { LoadingIndicator } from './components/Loading/LoadingIndicator';
import { NoResultsComponent } from './components/NoResults/NoResultsComponent';
import { NoResultsBoundary } from './components/NoResults/NoResultsBoundary';
import { ChipsComponent } from './components/Chips/ChipsComponent';
import { DesktopFilter } from './components/Filters/DesktopFilter';
import { MobileFilter } from './components/Filters/MobileFilter';
import { Pagination } from './components/Pagination/Pagination'
import { StatusHeader } from './components/StatusHeader/StatusHeader';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const hitsPerPage = 2;

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
      <Configure hitsPerPage={hitsPerPage} />
      <div className="su-cc lg:su-flex lg:su-gap-x-40 su-mx-12">
        <div className="su-hidden lg:su-block su-flex-none su-w-300">
          <DesktopFilter />
        </div>
        <div className="su-flex su-flex-col su-gap-y-20 su-w-full">
          <StatusHeader hitsPerPage={hitsPerPage} />
          <div className="su-flex su-flex-none su-flex-row su-justify-between">
            <ChipsComponent />
            <MobileFilter />
          </div>
          <NoResultsBoundary fallback={<NoResultsComponent />}>
            <Hits
              hitComponent={Hit}
              classNames={{
                root: '',
                list: 'su-list-none su-pl-0 su-grid su-grid-cols-1 su-w-full',
                item: 'su-mb-0 su-w-full',
              }}
            />
            <Pagination />
          </NoResultsBoundary>
        </div>
      </div>
    </InstantSearch>
  );
};

export default EventsDiscovery;
