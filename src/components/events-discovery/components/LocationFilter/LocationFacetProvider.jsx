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
  const [activeTab, setActiveTab] = useState('city');
  const contextValue = { ...LocationContext, activeTab, setActiveTab };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationFacetProvider;
