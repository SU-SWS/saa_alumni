import React, { useId } from 'react';
import { MenuItem, Select } from '@mui/material';
import { useHitsPerPage } from 'react-instantsearch';
import HeroIcon from '../../../simple/heroIcon';

export const EventsPerPage = () => {
  const uniqueId = useId();
  const { refine, canRefine, items } = useHitsPerPage({
    items: [
      { label: '10 events per page', value: 10, default: true },
      { label: '25 events per page', value: 25 },
      { label: '50 events per page', value: 50 },
    ],
  });
  const { value: currentValue } =
    items.find(({ isRefined }) => isRefined) || {};

  if (!canRefine) {
    return null;
  }

  const selectRootClasses =
    'group [&>.MuiOutlinedInput-notchedOutline]:!su-border-0 !su-relative !su-font-sans !su-border-2 !su-border-digital-red focus-within:!su-ring focus-within:!su-ring-digital-blue-light focus-within:!su-ring-offset-1 hover:!su-bg-cardinal-red-xdark focus-within:!su-bg-cardinal-red-xdark !su-transition-colors !su-text-digital-red hover:!su-text-white focus-within:!su-text-white !su-font-semibold';
  const selectClasses =
    '!su-relative !su-z-[1] !su-text-16 !su-leading-normal !su-pl-12 !su-py-8 !su-pr-40 group-hocus-within:!su-bg-digital-red';

  return (
    <>
      <label
        id={`eventsPerPageSelectLabel-${uniqueId}`}
        htmlFor={`eventsPerPageSelect-${uniqueId}`}
        className="su-sr-only"
      >
        Events per page
      </label>
      <Select
        id={`eventsPerPageSelect-${uniqueId}`}
        aria-labelledby={`eventsPerPageSelectLabel-${uniqueId}`}
        value={currentValue}
        onChange={(e) => {
          refine(e.target.value);
        }}
        IconComponent={() => (
          <HeroIcon
            iconType="chevron-down"
            className="!su-absolute !su-right-4 !su-top-9 !su-z-0 su-shrink-0 !su-w-30 !su-h-30 !su-transition-none"
          />
        )}
        classes={{
          root: selectRootClasses,
          select: selectClasses,
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            classes={{
              root: '!su-text-16',
              selected: '!su-bg-digital-red-light/10',
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
