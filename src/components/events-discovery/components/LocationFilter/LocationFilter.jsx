import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { OnlineOptionsSubfilter } from './OnlineOptionsSubfilter';
import { useFacets } from '../Facets/useFacets';

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {() => void} [onToggleExpanded]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const LocationFilter = ({ expanded, onToggleExpanded }) => {
  const { getFacet, toggleFacet } = useFacets();

  const onlineOptionsFacet = getFacet('experience');

  return (
    <FilterAccordion
      expanded={expanded}
      label="Location"
      onToggleExpanded={onToggleExpanded}
      showReset={false}
    >
      {onlineOptionsFacet && (
        <OnlineOptionsSubfilter
          expanded={onlineOptionsFacet.expanded}
          onToggleExpanded={() => toggleFacet('experience')}
        />
      )}
    </FilterAccordion>
  );
};
