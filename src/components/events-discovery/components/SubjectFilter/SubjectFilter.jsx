import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { FacetList } from '../Facets';

/**
 * @typedef {object} Props
 * @property {boolean} expanded
 * @property {() => void} [onToggleExpanded]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const SubjectFilter = ({ expanded, onToggleExpanded }) => (
  <FilterAccordion
    expanded={expanded}
    label="Subject"
    onToggleExpanded={onToggleExpanded}
    showReset={false}
  >
    <FacetList attribute="generalTags" label="Interest Areas" subfilter />
    <FacetList attribute="identityTags" label="Diversity/Identity" subfilter />
  </FilterAccordion>
);
