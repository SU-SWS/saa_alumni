import React, { useState, useEffect, createContext } from 'react';

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [travelersData, setTravelersData] = useState([]);

  useEffect(() => {
    if (travelersData.length !== 0) {
      // TODO: ADAPT-4677 - Determine how to cross-reference the travelers data with their associated addresses
      console.log('Prefill form data: ', { ...travelersData });
      // TODO: ADAPT-4677 - Update prefill obj with travelers AND their associated addresses
      window.prefill = { ...travelersData };
    }
  }, [travelersData]);

  return (
    <FormContext.Provider value={[travelersData, setTravelersData]}>
      {children}
    </FormContext.Provider>
  );
}
