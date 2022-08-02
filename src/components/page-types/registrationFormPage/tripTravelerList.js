import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import TripTravelerListItem from './tripTravelerListItem';
import { FlexBox } from '../../layout/FlexBox';

const TripTravelerList = () => {
  const [state] = useContext(FormContext);

  if (state.travelersData.length === 0) {
    return (
      <p className="su-text-center su-basefont-23">
        No travelers have been selected
      </p>
    );
  }

  return (
    <FlexBox
      direction="col"
      className="icon-card su-group su-basefont-23 children:su-py-12 children:su-border-b-2 children:su-border-black last:children:su-border-none"
      justifyContent="between"
      alignItems="center"
    >
      {state.travelersData.map((traveler) => (
        <TripTravelerListItem key={traveler.su_did} traveler={traveler} />
      ))}
    </FlexBox>
  );
};

export default TripTravelerList;
