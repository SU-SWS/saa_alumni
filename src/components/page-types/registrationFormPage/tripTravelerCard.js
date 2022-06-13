/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { FormContext } from '../../../contexts/FormContext';

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

  return (
    <FlexBox
      direction="row"
      className="icon-card su-group su-basefont-23 su-p-36 su-m-w-full"
      gap
      justifyContent="su-justify-between"
    >
      <FlexBox direction="col">
        <Heading
          level={3}
          align="left"
          font="serif"
          id="page-title"
          className="su-text-m2"
        >
          {traveler.su_dname}
        </Heading>
        {traveler?.removeBtn ? (
          <span>
            <HeroIcon
              iconType="play"
              className="su-transition-colors su-inline"
            />
            Remove
          </span>
        ) : (
          <span>
            <HeroIcon
              iconType="play"
              className="su-transition-colors su-inline"
            />
            Added
          </span>
        )}
      </FlexBox>
      {traveler?.removeBtn ? (
        <button
          type="button"
          className="su-button"
          onClick={removeRelationship}
        >
          Remove
          <HeroIcon
            iconType="play"
            className="su-transition-colors su-inline"
          />
        </button>
      ) : (
        <button type="button" className="su-button" onClick={addRelationship}>
          Add
          <HeroIcon
            iconType="play"
            className="su-transition-colors su-inline"
          />
        </button>
      )}
    </FlexBox>
  );
};

export default TripTravelerCard;
