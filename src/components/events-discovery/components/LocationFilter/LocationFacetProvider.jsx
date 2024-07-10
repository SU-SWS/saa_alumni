import React, { createContext, useState } from 'react';

export const defaultState = {};
export const LocationContext = createContext(defaultState);

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
