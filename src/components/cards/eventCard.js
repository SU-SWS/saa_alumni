import React from "react";
import CreateStories from "../../utilities/createStories";

const EventCard = ({
  blok: {
    eventPicker,
    isBigHeadline,
    isMinimal,
    tabText,
    hideTab,
    headingLevel,
  },
  isDark,
}) => (
  <CreateStories
    stories={eventPicker}
    isBigHeadline={isBigHeadline}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
    tabText={tabText}
    hideTab={hideTab}
    isDark={isDark}
  />
);

export default EventCard;
