import React, { useState, useContext } from 'react';
import { FlexBox } from '../../layout/FlexBox';
import { GridCell } from '../../layout/GridCell';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { FormContext } from '../../../contexts/FormContext';

const TripRelationShipCard = ({ traveler }) => {
  const [state, dispatch] = useContext(FormContext);
  const [removeBtn, setRemoveBtn] = useState(false);

  let fullName = '';
  if (traveler && traveler?.relatedContactFullNameParsed) {
    fullName = `${traveler.relatedContactFullNameParsed.relatedContactFirstName} ${traveler.relatedContactFullNameParsed.relatedContactLastName}`;
  }
  if (traveler && traveler?.firstName && traveler?.lastName) {
    fullName = `${traveler?.firstName} ${traveler?.lastName}`;
  }

  const addRelationship = () => {
    dispatch({
      type: 'addTraveler',
      payload: traveler,
    });
    setRemoveBtn(true);
  };

  const removeRelationship = () => {
    dispatch({
      type: 'removeTraveler',
      payload: traveler?.id,
    });
    setRemoveBtn(false);
  };

  return (
    <GridCell md={4}>
      <FlexBox
        direction="col"
        className="icon-card su-bg-white print:su-hidden su-group su-relative su-block children:su-mx-auto su-text-center sm:su-max-w-[42rem] lg:su-max-w-[50rem] xl:su-max-w-full su-w-full su-mx-auto su-rs-px-3 md:su-rs-px-1 xl:su-rs-px-3 su-rs-py-3 xl:su-rs-py-4 su-basefont-23 su-break-words su-border su-border-solid su-shadow-sm hover:su-shadow-md"
      >
        <HeroIcon
          iconType="play"
          className="su-mb-02em su-transition-colors su-text-m2"
        />
        {removeBtn ? (
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
        <Heading
          level={3}
          align="left"
          font="serif"
          id="page-title"
          className="su-text-m2"
        >
          {fullName}
        </Heading>
        {removeBtn ? (
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
    </GridCell>
  );
};

export default TripRelationShipCard;
