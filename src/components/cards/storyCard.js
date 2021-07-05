import React from "react";
import CreateStories from "../../utilities/createStories";

const StoryCard = ({
  blok: {
    storyPicker,
    isMinimal,
    isBigText,
    hideTab,
    hideImage,
    headingLevel,
    cardImageFocus,
  },
  isDark,
}) => (
  <CreateStories
    stories={storyPicker}
    layout="card"
    isBigText
    hideTab={hideTab}
    hideImage={hideImage}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
    isDark={isDark}
  />
);

export default StoryCard;
