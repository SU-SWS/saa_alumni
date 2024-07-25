import React, { createContext, useState } from 'react';

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
  // Holds the state for the active tab.
  const [activeTab, setActiveTab] = useState('city');
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
