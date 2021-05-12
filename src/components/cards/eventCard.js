import React from "react";
import CreateStories from "../../utilities/createStories";

const EventCard = ({ blok: { eventPicker } }) => (
  <CreateStories stories={eventPicker} />
);

export default EventCard;
