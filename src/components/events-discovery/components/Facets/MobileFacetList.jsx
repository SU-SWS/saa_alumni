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
            className="su-font-sans su-text-cardinal-red su-w-full"
          >
            <input
              name={item.label}
              id={item.label}
              type="checkbox"
              className="su-sr-only su-peer"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
            />
            <span className="su-font-sans su-flex su-flex-row-reverse su-w-full su-text-18 su-px-26 su-py-14 peer-checked:su-bg-cardinal-red peer-checked:su-text-white su-cursor-pointer hover:su-underline su-transition-colors hover:su-bg-cardinal-red-light hover:su-text-white peer-focus-visible:su-bg-cardinal-red-light peer-focus-visible:su-text-white peer-focus-visible:su-underline peer-checked:first:children:su-text-current hover:peer-checked:su-bg-cardinal-red-light hover:peer-checked:su-text-white su-underline-offset-2 peer-indeterminate:su-bg-cardinal-red peer-indeterminate:su-text-white peer-indeterminate:first:children:su-text-current hover:peer-indeterminate:su-bg-cardinal-red-light hover:peer-indeterminate:su-text-white">
              <XIcon className="su-transition su-inline-block su-shrink-0 su-w-[1.2em] su-text-transparent su-transition-none su-ml-16 su--mr-4" />
              <span className="su-grow">
                {item.label}
                <span className="su-font-sans"> ({item.count})</span>
              </span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};
