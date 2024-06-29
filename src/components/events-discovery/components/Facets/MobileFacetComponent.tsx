import React, { useEffect, useState } from 'react';
import { useRefinementList, ClearRefinements } from 'react-instantsearch';
import { ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { Drawer } from '../Drawer/Drawer';

const MobileRefinementList = ({ attribute }) => {
  const { items, refine } = useRefinementList({ attribute });

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

export const MobileFacetComponent = ({
  attribute,
  label,
  previousDrawer,
  setPreviousDrawer,
}) => {
  const refineList = useRefinementList({ attribute });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!previousDrawer) {
      setIsDrawerOpen(false);
    }
  }, [previousDrawer]);

  const refinedItems = refineList.items.filter((item) => item.isRefined);
  const refinedItemsCount = refinedItems.length;

  if (refineList?.items?.length === 0) {
    return null;
  }

  const closeDrawers = () => {
    setIsDrawerOpen(false);
    setPreviousDrawer(false);
  };

  const ClearButton = (
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
          'su-group hover:su-underline focus-visible:su-underline su-transition su-px-13 su-py-9 md:su-px-15 md:su-py-10 su-text-16 su-font-regular su-no-underline su-leading-display su-bg-white hocus:su-bg-white su-text-cardinal-red hocus:su-text-cardinal-red-dark su-border hocus:su-border su-rounded su-border-cardinal-red-light hocus:su-border-cardinal-red-light active:su-border-cardinal-red-light su-shadow hover:su-shadow-md focus:su-ring-2 active:su-ring-2 focus:su-ring-cardinal-red-light active:su-ring-cardinal-red-light hocus:su-decoration-1 su-outline-none disabled:su-hidden',
      }}
    />
  );

  return (
    <div className="su-flex su-flex-col su-border-b su-border-cardinal-red-light">
      <button
        type="button"
        className="su-group hover:su-underline focus-visible:su-underline su-transition su-text-18 su-py-14 su-pl-26 su-pr-48 su-font-regular su-relative su-flex su-items-center su-w-full su-bg-white su-text-cardinal-red hover:su-bg-cardinal-red-light focus-visible:su-bg-cardinal-red-light hover:su-text-white focus-visible:su-text-white su-underline-offset-2 su-outline-none"
        onClick={() => setIsDrawerOpen(true)}
      >
        <span className="su-flex su-justify-between su-w-full">
          <span className="su-font-sans">
            {refinedItemsCount > 0 ? `${label} (${refinedItemsCount})` : label}
          </span>
        </span>
        <ChevronRightIcon className="su-transition su-inline-block !su-w-40 su-absolute su-right-20 group-hocus:su-text-white su-ml-02em" />
      </button>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCloseAll={closeDrawers}
        header={
          refinedItemsCount > 0 ? `${label} (${refinedItemsCount})` : label
        }
        clearButton={ClearButton}
        sub
      >
        <MobileRefinementList attribute={attribute} />
      </Drawer>
    </div>
  );
};
