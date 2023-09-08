import React, { useContext } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import { FormContext } from '../../../contexts/FormContext';
import HeroIcon from '../../simple/heroIcon';

const TripTravelerCard = ({ traveler }) => {
  const [state, dispatch] = useContext(FormContext);
  const { registrantsData } = state;
  const buttonDisplay = registrantsData.find(
    (selectedTraveler) => selectedTraveler.su_did === traveler.su_did
  );

  const addRelationship = () => {
    if (traveler.su_reg.includes('Primary')) {
      dispatch({
        type: 'addRegistrant',
        payload: traveler,
      });
      return;
    }
    dispatch({
      type: 'addRegistrant',
      payload: traveler,
    });
  };

  const removeRelationship = () => {
    dispatch({
      type: 'removeRegistrant',
      payload: traveler.su_did,
    });
  };

  const toggleRelationship = () => {
    if (buttonDisplay) {
      removeRelationship();
    } else {
      addRelationship();
    }
  };

  return (
    <button
      type="button"
      className="su-basefont-23 su-p-36 su-stretch-link su-w-full su-transition-all su-bg-saa-black-dark su-border-3 su-border-saa-black-dark hocus:su-gradient-border hocus:su-border-to-rt-palo-verde-dark-to-saa-electric-blue"
      onClick={toggleRelationship}
    >
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
            {traveler.su_dname}
            {traveler.su_reg === 'Primary registrant' ? ` (you)` : null}
          </Heading>
          <FlexBox
            direction="row"
            alignItems="center"
            justifyContent="start"
            className="su-shrink-0"
          >
            {buttonDisplay ? (
              <>
                <div className="su-border-2 su-rounded-full su-border-digital-red-xlight su-mr-03em">
                  <HeroIcon
                    iconType="minus"
                    className="su-text-digital-red-xlight"
                  />
                </div>
                <p className="su-basefont-23 su-mb-0">Remove traveler</p>
              </>
            ) : (
              <>
                <div className="su-rounded-full su-p-2 su-bg-gradient-to-bl su-from-saa-electric-blue su-to-palo-verde-dark su-mr-03em">
                  <HeroIcon
                    iconType="plus"
                    className="su-text-saa-electric-blue su-rounded-full su-bg-saa-black"
                  />
                </div>
                <p className="su-basefont-23 su-mb-0">Add traveler</p>
              </>
            )}
          </FlexBox>
        </FlexBox>
        {buttonDisplay && (
          <p className="su-basefont-23 su-mb-0">
            <HeroIcon
              iconType="check"
              className="su-inline-block su-mb-02em su-text-palo-verde-light"
            />
            Added!
          </p>
        )}
      </FlexBox>
    </button>
  );
};

export default TripTravelerCard;
