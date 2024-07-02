import React from 'react';
import { ClearRefinements } from 'react-instantsearch';
import { FacetComponent } from '../Facets/FacetComponent';
import { useFacets } from '../Facets/useFacets';
import { DateFilter } from '../DateFilter';

export const DesktopFilter = () => {
  const { facets, toggleFacet, collapseFacets, expandFacets } = useFacets();

  return (
    <>
      <div className="su-mb-14 su-mx-6">
        <h2 className="su-text-5xl su-font-bold su-mb-0">Filter by</h2>
        <div className="su-min-h-28">
          <ClearRefinements
            translations={{
              resetButtonText: 'Reset all filters',
            }}
            classNames={{
              button:
                'disabled:su-hidden su-text-3xl su-text-cardinal-red-light hover:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black',
            }}
          />
        </div>
      </div>
      <div className="su-flex su-justify-end su-mx-6 su-gap-8">
        <button
          type="button"
          className="su-text-3xl hocus:su-underline hocus:su-text-cardinal-red"
          onClick={() => collapseFacets()}
        >
          Collapse all
        </button>
        <span className="su-border-r su-border-black-60 su-h-20" />
        <button
          type="button"
          className="su-text-3xl hocus:su-underline hocus:su-text-cardinal-red"
          onClick={() => expandFacets()}
        >
          Expand all
        </button>
      </div>
      <div className="su-flex su-flex-col su-gap-28 su-mt-8">
        <DateFilter />
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
    </>
  );
};
