import React from 'react';
import LocationFacetProvider from './LocationFacetProvider';
import LocationFacetTabs from './LocationFacetTabs';
import LocationTabPanelCity from './LocationTabPanelCity';
import LocationTabPanelState from './LocationTabPanelState';
import LocationTabPanelCountry from './LocationTabPanelCountry';
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
    <LocationFacetProvider>
      <LocationFacetTabs />
      <LocationTabPanelCity />
      <LocationTabPanelState />
      <LocationTabPanelCountry />
    </LocationFacetProvider>

    <FacetList attribute="usRegion" subfilter />
    <FacetList attribute="intRegion" subfilter />
  </FilterAccordion>
);
