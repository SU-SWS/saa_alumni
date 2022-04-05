import React, { useContext } from 'react';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { FormContext } from '../../../contexts/FormContext';
import { FlexBox } from '../../layout/FlexBox';

const TripRelationshipListItem = ({ traveler }) => {
  const [travelersData, setTravelersData] = useContext(FormContext);

  const removeRelationship = () => {
    const travelers = Object.values(travelersData).filter(
      (user) => user.id !== traveler.id
    );
    console.log('Removed: ', travelers);
    setTravelersData(travelers);
  };

  return (
    <FlexBox direction="row">
      <Heading level={3} align="left" font="serif">
        {traveler.digitalName}
      </Heading>
      <button type="button" onClick={removeRelationship}>
        Remove
        <HeroIcon iconType="play" className="su-transition-colors su-inline" />
      </button>
    </FlexBox>
  );
};

export default TripRelationshipListItem;
