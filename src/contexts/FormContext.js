import React, { useReducer, createContext } from 'react';

const initialFormState = {
  registrantsData: [],
};

export const FormContext = createContext(initialFormState);

function formReducer(state, action) {
  switch (action.type) {
    case 'addRegistrant':
      return {
        registrantsData: [...state.registrantsData, action.payload],
      };
    case 'removeRegistrant':
      return {
        registrantsData: state.registrantsData.filter(
          (traveler) => traveler.su_did !== action.payload
        ),
      };
    case 'addSingleRegistrant':
      return {
        registrantsData: [action.payload],
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
