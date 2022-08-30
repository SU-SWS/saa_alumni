/* eslint-disable no-param-reassign */
import React, { useContext, useEffect } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import { FormContext } from '../../../contexts/FormContext';

const TripPrimaryCard = ({ traveler }) => {
  const [, dispatch] = useContext(FormContext);

  useEffect(() => {
    const addRelationship = () => {
      dispatch({
        type: 'addTraveler',
        payload: traveler,
      });
    };
    addRelationship();
  }, [dispatch, traveler]);

  return (
    <div className="su-basefont-23 su-p-36 su-stretch-link su-w-full su-transition-all su-bg-saa-black-dark su-border-3 su-border-saa-black-dark su-cursor-auto">
      <FlexBox direction="col" className="su-m-w-full" alignItems="start">
        <FlexBox
          direction="row"
          className="su-w-full"
          justifyContent="between"
          alignItems="center"
          gap
        >
          <Heading
            level={4}
            align="left"
            font="serif"
            size={2}
            className="su-m-0"
          >
            {traveler.su_dname} (you)
          </Heading>
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default TripPrimaryCard;
