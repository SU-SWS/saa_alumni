import React from "react";
import CreateStories from "../../utilities/createStories";

const EventCard = ({
  blok: { eventPicker, isBig, isMinimal, headingLevel },
}) => (
  <CreateStories
    stories={eventPicker}
    isBig={isBig}
    isMinimal={isMinimal}
    headingLevel={headingLevel}
  />
);

export default EventCard;
