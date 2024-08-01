import React, { createContext, useState } from 'react';
import { useInstantSearch } from 'react-instantsearch';

/**
 * @typedef {object} LocationContextType
 */
export const defaultState = {};
export const LocationContext = createContext(defaultState);

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 *
 * @returns {JSX.Element} LocationFacetProvider
 */
const LocationFacetProvider = ({ children }) => {
  const { indexUiState } = useInstantSearch();

  let defaultTab = 'city';
  if (indexUiState?.refinementList?.state?.length) {
    defaultTab = 'state';
  }
  if (indexUiState?.refinementList?.country?.length) {
    defaultTab = 'country';
  }

  // Holds the state for the active tab.
  const [activeTab, setActiveTab] = useState(defaultTab);
  // Holds the state for the error message.
  const [locError, setLocError] = useState(null);

  // Put it all together.
  const contextValue = {
    ...LocationContext,
    activeTab,
    setActiveTab,
    locError,
    setLocError,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationFacetProvider;
