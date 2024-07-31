import React, { useCallback, useMemo, useState } from 'react';
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

  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const closeAll = useCallback(() => {
    close();
    onCloseMenu();
  }, [close, onCloseMenu]);

  return (
    <MobileParentFilter
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
      label="Location"
      count={count}
      onCloseMenu={closeAll}
    >
      <MobileFacetFilter attribute="usRegion" onCloseMenu={closeAll} />
      <MobileFacetFilter attribute="intRegion" onCloseMenu={closeAll} />
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
