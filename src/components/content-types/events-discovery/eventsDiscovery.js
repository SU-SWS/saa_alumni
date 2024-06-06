import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
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
      <Configure hitsPerPage={5} />
      <Hits
        hitComponent={Hit}
        classNames={{
          root: '',
          list: 'su-list-none su-grid su-grid-cols-1 su-w-full',
          item: 'su-mb-0 su-w-full',
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
