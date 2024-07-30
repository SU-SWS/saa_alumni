import React, { useCallback, useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { MobileFilterHeader } from './MobileFilterHeader';
import { MobileFilterFooter } from './MobileFilterFooter';

export const MobileParentFilter = ({
  label,
  count = 0,
  onCloseMenu,
  children,
}) => {
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
        className="su-group su-flex su-items-center su-w-full su-rounded-none su-p-16 su-border-b hover:su-bg-cardinal-red-light hover:su-text-white focus-visible:su-bg-cardinal-red-light focus-visible:su-text-white"
        onClick={open}
        aria-expanded={isOpen}
        aria-controls="filter-drawer"
      >
        <span className="su-inline-block su-mr-auto">
          {label}{' '}
          {!!count && (
            <span className="su-text-cardinal-red group-hover:su-text-white group-focus-visible:su-text-white">
              ({count})
            </span>
          )}
        </span>
        <ChevronRightIcon className="su-w-20 su-h-20" />
      </button>
      <SwipeableDrawer
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
          <MobileFilterHeader heading={label} count={count} onClose={close} />
          <div className="su-grow su-overflow-y-auto">{children}</div>
          <MobileFilterFooter
            onCloseMenu={() => {
              close();
              onCloseMenu();
            }}
          />
        </div>
      </SwipeableDrawer>
    </>
  );
};
