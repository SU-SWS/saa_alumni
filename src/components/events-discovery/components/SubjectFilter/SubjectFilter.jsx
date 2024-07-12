import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { GeneralTagsSubfilter } from './GeneralTagsFilter';
import { IdentityTagsSubfilter } from './IdentityTagsFilter';
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
export const SubjectFilter = ({ expanded, onToggleExpanded }) => {
  const { getFacet, toggleFacet } = useFacets();

  const generalTagsFacet = getFacet('generalTags');
  const identityTagsFacet = getFacet('identityTags');

  return (
    <FilterAccordion
      expanded={expanded}
      label="Subject"
      onToggleExpanded={onToggleExpanded}
      showReset={false}
    >
      {generalTagsFacet && (
        <GeneralTagsSubfilter
          expanded={generalTagsFacet.expanded}
          onToggleExpanded={() => toggleFacet('generalTags')}
        />
      )}
      {identityTagsFacet && (
        <IdentityTagsSubfilter
          expanded={identityTagsFacet.expanded}
          onToggleExpanded={() => toggleFacet('identityTags')}
        />
      )}
    </FilterAccordion>
  );
};
