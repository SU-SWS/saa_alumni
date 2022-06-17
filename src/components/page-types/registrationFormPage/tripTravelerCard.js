/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import { FormContext } from '../../../contexts/FormContext';
import FaIcon from '../../simple/faIcon';

const TripTravelerCard = ({ traveler }) => {
  const [state, dispatch] = useContext(FormContext);

  const addRelationship = () => {
    traveler.removeBtn = true;
    if (traveler.su_reg.includes('Primary')) {
      dispatch({
        type: 'addRegistrant',
        payload: traveler,
      });
      return;
    }
    dispatch({
      type: 'addTraveler',
      payload: traveler,
    });
  };

  const removeRelationship = () => {
    traveler.removeBtn = false;
    dispatch({
      type: 'removeTraveler',
      payload: traveler.su_did,
    });
  };

  const toggleRelationship = () => {
    if (traveler?.removeBtn) {
      removeRelationship();
    } else {
      addRelationship();
    }
  };

  return (
    <button
      type="button"
      className="su-stretch-link su-w-full"
      onClick={toggleRelationship}
    >
      <FlexBox
        direction="row"
        className="su-basefont-23 su-p-36 su-m-w-full"
        gap
        justifyContent="between"
        alignItems="start"
      >
        <FlexBox direction="col" alignItems="start">
          <Heading
            level={4}
            align="left"
            font="serif"
            size={2}
            className="su-m-0"
          >
            {traveler.su_dname}
          </Heading>
          {traveler?.removeBtn && (
            <span className="su-basefont-23">
              <FaIcon
                iconChoice="fa-check"
                iconType="far"
                isOutline="false"
                fixedWidth
                className="su-transition-colors su-text-palo-verde-light"
              />
              Added!
            </span>
          )}
        </FlexBox>
        <span className="su-basefont-23">
          {traveler?.removeBtn ? (
            <>
              <FaIcon
                iconChoice="fa-minus-circle"
                iconType="far"
                isOutline="false"
                fixedWidth
                className="su-mr-02em su-transition-colors su-text-digital-red-xlight"
              />
              Remove traveler
            </>
          ) : (
            <>
              <FaIcon
                iconChoice="fa-plus-circle"
                iconType="far"
                isOutline="false"
                fixedWidth
                className="su-mr-02em su-text-transparent su-bg-clip-text su-bg-gradient-to-tr su-from-palo-verde-dark su-to-saa-electric-blue"
              />
              Add traveler
            </>
          )}
        </span>
      </FlexBox>
    </button>
  );
};

export default TripTravelerCard;
