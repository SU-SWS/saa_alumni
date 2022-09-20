import React, { useContext } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { FormContext } from '../../../contexts/FormContext';
import FaIcon from '../../simple/faIcon';

const TripTravelerListItem = ({ traveler, isBtn = true }) => {
  const [, dispatch] = useContext(FormContext);

  const removeRelationship = () => {
    dispatch({
      type: 'removeTraveler',
      payload: traveler.su_did,
    });
  };

  return (
    <FlexBox
      direction="row"
      className="su-w-full"
      gap
      justifyContent="between"
      alignItems="center"
    >
      <p className="su-big-paragraph su-m-0">
        {traveler.su_dname}
        {!isBtn && ` (you)`}
      </p>
      {isBtn && (
        <button
          type="button"
          className="su-ghost su-flex su-items-center su-m-0 su-text-18"
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
      )}
    </FlexBox>
  );
};

export default TripTravelerListItem;
