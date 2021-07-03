import React from "react";
import CreateStories from "../../utilities/createStories";

const StoryCard = ({
  blok: {
    storyPicker,
    isMinimal,
    isBigHeadline,
    hideTab,
    headingLevel,
    cardImageFocus,
  },
}) => (
  <CreateStories
    stories={storyPicker}
    layout="card"
    isBigHeadline={isBigHeadline}
    hideTab={hideTab}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
  />
);

export default StoryCard;
