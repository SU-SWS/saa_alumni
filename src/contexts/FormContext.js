import React, { useState, useEffect, createContext } from 'react';

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [travelersData, setTravelersData] = useState([]);

  useEffect(() => {
    if (travelersData.length !== 0) {
      console.log('Prefill form data: ', travelersData);
      window.prefill = travelersData;
    }
  }, [travelersData]);

  return (
    <FormContext.Provider value={[travelersData, setTravelersData]}>
      {children}
    </FormContext.Provider>
  );
}
