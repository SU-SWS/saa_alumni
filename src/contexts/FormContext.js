import React, { useState, useEffect, createContext } from 'react';

export const FormContext = createContext();

export default function FormProvider({ children }) {
  const [travelersData, setTravelersData] = useState([
    {
      id: '73c1d24d-e934-4ade-9101-397bec48fed0',
      type: 'Spouse/Partner',
      digitalName: 'Max Dataton',
      birthDate: '1975-04-02',
    },
    {
      id: '8d5860e9-cb91-4ab0-b1e8-2c2f1e966001',
      type: 'Child',
      digitalName: 'Gregory Bernhard',
      birthDate: '1985-08-16',
    },
  ]);

  return (
    <FormContext.Provider value={[travelersData, setTravelersData]}>
      {children}
    </FormContext.Provider>
  );
}
