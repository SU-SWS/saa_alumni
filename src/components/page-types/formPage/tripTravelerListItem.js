import React, { useContext } from 'react';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { FlexBox } from '../../layout/FlexBox';
import { FormContext } from '../../../contexts/FormContext';

const TripTravelerListItem = ({ traveler }) => {
  const [dispatch] = useContext(FormContext);

  const removeRelationship = () => {
    dispatch({
      type: 'removeTraveler',
      payload: traveler.did,
    });
  };

  return (
    <FlexBox direction="row">
      <Heading level={3} align="left" font="serif">
        {traveler.dname}
      </Heading>
      <button type="button" onClick={removeRelationship}>
        Remove
        <HeroIcon iconType="play" className="su-transition-colors su-inline" />
      </button>
    </FlexBox>
  );
};

export default TripTravelerListItem;
