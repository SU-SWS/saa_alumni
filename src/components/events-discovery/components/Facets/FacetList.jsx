import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import {
  RefinementList,
  useClearRefinements,
  useRefinementList,
} from 'react-instantsearch';
import { FilterAccordion } from '../FilterAccordion';
import { useFacets } from './useFacets';
import { slugify } from '../../../../utilities/slugify';

/**
 * @typedef {object} Props
 * @property {string} attribute
 * @property {boolean} [subfilter]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const FacetList = ({ attribute, subfilter = false }) => {
  const uniqueId = useId();
  const [isExpanded, setIsExpaned] = useState(false);
  const { getFacet, toggleFacet } = useFacets();
  const { items, canRefine, hasExhaustiveItems } = useRefinementList({
    attribute,
  });
  const { refine } = useClearRefinements({
    includedAttributes: [attribute],
  });
  const hasRefinedItems = useMemo(
    () => items.some((item) => item.isRefined),
    [items]
  );
  const facetState = getFacet(attribute);

  const toggleExpanded = useCallback(() => {
    setIsExpaned((c) => !c);
  }, [setIsExpaned]);

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        const firstExpandedInput = document
          ?.getElementById(`${slugify(facetState.label)}-${uniqueId}`)
          ?.querySelector('ul li:nth-child(11) input');

        if (firstExpandedInput) {
          firstExpandedInput.focus();
        }
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  if (!facetState) {
    return null;
  }

  return (
    <FilterAccordion
      expanded={facetState.expanded}
      label={facetState.label}
      onReset={refine}
      onToggleExpanded={() => toggleFacet(attribute)}
      showReset={hasRefinedItems}
      subfilter={subfilter}
    >
      {canRefine ? (
        <>
          <RefinementList
            id={`${slugify(facetState.label)}-${uniqueId}`}
            attribute={attribute}
            limit={isExpanded ? 1000 : 10}
            classNames={{
              root: 'su-mt-8',
              list: 'su-flex su-flex-col su-gap-4 su-list-none su-pl-8',
              item: 'su-mb-0',
              checkbox:
                'su-mr-6 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out hocus:su-bg-cardinal-red focus:su-ring-1 focus:su-ring-cardinal-red-light',
              label:
                'su-flex su-items-center hover:su-cursor-pointer su-text-18',
              count: "su-ml-4 before:su-content-['('] after:su-content-[')']",
            }}
          />
          {(!hasExhaustiveItems || isExpanded) && (
            <button
              type="button"
              onClick={toggleExpanded}
              className="su-text-digital-red hocus:su-underline su-text-18 su-pl-8 su-mt-16"
            >
              See {isExpanded ? 'fewer' : 'all'}{' '}
              {facetState.label.toLowerCase()} filters
            </button>
          )}
        </>
      ) : (
        <p className="su-m-0 su-text-16">No available filters.</p>
      )}
    </FilterAccordion>
  );
};
