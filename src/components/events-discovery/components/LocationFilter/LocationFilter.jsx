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
export const LocationFilter = ({ expanded, onToggleExpanded }) => (
  <FilterAccordion
    expanded={expanded}
    label="Location"
    onToggleExpanded={onToggleExpanded}
    showReset={false}
  >
    <FacetList attribute="usRegion" subfilter />
    <FacetList attribute="intRegion" subfilter />
  </FilterAccordion>
);
