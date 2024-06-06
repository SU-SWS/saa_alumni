import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Pagination,
  Configure,
} from 'react-instantsearch';
import SynchronizedEvent from '../content-types/synchronized-event/synchronizedEvent';

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
      insights
    >
      <Configure hitsPerPage={2} />
      <Hits
        hitComponent={Hit}
        classNames={{
          root: 'su-p-30',
          list: 'su-list-none su-grid su-grid-cols-1 sm:su-grid-cols-2 lg:su-grid-cols-3 su-gap-30 su-mt-30',
        }}
      />
      <Pagination
        classNames={{
          list: 'su-list-none su-flex su-gap-10 su-mt-30 su-justify-center',
        }}
      />
    </InstantSearch>
  );
};

export default EventsDiscovery;
