import React from 'react';
import {
  useRefinementList,
  ClearRefinements,
  RefinementList,
} from 'react-instantsearch';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const FacetComponent = ({ attribute, label, expanded, toggleFacet }) => {
  const refineList = useRefinementList({ attribute });

  if (refineList?.items?.length === 0) {
    if (!expanded) toggleFacet();
    return null;
  }

  const refinedItems = refineList.items.filter((item) => item.isRefined);
  const refinedItemsCount = refinedItems.length;

  return (
    <div className="su-flex su-flex-col su-my-20 first:su-mt-5 su-mx-6 su-pt-8 su-border-t-2 su-border-black">
      <div className="su-relative">
        <button
          type="button"
          className="su-group su-flex su-flex-row su-justify-between su-items-center su-w-full su-text-2xl su-font-semibold su-text-cardinal-red-light su-mb-4"
          onClick={toggleFacet}
        >
          <h3 className="su-text-black group-hover:su-text-cardinal-red group-hover:su-underline group-focus-visible:su-text-cardinal-red group-focus-visible:su-underline su-text-4xl su-font-semibold su-mb-4">
            {label}
          </h3>

          {expanded ? (
            <ChevronDownIcon className="su-w-40 su-h-40" />
          ) : (
            <ChevronRightIcon className="su-w-40 su-h-40" />
          )}
        </button>
        <ClearRefinements
          includedAttributes={[attribute]}
          translations={{
            resetButtonText:
              refinedItemsCount > 1
                ? `Reset ${refinedItemsCount} filters`
                : 'Reset filter',
          }}
          classNames={{
            button:
              'su-absolute su-right-40 su-top-9 disabled:su-hidden su-text-2xl su-text-cardinal-red-light hocus:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black',
          }}
        />
      </div>
      <RefinementList
        attribute={attribute}
        classNames={{
          root: expanded ? 'su-block' : 'su-hidden',
          list: 'su-list-none su-pl-0',
          item: 'su-mb-0',
          checkbox:
            'su-mx-4 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out hocus:su-bg-cardinal-red focus:su-ring-1 focus:su-ring-cardinal-red-light',
          label: 'hover:su-cursor-pointer',
          count: "su-ml-4 before:su-content-['('] after:su-content-[')']",
        }}
      />
    </div>
  );
};
