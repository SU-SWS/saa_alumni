import React, { useState } from 'react';
import { ClearRefinements } from 'react-instantsearch';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { Drawer } from '../Drawer/Drawer';
import { MobileFacetComponent } from '../Facets/MobileFacetComponent';
import { useFacets } from '../Facets/useFacets';

export const MobileFilter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { facets } = useFacets();

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const ClearButton = (
    <ClearRefinements
      translations={{
        resetButtonText: 'Clear all',
      }}
      classNames={{
        button:
          'su-group hover:su-underline focus-visible:su-underline su-transition su-px-13 su-py-9 md:su-px-15 md:su-py-10 su-text-16 su-font-regular su-no-underline su-leading-display su-bg-white hocus:su-bg-white su-text-cardinal-red hocus:su-text-cardinal-red-dark su-border hocus:su-border su-rounded su-border-cardinal-red-light hocus:su-border-cardinal-red-light active:su-border-cardinal-red-light su-shadow hover:su-shadow-md focus:su-ring-2 active:su-ring-2 focus:su-ring-cardinal-red-light active:su-ring-cardinal-red-light hocus:su-decoration-1 su-outline-none disabled:su-hidden',
      }}
    />
  );

  return (
    <div className="lg:su-hidden su-ml-auto">
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
        clearButton={ClearButton}
      >
        <div>
          {facets.map((facet) => (
            <MobileFacetComponent
              key={facet.attribute}
              attribute={facet.attribute}
              label={facet.label}
              previousDrawer={isDrawerOpen}
              setPreviousDrawer={setIsDrawerOpen}
            />
          ))}
        </div>
      </Drawer>
    </div>
  );
};
