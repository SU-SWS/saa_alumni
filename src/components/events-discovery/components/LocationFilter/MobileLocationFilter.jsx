import React, { useMemo } from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import LocationFacetProvider from './LocationFacetProvider';
import LocationFacetTabs from './LocationFacetTabs';
import LocationTabPanelCity from './LocationTabPanelCity';
import LocationTabPanelState from './LocationTabPanelState';
import LocationTabPanelCountry from './LocationTabPanelCountry';
import { MobileParentFilter } from '../Filters/MobileParentFilter';
import { MobileFacetFilter } from '../Facets/MobileFacetFilter';

/**
 * @typedef {object} Props
 * @property {() => void} [onCloseMenu]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const MobileLocationFilter = ({ onCloseMenu }) => {
  const { items } = useCurrentRefinements({
    includedAttributes: ['usRegion', 'intRegion', 'state', 'country'],
  });

  const count = useMemo(
    () =>
      items?.reduce((sum, item) => {
        const numRefinements = item?.refinements?.length ?? 0;
        return sum + numRefinements;
      }, 0) ?? 0,
    [items]
  );

  return (
    <MobileParentFilter
      label="Location"
      count={count}
      onCloseMenu={onCloseMenu}
    >
      <MobileFacetFilter attribute="usRegion" onCloseMenu={onCloseMenu} />
      <MobileFacetFilter attribute="intRegion" onCloseMenu={onCloseMenu} />
      <div className="su-px-16">
        <LocationFacetProvider>
          <LocationFacetTabs />
          <LocationTabPanelCity />
          <LocationTabPanelState />
          <LocationTabPanelCountry />
        </LocationFacetProvider>
      </div>
    </MobileParentFilter>
  );
};
