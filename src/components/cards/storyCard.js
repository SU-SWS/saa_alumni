import React from "react";
import CreateStories from "../../utilities/createStories";

const StoryCard = ({ blok: { storyPicker, headingLevel, cardImageFocus } }) => (
  <CreateStories
    stories={storyPicker}
    layout="card"
    orientation="vertical"
    headingLevel={headingLevel}
    cardImageFocus={cardImageFocus}
  />
);

export default StoryCard;
