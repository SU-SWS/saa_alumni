import React, { createContext } from 'react';

function formReducer(state, action) {
  switch (action.type) {
    case 'setTravelersData':
      return { ...state, travelersData: action.payload };
    default:
      return state;
  }
}

const FormContext = createContext();

class FormContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelersData: [],
    };
  }

  reducer(action) {
    const prevState = this.state;
    this.setState(formReducer(prevState, action));
  }

  dispatch(action) {
    this.reducer(action);
  }

  render() {
    const { children } = this.props;
    const { travelersData } = this.state;
    return (
      <FormContext.Provider value={{ travelersData }}>
        {children}
      </FormContext.Provider>
    );
  }
}

export default FormContext;
export { FormContextProvider };
