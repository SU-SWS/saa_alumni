import React from 'react';
import CreateStories from '../../utilities/createStories';

const PerkCard = ({
  blok: { perkPicker, headingLevel, cardImageFocus },
  isDark,
}) => (
  <CreateStories
    stories={perkPicker}
    layout="card"
    orientation="vertical"
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
    isDark={isDark}
  />
);

export default PerkCard;
