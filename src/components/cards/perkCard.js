import React from 'react';
import CreateStories from '../../utilities/createStories';

const PerkCard = ({ blok: { perkPicker, headingLevel, cardImageFocus } }) => (
  <CreateStories
    stories={perkPicker}
    layout="card"
    orientation="vertical"
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
  />
);

export default PerkCard;
