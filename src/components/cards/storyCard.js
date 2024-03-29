import React from 'react';
import CreateStories from '../../utilities/createStories';

const StoryCard = ({
  blok: {
    storyPicker,
    tabText,
    isMinimal,
    isBigText,
    hideTab,
    hideImage,
    headingLevel,
    cardImageFocus,
    id,
  },
  isDark,
}) => (
  <CreateStories
    stories={storyPicker}
    tabText={tabText}
    layout="card"
    isBigText={isBigText}
    hideTab={hideTab}
    hideImage={hideImage}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
    isDark={isDark}
    id={id || null}
  />
);
export default StoryCard;
