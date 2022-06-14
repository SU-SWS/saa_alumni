import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import TripTravelerListItem from './tripTravelerListItem';
import { FlexBox } from '../../layout/FlexBox';

const TripTravelerList = () => {
  const [state, dispatch] = useContext(FormContext);

  if (state.travelersData.length === 0) {
    return <p>No travelers have been selected</p>;
  }
  console.log('Current select list: ', state.travelersData);

  return (
    <FlexBox
      direction="col"
      className="icon-card su-group su-basefont-23"
      gap
      justifyContent="between"
      alignItems="start"
    >
      {state.travelersData.map((traveler) => (
        <TripTravelerListItem key={traveler.su_did} traveler={traveler} />
      ))}
    </FlexBox>
  );
};

export default TripTravelerList;
