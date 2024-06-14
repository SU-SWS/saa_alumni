import React from 'react';
import { ClearRefinements } from 'react-instantsearch';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FacetComponent } from '../Facets/FacetComponent';
import { useFacets } from '../Facets/useFacets';

export const DesktopFilter = () => {
  const { facets, facetsExpanded, toggleFacets, toggleFacet } = useFacets();

  return (
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
  );
};
