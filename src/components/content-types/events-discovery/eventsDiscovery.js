import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  InfiniteHits,
  Pagination,
  Configure,
} from 'react-instantsearch';
import SynchronizedEvent from '../synchronized-event/synchronizedEvent';

function Hit({ hit }) {
  return <SynchronizedEvent blok={hit} />;
}

const EventsDiscovery = () => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="dev_alumni-events"
      future={{ preserveSharedStateOnUnmount: true }}
      insights
    >
      <Configure hitsPerPage={2} />
      <div className="su-flex su-flex-row su-justify-center su-space-x-40 su-mx-12">
        <div className="su-h-600 su-w-300 su-border-2">Filters</div>
        <div className="su-flex su-flex-col su-space-y-20">
          <div className="su-h-100 su-w-800 su-border-2">Chips</div>
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
