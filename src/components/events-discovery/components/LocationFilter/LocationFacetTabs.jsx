import React, { useContext } from 'react';
import { dcnb } from 'cnbuilder';
import { LocationContext } from './LocationFacetProvider';

/**
 * Location Facet Tab
 */
const LocationFacetTab = ({ isActive, value, children, ...props }) => (
  <button
    type="button"
    role="tab"
    aria-selected={isActive}
    aria-controls={`${value}-panel`}
    data-test={`location-${value}-tab`}
    className={dcnb(
      'su-text-16 su-rs-px-neg2 su-rs-py-neg2 su-text-cardinal-red-dark hocus-visible:su-bg-carinal-red-light-05 hocus:su-decoration-cardinal-red-dark su-transition',
      {
        'su-border-b-4 su-border-cardinal-red-light su-font-semibold': isActive,
      },
      {
        'su-col-span-4': value === 'state',
        'su-col-span-2': value !== 'state',
      }
    )}
    {...props}
  >
    {children}
  </button>
);

/**
 * Location Facet Tabs
 */
const LocationFacetTabs = () => {
  const { activeTab, setActiveTab } = useContext(LocationContext);

  const handleClick = (tab) => () => {
    setActiveTab(tab);
  };

  return (
    <div
      className="su-grid su-grid-cols-8 su-rs-mb-0 su-rs-mt-1 xl:su-mt-0 su-border-b su-border-black-20 su-mx-26 xl:su-mx-0"
      role="tablist"
      aria-label="Location Tabs"
    >
      <LocationFacetTab
        isActive={activeTab === 'city'}
        value="city"
        onClick={handleClick('city')}
      >
        City
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'state'}
        value="state"
        onClick={handleClick('state')}
      >
        US State / Canadian Province
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'country'}
        value="country"
        onClick={handleClick('country')}
      >
        Country
      </LocationFacetTab>
    </div>
  );
};
export default LocationFacetTabs;
