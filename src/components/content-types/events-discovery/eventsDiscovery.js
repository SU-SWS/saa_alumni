import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { dcnb } from 'cnbuilder';
import { InstantSearch, InfiniteHits, Configure } from 'react-instantsearch';
import SynchronizedEvent from '../synchronized-event/synchronizedEvent';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const Hit = ({ hit }) => <SynchronizedEvent blok={hit} />;

const EventsDiscovery = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="dev_alumni-events_start-asc"
      future={{ preserveSharedStateOnUnmount: true }}
      insights
    >
      <Configure hitsPerPage={2} />
      <div className="su-flex su-flex-row su-justify-center lg:su-space-x-40 su-mx-12">
        <div className={dcnb(filterOpen ? 'su-block' : 'su-hidden')}>
          <div className="su-hidden lg:su-block su-h-600 su-w-300 su-border-2">
            Filters
          </div>
        </div>
        <div className="su-flex su-flex-col su-space-y-20">
          <div className="su-flex su-flex-row su-justify-between">
            <div className="su-h-100 su-min-w-200 lg:su-min-w-400 su-max-w-800 su-border-2">
              Chips
            </div>
            <div className="su-h-100 su-max-w-100 su-border-2">
              <span className="lg:su-hidden">Mobile Filters</span>
              <button
                type="button"
                className="su-hidden lg:su-inline-block hover:su-cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                Filter {filterOpen ? 'Close' : 'Open'}
              </button>
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
