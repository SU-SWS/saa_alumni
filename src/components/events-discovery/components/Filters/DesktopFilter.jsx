import React from 'react';
import { ClearRefinements } from 'react-instantsearch';
import { FacetComponent } from '../Facets/FacetComponent';
import { DateFilter } from '../DateFilter';
import { LocationFilter } from '../LocationFilter/LocationFilter';
import { useFacets } from '../Facets/useFacets';
import { SubjectFilter } from '../SubjectFilter';

export const DesktopFilter = () => {
  const { getFacet, getFacets, toggleFacet, collapseFacets, expandFacets } =
    useFacets();

  const dateFacet = getFacet('startTimestamp');
  const additionalFacets = getFacets(['format']);
  const locationFacet = getFacet('location');
  const subjectFacet = getFacet('subject');

  return (
    <>
      <div className="su-mb-14">
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
      <div className="su-flex su-justify-end su-gap-8">
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
        {dateFacet && (
          <DateFilter
            expanded={dateFacet.expanded}
            onToggleExpanded={() => toggleFacet('startTimestamp')}
          />
        )}
        {locationFacet && (
          <LocationFilter
            expanded={locationFacet.expanded}
            onToggleExpanded={() => toggleFacet('location')}
          />
        )}
        {additionalFacets.map(({ attribute, label, expanded }) => (
          <FacetComponent
            key={attribute}
            attribute={attribute}
            label={label}
            expanded={expanded}
            onToggleExpanded={() => toggleFacet(attribute)}
          />
        ))}
        {subjectFacet && (
          <SubjectFilter
            expanded={subjectFacet.expanded}
            onToggleExpanded={() => toggleFacet('subject')}
          />
        )}
      </div>
    </>
  );
};
