import React, { useContext } from 'react';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { FlexBox } from '../../layout/FlexBox';
import { FormContext } from '../../../contexts/FormContext';

const TripRelationshipListItem = ({ traveler }) => {
  const [state, dispatch] = useContext(FormContext);

  let fullName = '';
  if (traveler && traveler?.relatedContactFullNameParsed) {
    fullName = `${traveler?.relatedContactFullNameParsed?.relatedContactFirstName} ${traveler?.relatedContactFullNameParsed?.relatedContactLastName}`;
  }
  if (traveler && traveler?.firstName && traveler?.lastName) {
    fullName = `${traveler?.firstName} ${traveler?.lastName}`;
  }

  const removeRelationship = () => {
    dispatch({
      type: 'removeTraveler',
      payload: traveler.relationshipID,
    });
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
