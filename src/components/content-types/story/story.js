import React from "react";
import StoryCardView from "./storyCardView";
import StoryPageView from "./storyPageView";

const Story = ({ layout, ...props }) => {
  if (layout === "card") {
    return <StoryCardView {...props} />;
  }
  return <StoryPageView {...props} />;
};

export default Story;
