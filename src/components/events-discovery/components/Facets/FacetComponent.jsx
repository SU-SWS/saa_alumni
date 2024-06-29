import React, { useId } from 'react';
import {
  useRefinementList,
  ClearRefinements,
  RefinementList,
} from 'react-instantsearch';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { dcnb } from 'cnbuilder';

export const FacetComponent = ({ attribute, label, expanded, toggleFacet }) => {
  const uniqueId = useId();
  const { items, canRefine } = useRefinementList({ attribute });

  if (!canRefine) {
    return null;
  }

  const refinedItems = items.filter((item) => item.isRefined);
  const refinedItemsCount = refinedItems.length;

  return (
    <div
      className={dcnb(
        'su-grid grid-flow-col su-mx-6 su-pt-8 su-border-t-2 su-border-black su-transition-all',
        {
          'su-grid-rows-[min-content_1fr]': expanded,
          'su-grid-rows-[min-content_0fr]': !expanded,
        }
      )}
    >
      <div className="su-relative">
        <h3 className="su-group su-text-4xl su-font-semibold su-mb-0">
          <button
            type="button"
            className="su-flex su-flex-row su-justify-between su-items-center group-hover:su-text-cardinal-red group-hover:su-underline group-focus-visible:su-text-cardinal-red group-focus-visible:su-underline su-w-full su-font-semibold"
            onClick={toggleFacet}
            aria-expanded={expanded}
            aria-controls={`${attribute}-${uniqueId}`}
          >
            <span>{label}</span>
            <ChevronRightIcon
              className={dcnb(
                'su-w-40 su-h-40 su-transition-transform su-text-cardinal-red-light',
                {
                  'su-rotate-90': expanded,
                }
              )}
            />
          </button>
        </h3>
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
        id={`${attribute}-${uniqueId}`}
        aria-hidden={!expanded}
        attribute={attribute}
        classNames={{
          root: dcnb('su-block su-overflow-hidden', {
            'su-invisible': !expanded,
          }),
          list: 'su-list-none su-pl-0 su-mt-2',
          item: 'su-mb-0',
          checkbox:
            'su-mx-4 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out hocus:su-bg-cardinal-red focus:su-ring-1 focus:su-ring-cardinal-red-light',
          label: 'su-flex su-items-center hover:su-cursor-pointer',
          count: "su-ml-4 before:su-content-['('] after:su-content-[')']",
        }}
      />
    </div>
  );
};
