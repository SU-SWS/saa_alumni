import React from 'react';
import { useInstantSearch, useRefinementList } from 'react-instantsearch';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { Skeleton } from '@mui/material';
import { Heading } from '../simple/Heading';
import { slugify } from '../../utilities/slugify';
import useDisplay from '../../hooks/useDisplay';

const SearchFacet = ({ className, attribute, label, excludes = [] }) => {
  const { items, refine } = useRefinementList({ attribute, limit: 100 });
  const { status } = useInstantSearch();
  const { showDesktop } = useDisplay();

  // Filter out any items we don't want to show.
  const filteredItems = items.filter((item) => !excludes.includes(item.value));
  // Sort the items alphabetically.
  filteredItems.sort((a, b) => a.value.localeCompare(b.value));

  // Show loading.
  if (status === 'loading') {
    return (
      <div>
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
      </div>
    );
  }

  // Nothing to show.
  if (!filteredItems.length) {
    return null;
  }

  // Render stuff.
  return (
    <div
      className={
        className ||
        'su-rs-mb-1 lg:su-rs-mb-3 su-rs-pb-3 lg:su-pb-0 su-border-b lg:su-border-0 su-border-black-20 su-relative'
      }
    >
      <Heading
        level={3}
        size={1}
        weight="semibold"
        className="su-leading-display"
      >
        {label}
      </Heading>

      {filteredItems.map((option, index) => (
        <label
          key={slugify(option.value)}
          className={`su-label su-flex su-items-center su-cursor-pointer su-text-19 hover:su-text-digital-red-xlight
          ${index ? 'su-mt-20' : ''}`}
        >
          <input
            type="checkbox"
            value={option.value}
            name={option.value}
            defaultChecked={option.isRefined}
            className="su-peer su-form-checkbox su-text-digital-red-light su-mr-10 su-w-15 su-h-15 su-cursor-pointer su-rounded su-border-black-40 hocus:su-border-none hocus:su-ring hocus:su-ring-digital-red-light hocus:su-ring-offset-0"
            onChange={(_e) => {
              refine(option.value);
              if (showDesktop) {
                document
                  .getElementById('number-search-results')
                  .focus({ preventScroll: true });
                scrollTo('#search-results');
              }
            }}
          />
          <span className="su-text-16 lg:su-text-19 peer-hover:su-text-digital-red-light peer-focus:su-text-digital-red-light peer-hover:su-underline peer-focus:su-underline hover:su-underline hover:su-text-digital-red-light su-capitalize">
            {option.label}
            <span> ({option.count.toLocaleString('en-us')})</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacet;
