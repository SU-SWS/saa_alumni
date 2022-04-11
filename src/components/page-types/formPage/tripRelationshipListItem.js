import React, { useContext } from 'react';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { FormContext } from '../../../contexts/FormContext';
import { FlexBox } from '../../layout/FlexBox';

const TripRelationshipListItem = ({ traveler }) => {
  const [travelersData, setTravelersData] = useContext(FormContext);
  // TODO: ADAPT-4677 Determine how we want to handle the inconsitency between digitalName versus firstName lastName
  let fullName = '';
  if (traveler && traveler?.digitalName) {
    fullName = traveler.digitalName;
  }
  if (traveler && traveler?.firstName && traveler?.lastName) {
    fullName = `${traveler?.firstName} ${traveler?.lastName}`;
  }

  const removeRelationship = () => {
    const travelers = Object.values(travelersData).filter(
      (user) => user.id !== traveler.id
    );
    setTravelersData(travelers);
  };

  return (
    <FlexBox direction="row">
      <Heading level={3} align="left" font="serif">
        {fullName}
      </Heading>
      <button type="button" onClick={removeRelationship}>
        Remove
        <HeroIcon iconType="play" className="su-transition-colors su-inline" />
      </button>
    </FlexBox>
  );
};

export default TripRelationshipListItem;
