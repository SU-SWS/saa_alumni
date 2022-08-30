import React, { useContext } from 'react';
import { FormContext } from '../../../contexts/FormContext';
import TripTravelerListItem from './tripTravelerListItem';
import { FlexBox } from '../../layout/FlexBox';

const TripTravelerList = () => {
  const [state] = useContext(FormContext);

  return (
    <FlexBox
      direction="col"
      className="icon-card su-group su-basefont-23 children:su-py-12 children:su-border-b-2 children:su-border-black last:children:su-border-none"
      justifyContent="between"
      alignItems="center"
    >
      {state.travelersData.map((traveler) => {
        if (traveler.su_reg.includes('Primary')) {
          return (
            <>
              <TripTravelerListItem
                key={traveler.su_did}
                traveler={traveler}
                isBtn={false}
              />
            </>
          );
        }
        return (
          <TripTravelerListItem key={traveler.su_did} traveler={traveler} />
        );
      })}
      {state.travelersData.length === 1 && (
        <p className="su-text-center su-basefont-23">
          You haven’t yet added any additional travelers.
        </p>
      )}
    </FlexBox>
  );
};

export default TripTravelerList;
