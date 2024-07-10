import React from 'react';
import { FilterAccordion } from '../FilterAccordion';
import { OnlineOptionsSubfilter } from './OnlineOptionsSubfilter';
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
        <OnlineOptionsSubfilter
          expanded={onlineOptionsFacet.expanded}
          onToggleExpanded={() => toggleFacet('experience')}
        />
      )}
    </FilterAccordion>
  );
};
