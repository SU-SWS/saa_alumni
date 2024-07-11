import React, { useContext } from 'react';
import { dcnb } from 'cnbuilder';
import { useCurrentRefinements, useInstantSearch } from 'react-instantsearch';
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
      'su-text-16 su-rs-px-neg2 su-rs-py-neg2 su-text-cardinal-red-dark hocus-visible:su-bg-carinal-red-light-05 hocus:su-decoration-cardinal-red-dark su-transition su-col-span-3',
      {
        'su-border-b-4 su-border-cardinal-red-light su-font-semibold': isActive,
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
  const { items } = useCurrentRefinements({
    includedAttributes: ['state', 'country'],
  });

  const { indexUiState } = useInstantSearch();

  const handleClick = (tab) => () => {
    setActiveTab(tab);
  };

  const activeTabFromRefinements = items.find(
    (item) => item.attribute === 'state' || item.attribute === 'country'
  )?.attribute;

  return (
    <div
      className="su-grid su-grid-cols-9 su-rs-mb-0 su-rs-mt-1 xl:su-mt-0 su-border-b su-border-black-20 su-mx-26 xl:su-mx-0"
      role="tablist"
      aria-label="Location Tabs"
    >
      <LocationFacetTab
        isActive={activeTab === 'city'}
        value="city"
        onClick={handleClick('city')}
      >
        City {indexUiState?.radialGeoSearch?.name && `(1)`}
      </LocationFacetTab>
      <LocationFacetTab
        isActive={activeTab === 'state'}
        value="state"
        onClick={handleClick('state')}
      >
        US State {activeTabFromRefinements === 'state' && `(1)`}
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
