import React, { useCallback, useMemo } from 'react';
import {
  useClearRefinements,
  useCurrentRefinements,
} from 'react-instantsearch';
import LocationFacetProvider from './LocationFacetProvider';
import LocationFacetTabs from './LocationFacetTabs';
import LocationTabPanelCity from './LocationTabPanelCity';
import LocationTabPanelState from './LocationTabPanelState';
import LocationTabPanelCountry from './LocationTabPanelCountry';
import { FilterAccordion } from '../FilterAccordion';
import { FacetList } from '../Facets';
import useRadialGeoSearch from '../../../../hooks/useRadialGeoSearch';

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
  const { refine: clear } = useClearRefinements({
    includedAttributes: ['usRegion', 'intRegion', 'state', 'country'],
  });
  const { items } = useCurrentRefinements({
    includedAttributes: ['usRegion', 'intRegion', 'state', 'country'],
  });
  const { name: geoSearchName, clearRefinements: clearGeoSearch } =
    useRadialGeoSearch();

  const hasRefinements = useMemo(
    () => !!items?.length || !!geoSearchName,
    [items, geoSearchName]
  );

  const clearAll = useCallback(() => {
    if (items?.length) {
      clear();
    }

    if (geoSearchName) {
      clearGeoSearch();
    }
  }, [items, geoSearchName, clear, clearGeoSearch]);

  return (
    <FilterAccordion
      expanded={expanded}
      label="Location"
      onToggleExpanded={onToggleExpanded}
      showReset={hasRefinements}
      onReset={clearAll}
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
};
