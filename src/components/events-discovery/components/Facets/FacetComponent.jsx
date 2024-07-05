import React, { useMemo } from 'react';
import {
  RefinementList,
  useClearRefinements,
  useRefinementList,
} from 'react-instantsearch';
import { FilterAccordion } from '../FilterAccordion';

/**
 * @typedef {object} Props
 * @property {string} attribute
 * @property {string} label
 * @property {boolean} expanded
 * @property {() => void} [onToggleExpanded]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const FacetComponent = ({
  attribute,
  label,
  expanded,
  onToggleExpanded = () => null,
}) => {
  const { items, canRefine } = useRefinementList({ attribute });
  const { refine } = useClearRefinements({
    includedAttributes: [attribute],
  });
  const hasRefinedItems = useMemo(
    () => items.some((item) => item.isRefined),
    [items]
  );

  return (
    <FilterAccordion
      expanded={expanded}
      label={label}
      onReset={refine}
      onToggleExpanded={onToggleExpanded}
      showReset={hasRefinedItems}
    >
      {canRefine ? (
        <RefinementList
          attribute={attribute}
          classNames={{
            root: 'su-mt-8',
            list: 'su-flex su-flex-col su-gap-4 su-list-none su-pl-8',
            item: 'su-mb-0',
            checkbox:
              'su-mr-6 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out hocus:su-bg-cardinal-red focus:su-ring-1 focus:su-ring-cardinal-red-light',
            label: 'su-flex su-items-center hover:su-cursor-pointer su-text-18',
            count: "su-ml-4 before:su-content-['('] after:su-content-[')']",
          }}
        />
      ) : (
        <p className="su-m-0 su-text-16">No available filters.</p>
      )}
    </FilterAccordion>
  );
};
