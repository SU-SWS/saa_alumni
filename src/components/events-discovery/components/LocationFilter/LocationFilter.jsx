import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { OnlineOptionsSubfilter } from './OnlineOptionsSubfilter';
import { useFacets } from '../Facets/useFacets';
import { UsSubfilter } from './UsSubfilter';
import { InternationalSubfilter } from './InternationalSubfilter';

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
  const usFacet = getFacet('usRegion');
  const internationalFacet = getFacet('intRegion');

  // TODO: Top-level location reset to be handled in DS-707
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
      {usFacet && (
        <UsSubfilter
          expanded={usFacet.expanded}
          onToggleExpanded={() => toggleFacet('usRegion')}
        />
      )}
      {internationalFacet && (
        <InternationalSubfilter
          expanded={internationalFacet.expanded}
          onToggleExpanded={() => toggleFacet('intRegion')}
        />
      )}
    </FilterAccordion>
  );
};
