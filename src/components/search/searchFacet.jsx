import React from 'react';
import { useRefinementList } from 'react-instantsearch';
import { Heading } from '../simple/Heading';

const SearchFacet = ({ className, attribute, label, excludes = [] }) => {
  const { items, refine } = useRefinementList({ attribute, limit: 100 });
  // Filter out any items we don't want to show.
  const filteredItems = items.filter((item) => !excludes.includes(item.value));

  return (
    <div
      className={
        className ||
        'su-rs-mb-1 lg:su-rs-mb-3 su-rs-pb-3 lg:su-pb-0 su-border-b lg:su-border-0 su-border-black-20'
      }
    >
      <Heading level={3} weight="semibold" className="su-rs-mb-0 su-text-m0">
        {label}
      </Heading>

      {filteredItems.map((option, index) => (
        <label
          key={option.value}
          className={`su-label su-flex su-items-center su-cursor-pointer su-text-19 hover:su-text-digital-red-xlight
          ${index ? 'su-mt-20' : ''}`}
        >
          <input
            type="checkbox"
            value={option.value}
            name={option.value}
            defaultChecked={option.isRefined}
            className="su-peer su-form-checkbox su-text-digital-red-light su-mr-10 su-w-15 su-h-15 su-cursor-pointer su-rounded su-border-black-40 hocus:su-border-none hocus:su-ring hocus:su-ring-digital-red-light hocus:su-ring-offset-0"
            onChange={() => refine(option.value)}
          />
          <span className="su-text-16 lg:su-text-19 peer-hover:su-text-digital-red-light peer-focus:su-text-digital-red-light peer-hover:su-underline peer-focus:su-underline hover:su-underline hover:su-text-digital-red-light">
            {option.label}
            <span> ({option.count.toLocaleString('en-us')})</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacet;
