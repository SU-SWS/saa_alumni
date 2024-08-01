import React, { useContext, useRef } from 'react';
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
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
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

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'Home': {
        setActiveTab('city');
        cityRef.current.focus();
        e.preventDefault();
        break;
      }

      case 'ArrowLeft': {
        if (activeTab === 'country') {
          setActiveTab('state');
          stateRef.current.focus();
        } else if (activeTab === 'state') {
          setActiveTab('city');
          cityRef.current.focus();
        } else {
          setActiveTab('country');
          countryRef.current.focus();
        }
        break;
      }

      case 'End': {
        setActiveTab('country');
        countryRef.current.focus();
        e.preventDefault();
        break;
      }

      case 'ArrowRight': {
        if (activeTab === 'city') {
          setActiveTab('state');
          stateRef.current.focus();
        } else if (activeTab === 'state') {
          setActiveTab('country');
          countryRef.current.focus();
        } else {
          setActiveTab('city');
          cityRef.current.focus();
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <div
      className="su-grid su-grid-cols-12 su-rs-mb-0 su-rs-mt-1 xl:su-mt-0 su-border-b su-border-black-20 xl:su-mx-0"
      role="tablist"
      aria-label="Location Tabs"
      onKeyDown={handleKeyPress}
      tabIndex={-1}
    >
      <LocationFacetTab
        isActive={activeTab === 'city'}
        value="city"
        onClick={handleClick('city')}
        ref={cityRef}
      >
        City {locationName && `(1)`}
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'state'}
        value="state"
        onClick={handleClick('state')}
        ref={stateRef}
      >
        US State /<br />
        Canadian Province {activeTabFromRefinements === 'state' && `(1)`}
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'country'}
        value="country"
        onClick={handleClick('country')}
        ref={countryRef}
      >
        Country {activeTabFromRefinements === 'country' && `(1)`}
      </LocationFacetTab>
    </div>
  );
};
export default LocationFacetTabs;
