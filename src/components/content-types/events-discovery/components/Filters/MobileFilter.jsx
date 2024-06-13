import React, { useState } from 'react';
import { ClearRefinements } from 'react-instantsearch';
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';
import { Drawer } from '../Drawer/Drawer';
import { FacetComponent } from '../Facets/FacetComponent';
import { facetLabels } from '../constants';

export const MobileFilter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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

  return (
    <div className="lg:su-hidden">
      <button
        type="button"
        className="su-flex su-items-center su-px-16 su-py-10 su-rounded-md su-border-2 su-border-cardinal-red su-text-cardinal-red hover:su-bg-cardinal-red-light hover:su-text-white focus-visible:su-bg-cardinal-red-light focus-visible:su-text-white"
        onClick={handleToggleDrawer}
        aria-expanded={isDrawerOpen}
        aria-controls="filter-drawer"
      >
        <AdjustmentsIcon className="su-w-24 su-h-24 su-mr-2" />
        <span className="su-inline-block">Filter</span>
      </button>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleToggleDrawer}
        header="Filter"
      >
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
            {facets.every((facet) => facet.expanded) ? (
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
      </Drawer>
    </div>
  );
};
