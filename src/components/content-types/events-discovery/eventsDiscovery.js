import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  InfiniteHits,
  Configure,
  useInstantSearch,
  RefinementList,
  ClearRefinements,
  useRefinementList,
} from 'react-instantsearch';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/solid';
import SynchronizedEvent from '../synchronized-event/synchronizedEvent';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const facetLabels = {
  format: {
    label: 'Format',
  },
  experience: {
    label: 'Experience',
  },
  subject: {
    label: 'Subject',
  },
};

const Hit = ({ hit }) => <SynchronizedEvent blok={hit} />;

const LoadingComponent = () => (
  <div className="su-w-full su-flex su-items-center su-justify-center su-rs-my-1">
    <div className="su-flex su-justify-center su-items-center su-h-300 su-w-400">
      <div className="su-animate-spin su-rounded-full su-h-32 su-w-32 su-border-t-4 su-border-b-4 su-border-cardinal-red-light su-mr-8" />
      Please wait! Loading events...
    </div>
  </div>
);

const LoadingIndicator = () => {
  const { status } = useInstantSearch();
  /* Best practice is to display a loading indicator only when status is stalled,
   * not during a standard (fast) search.
   * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/loading-indicator/react/
   */
  if (status === 'stalled') {
    return <LoadingComponent />;
  }
  return null;
};

const NoResultsBoundary = ({ children, fallback }) => {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  // eslint-disable-next-line no-underscore-dangle
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
};

const NoResultsComponent = () => (
  <div className="su-w-full su-flex su-items-center su-justify-center">
    <div className="su-flex su-justify-center su-items-center su-rs-my-2">
      <div className="su-text-center">
        <h2 className="su-text-center su-text-cardinal-red-light">
          No events found!
        </h2>
        <p className="su-text-center">
          Try changing your search criteria or filter options to find events.
        </p>
        <div>
          <ClearRefinements
            translations={{
              resetButtonText: 'Reset filters',
            }}
            classNames={{
              button:
                'disabled:su-hidden su-text-3xl su-border-2 su-border-cardinal-red su-px-10 su-py-6 su-rounded-xl su-text-cardinal-red-light hover:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-white hocus:su-bg-cardinal-red-light',
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

const FacetComponent = ({ attribute, label, expanded, toggleFacet }) => {
  const refineList = useRefinementList({ attribute });

  if (refineList?.items?.length === 0) {
    if (!expanded) toggleFacet();
    return null;
  }

  const refinedItems = refineList.items.filter((item) => item.isRefined);
  const refinedItemsCount = refinedItems.length;

  return (
    <div className="su-flex su-flex-col su-my-20 first:su-mt-5 su-mx-6 su-pt-8 su-border-t-2 su-border-black">
      <div className="su-relative">
        <button
          type="button"
          className="su-group su-flex su-flex-row su-justify-between su-items-center su-w-full su-text-2xl su-font-semibold su-text-cardinal-red-light su-mb-4"
          onClick={toggleFacet}
        >
          <h3 className="su-text-black group-hover:su-text-cardinal-red group-hover:su-underline group-focus-visible:su-text-cardinal-red group-focus-visible:su-underline su-text-4xl su-font-semibold su-mb-4">
            {label}
          </h3>

          {expanded ? (
            <ChevronDownIcon className="su-w-40 su-h-40" />
          ) : (
            <ChevronRightIcon className="su-w-40 su-h-40" />
          )}
        </button>
        <ClearRefinements
          includedAttributes={[attribute]}
          translations={{
            resetButtonText:
              refinedItemsCount > 1
                ? `Reset ${refinedItemsCount} filters`
                : 'Reset filters',
          }}
          classNames={{
            button:
              'su-absolute su-right-40 su-top-9 disabled:su-hidden su-text-2xl su-text-cardinal-red-light hocus:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black',
          }}
        />
      </div>
      <RefinementList
        attribute={attribute}
        classNames={{
          root: expanded ? 'su-block' : 'su-hidden',
          list: 'su-list-none su-pl-0',
          item: 'su-mb-0',
          checkbox:
            'su-mx-4 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out hocus:su-bg-cardinal-red focus:su-ring-0',
          label: 'hover:su-cursor-pointer',
          count: "su-ml-4 before:su-content-['('] after:su-content-[')']",
        }}
      />
    </div>
  );
};

const Chip = ({ attribute, label, remove }) => (
  <button
    type="button"
    onClick={remove}
    className="su-flex su-items-center su-px-12 su-py-6 su-mt-4 su-text-xl sm:su-text-2xl su-border-2 su-border-cardinal-red su-text-cardinal-red hocus:su-text-white hocus:su-bg-cardinal-red-light su-rounded-full su-cursor-pointer"
  >
    <span className="su-inline-block su-text-3xl">
      <span className="su-font-semibold">{facetLabels[attribute].label}:</span>{' '}
      {label}
    </span>
    <XIcon className="su-w-20 su-h-20" />
  </button>
);

const ChipsComponent = () => {
  const { indexUiState, setIndexUiState } = useInstantSearch();

  if (
    !indexUiState?.refinementList ||
    (indexUiState?.refinementList &&
      !Object.entries(indexUiState?.refinementList).length)
  ) {
    return <div />;
  }

  return (
    <div className="su-flex su-flex-row su-flex-wrap su-space-x-4 su-max-w-500 lg:su-max-w-900">
      {Object.entries(indexUiState?.refinementList).map(([attribute, values]) =>
        values.map((value) => (
          <Chip
            key={value}
            attribute={attribute}
            label={value}
            remove={() => {
              setIndexUiState((prev) => ({
                ...prev,
                refinementList: {
                  ...prev.refinementList,
                  [attribute]: prev.refinementList[attribute].filter(
                    (v) => v !== value
                  ),
                },
              }));
            }}
          />
        ))
      )}
    </div>
  );
};

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

  const [facets, setFacets] = useState([
    {
      attribute: 'format',
      label: facetLabels.format.label,
      expanded: true,
    },
    {
      attribute: 'experience',
      label: facetLabels.experience.label,
      expanded: false,
    },
    {
      attribute: 'subject',
      label: facetLabels.subject.label,
      expanded: false,
    },
  ]);

  const facetsExpanded = facets.every((facet) => facet.expanded);

  const toggleFacets = () => {
    const updatedFacets = facets.map((facet) => ({
      ...facet,
      expanded: !facetsExpanded,
    }));
    setFacets(updatedFacets);
  };

  const toggleFacet = (index) => {
    const updatedFacets = facets.map((facet, i) => ({
      ...facet,
      expanded: i === index ? !facet.expanded : facet.expanded,
    }));
    setFacets(updatedFacets);
  };

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
        <div className="su-hidden lg:su-block su-w-300">
          <div className="su-my-20 su-mx-6">
            <h2 className="su-text-5xl su-font-bold su-mb-0">Filter by</h2>
            <ClearRefinements
              translations={{
                resetButtonText: 'Reset filters',
              }}
              classNames={{
                button:
                  'disabled:su-hidden su-text-3xl su-text-cardinal-red-light hover:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black',
              }}
            />
          </div>
          <div className="su-flex su-justify-end su-mx-6">
            <button
              type="button"
              className="su-text-3xl hocus:su-underline hocus:su-text-cardinal-red"
              onClick={toggleFacets}
            >
              {facetsExpanded ? (
                <div className="su-flex su-items-center">
                  <span className="su-inline-block">Collapse all</span>
                  <ChevronDownIcon className="su-w-30 su-h-30" />
                </div>
              ) : (
                <div className="su-flex su-items-center">
                  <span className="su-inline-block">Expand all</span>
                  <ChevronRightIcon className="su-w-30 su-h-30" />
                </div>
              )}
            </button>
          </div>
          <div>
            {facets.map((facet, index) => (
              <FacetComponent
                key={facet.attribute}
                attribute={facet.attribute}
                label={facet.label}
                expanded={facet.expanded}
                toggleFacet={() => toggleFacet(index)}
              />
            ))}
          </div>
        </div>
        <div className="su-flex su-flex-col su-space-y-20">
          <div className="su-flex su-flex-row su-justify-between">
            <ChipsComponent />
            <div className="lg:su-hidden su-h-100 su-max-w-100 su-border-2">
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
