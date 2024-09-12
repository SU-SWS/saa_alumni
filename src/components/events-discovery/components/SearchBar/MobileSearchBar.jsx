import React, { useCallback, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { SwipeableDrawer } from '@mui/material';
import { SearchBar } from './SearchBar';
import { MobileFilterHeader } from '../Filters/MobileFilterHeader';
import { MobileFilterFooter } from '../Filters/MobileFilterFooter';

/**
 * @typedef {object} Props
 * @property {SearchClient} searchClient
 * @property {string} indexName
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const MobileSearchBar = ({ searchClient, indexName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <button
        type="button"
        className="su-flex su-items-center su-gap-8 sm:su-gap-16 su-text-black-80 su-bg-none su-border-b-2 su-border-b-black-50 su-px-8 su-py-8 su-w-full hover:su-border-lagunita focus:su-border-lagunita"
        onClick={open}
        aria-expanded={isOpen}
        aria-controls="event-search-drawer"
        aria-label="Search by event title"
      >
        <SearchIcon className="su-w-16 su-h-16 su-shrink-0" aria-hidden />{' '}
        <span>
          Search <span className="su-hidden sm:su-inline">by event title</span>
        </span>
      </button>
      <SwipeableDrawer
        id="event-search-drawer"
        role="dialog"
        anchor="right"
        open={isOpen}
        onOpen={open}
        onClose={close}
        classes={{
          paper:
            '!su-w-full sm:!su-w-400 md:!su-w-500 !su-overflow-y-hidden su-overflow-x-hidden',
        }}
      >
        <div className="su-flex su-flex-col su-min-h-screen su-relative">
          <MobileFilterHeader heading="Search" onClose={close} />
          <div className="su-grow su-overflow-y-auto su-px-24 su-pt-24">
            <SearchBar searchClient={searchClient} indexName={indexName} />
          </div>
          <MobileFilterFooter onCloseMenu={close} showClear={false} />
        </div>
      </SwipeableDrawer>
    </>
  );
};
