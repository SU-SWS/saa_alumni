import React, { useCallback, useState } from 'react';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { SwipeableDrawer } from '@mui/material';
import { MobileFilterHeader } from './MobileFilterHeader';
import { MobileFilterFooter } from './MobileFilterFooter';
import { MobileFacetFilter } from '../Facets/MobileFacetFilter';
import { MobileDateFilter } from '../DateFilter';
import { MobileLocationFilter } from '../LocationFilter';

export const MobileFilter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsDrawerOpen(true);
  }, [setIsDrawerOpen]);

  const closeMenu = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  return (
    <div className="lg:su-hidden su-ml-auto">
      <button
        type="button"
        className="su-flex su-items-center su-px-16 su-py-10 su-rounded-md su-border-2 su-border-cardinal-red su-text-cardinal-red hover:su-bg-cardinal-red-light hover:su-text-white focus-visible:su-bg-cardinal-red-light focus-visible:su-text-white"
        onClick={openMenu}
        aria-expanded={isDrawerOpen}
        aria-controls="event-filter-drawer"
      >
        <AdjustmentsIcon className="su-w-24 su-h-24 su-mr-2" />
        <span className="su-inline-block">Filter</span>
      </button>
      <SwipeableDrawer
        id="event-filter-drawer"
        role="dialog"
        anchor="right"
        open={isDrawerOpen}
        onOpen={openMenu}
        onClose={closeMenu}
        classes={{
          paper:
            '!su-w-full sm:!su-w-400 md:!su-w-500 !su-overflow-y-hidden su-overflow-x-hidden',
        }}
      >
        <div className="su-flex su-flex-col su-min-h-screen su-relative">
          <MobileFilterHeader heading="Filter by" onClose={closeMenu} />
          <div className="su-grow su-overflow-y-auto">
            <MobileDateFilter onCloseMenu={closeMenu} />
            <MobileFacetFilter attribute="experience" onCloseMenu={closeMenu} />
            <MobileLocationFilter onCloseMenu={closeMenu} />
            <MobileFacetFilter attribute="format" onCloseMenu={closeMenu} />
            <MobileFacetFilter attribute="subject" onCloseMenu={closeMenu} />
          </div>
          <MobileFilterFooter onCloseMenu={closeMenu} />
        </div>
      </SwipeableDrawer>
    </div>
  );
};
