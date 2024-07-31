import React from 'react';
import { useRefinementList } from 'react-instantsearch';
import { XIcon } from '@heroicons/react/solid';

export const MobileFacetList = ({ attribute }) => {
  const { canRefine, items, refine } = useRefinementList({ attribute });

  if (!canRefine) {
    return (
      <p className="su-text-20 su-text-center su-m-16">No available filters.</p>
    );
  }

  return (
    <ul className="su-list-none su-pl-0">
      {items.map((item) => (
        <li
          key={item.label}
          data-test="industry-facet-option"
          className="su-font-sans su-leading-display su-mb-0"
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor={item.label}
            className="su-group su-flex su-items-center su-font-sans su-pl-16 su-text-cardinal-red su-w-full su-transition-colors hover:su-bg-cardinal-red-light hover:su-text-white focus-within:su-bg-cardinal-red-light focus-within:su-text-white"
          >
            <input
              name={item.label}
              id={item.label}
              type="checkbox"
              className="su-peer su-mr-6 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out group-hocus:su-ring-1 group-hocus:su-ring-cardinal-red"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
            />
            <span className="su-font-sans su-flex su-w-full su-text-18 su-pl-16 su-pr-26 su-py-14 su-cursor-pointer hover:su-underline">
              <span className="su-grow">
                {item.label}
                <span className="su-font-sans"> ({item.count})</span>
              </span>
              <XIcon className="su-transition su-inline-block su-shrink-0 su-w-[1.2em] su-text-transparent su-transition-none su-ml-16 su--mr-4" />
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};
