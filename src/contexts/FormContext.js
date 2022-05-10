import React, { useReducer, createContext } from 'react';

const initialFormState = {
  travelersData: [],
  removeButton: false,
};

export const FormContext = createContext(initialFormState);

function formReducer(state, action) {
  switch (action.type) {
    case 'addRegistrant':
      return {
        travelersData: [action.payload, ...state.travelersData],
        removeButton: true,
      };
    case 'addTraveler':
      return {
        travelersData: [...state.travelersData, action.payload],
        removeButton: true,
      };
    case 'removeTraveler':
      return {
        travelersData: state.travelersData.filter(
          (traveler) => traveler.relationshipID !== action.payload
        ),
        removeButton: false,
      };
    default:
      return state;
  }
}

export const FormContextProvider = (props) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { children } = props;
  return (
    <FormContext.Provider value={[state, dispatch]}>
      {children}
    </FormContext.Provider>
  );
};
