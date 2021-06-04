import React from "react";
import CreateStories from "../../utilities/createStories";

const EventCard = ({
  blok: { eventPicker, isBigHeadline, isMinimal, headingLevel },
}) => (
  <CreateStories
    stories={eventPicker}
    isBigHeadline={isBigHeadline}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
  />
);

export default EventCard;
