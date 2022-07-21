import React, { useContext } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { FormContext } from '../../../contexts/FormContext';
import FaIcon from '../../simple/faIcon';

const TripTravelerListItem = ({ traveler }) => {
  const [, dispatch] = useContext(FormContext);

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
      className="su-basefont-23 su-w-full su-pb-12"
      gap
      justifyContent="between"
      alignItems="center"
    >
      <p className="su-big-paragraph su-m-0">{traveler.su_dname}</p>
      <button
        type="button"
        className="su-ghost su-flex su-items-center su-m-0"
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
