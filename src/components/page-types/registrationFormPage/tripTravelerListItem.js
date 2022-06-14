import React, { useContext } from 'react';
import { Heading } from '../../simple/Heading';
import { FlexBox } from '../../layout/FlexBox';
import { FormContext } from '../../../contexts/FormContext';
import FaIcon from '../../simple/faIcon';

const TripTravelerListItem = ({ traveler }) => {
  const [state, dispatch] = useContext(FormContext);

  const removeRelationship = () => {
    // eslint-disable-next-line no-param-reassign
    traveler.removeBtn = false;
    dispatch({
      type: 'removeTraveler',
      payload: traveler.su_did,
    });
  };

  return (
    <FlexBox
      direction="row"
      className="su-basefont-23"
      gap
      justifyContent="between"
      alignItems="start"
    >
      <Heading level={4} align="left" font="serif" size={2}>
        {traveler.su_dname}
      </Heading>
      <button
        type="button"
        className="su-ghost su-flex su-items-center"
        onClick={removeRelationship}
      >
        Remove
        <FaIcon
          iconChoice="fa-times"
          iconType="far"
          isOutline="false"
          fixedWidth
          className="su-ml-02em su-transition-colors su-text-digital-red-xlight"
        />
      </button>
    </FlexBox>
  );
};

export default TripTravelerListItem;
