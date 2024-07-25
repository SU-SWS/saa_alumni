import React, { useContext } from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { LocationContext } from './LocationFacetProvider';
import LocationFacetTab from './LocationFacetTab';
import useRadialGeoSearch from '../../../../hooks/useRadialGeoSearch';

/**
 * Location Facet Tabs
 *
 * @returns {JSX.Element} LocationFacetTabs
 */
const LocationFacetTabs = () => {
  const { activeTab, setActiveTab } = useContext(LocationContext);
  const { items } = useCurrentRefinements({
    includedAttributes: ['state', 'country'],
  });

  const { name: locationName } = useRadialGeoSearch();

  const handleClick = (tab) => () => {
    setActiveTab(tab);
  };

  const activeTabFromRefinements = items.find(
    (item) => item.attribute === 'state' || item.attribute === 'country'
  )?.attribute;

  return (
    <div
      className="su-grid su-grid-cols-12 su-rs-mb-0 su-rs-mt-1 xl:su-mt-0 su-border-b su-border-black-20 xl:su-mx-0"
      role="tablist"
      aria-label="Location Tabs"
    >
      <LocationFacetTab
        isActive={activeTab === 'city'}
        value="city"
        onClick={handleClick('city')}
      >
        City {locationName && `(1)`}
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'state'}
        value="state"
        onClick={handleClick('state')}
      >
        US State /<br />
        Canadian Province {activeTabFromRefinements === 'state' && `(1)`}
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'country'}
        value="country"
        onClick={handleClick('country')}
      >
        Country {activeTabFromRefinements === 'country' && `(1)`}
      </LocationFacetTab>
    </div>
  );
};
export default LocationFacetTabs;
