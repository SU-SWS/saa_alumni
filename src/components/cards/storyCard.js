import React from "react";
import CreateStories from "../../utilities/createStories";

const StoryCard = ({
  blok: {
    storyPicker,
    isMinimal,
    isBigText,
    hideTab,
    headingLevel,
    cardImageFocus,
  },
}) => (
  <CreateStories
    stories={storyPicker}
    layout="card"
    isBigText={isBigText}
    hideTab={hideTab}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
  />
);

export default StoryCard;
