import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { FacetSubFilter } from './FacetSubFilter';
import { useFacets } from '../Facets/useFacets';
import LocationFacetProvider from './LocationFacetProvider';
import LocationFacetTabs from './LocationFacetTabs';
import LocationTabPanelCity from './LocationTabPanelCity';
import LocationTabPanelState from './LocationTabPanelState';
import LocationTabPanelCountry from './LocationTabPanelCountry';

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
  const usRegionFacet = getFacet('usRegion');
  const intRegionFacet = getFacet('intRegion');

  return (
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

      {onlineOptionsFacet && (
        <FacetSubFilter
          attribute="experience"
          label="Online Options"
          expanded={onlineOptionsFacet.expanded}
          onToggleExpanded={() => toggleFacet('experience')}
        />
      )}

      {usRegionFacet && (
        <FacetSubFilter
          attribute="usRegion"
          label="United States"
          expanded={usRegionFacet.expanded}
          onToggleExpanded={() => toggleFacet('usRegion')}
        />
      )}

      {intRegionFacet && (
        <FacetSubFilter
          attribute="intRegion"
          label="International"
          expanded={intRegionFacet.expanded}
          onToggleExpanded={() => toggleFacet('intRegion')}
        />
      )}
    </FilterAccordion>
  );
};
