import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { FacetSubFilter } from './FacetSubFilter';
import { useFacets } from '../Facets/useFacets';
import LocationFacetProvider from './LocationFacetProvider';
import LocationFacetTabs from './LocationFacetTabs';
import LocationTabPanelCity from './LocationTabPanelCity';
import LocationTabPanelState from './LocationTabPanelState';
import LocationTabPanelCountry from './LocationTabPanelCountry';
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
