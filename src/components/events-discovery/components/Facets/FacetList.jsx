import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import {
  DynamicWidgets,
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
  const { getFacet, toggleFacet } = useFacets();
  const facetState = getFacet(attribute);
  const [isExpanded, setIsExpaned] = useState(!facetState.limitResults);
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
      labelId={`${slugify(facetState.label)}-label-${uniqueId}`}
      headingLevel={subfilter ? 4 : 3}
      onReset={refine}
      onToggleExpanded={() => toggleFacet(attribute)}
      showReset={hasRefinedItems}
      subfilter={subfilter}
    >
      {canRefine ? (
        <>
          <DynamicWidgets maxValuesPerFacet={1000}>
            <RefinementList
              id={`${slugify(facetState.label)}-${uniqueId}`}
              role="group"
              aria-labelledby={`${slugify(facetState.label)}-label-${uniqueId}`}
              attribute={attribute}
              limit={isExpanded ? 1000 : 10}
              classNames={{
                root: 'su-mt-8',
                list: 'su-flex su-flex-col su-gap-4 su-list-none su-pl-8',
                item: 'su-mb-0 su-pl-26',
                label:
                  'su-flex su-flex-wrap su-items-center hover:su-cursor-pointer su-text-18',
                checkbox:
                  '-su-ml-26 su-mr-6 su-items-center su-rounded-md su-bg-white su-w-20 su-h-20 su-border-2 su-border-cardinal-red-light su-text-cardinal-red-light su-cursor-pointer su-transition su-duration-200 su-ease-in-out hocus:su-bg-cardinal-red focus:su-ring-1 focus:su-ring-cardinal-red-light',
                labelText: 'su-mr-4',
                count: "before:su-content-['('] after:su-content-[')']",
              }}
            />
          </DynamicWidgets>
          {facetState.limitResults && (!hasExhaustiveItems || isExpanded) && (
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
