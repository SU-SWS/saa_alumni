import React from "react";
import CreateStories from "../../utilities/createStories";

const PerkCard = ({ blok: { perkPicker, headingLevel } }) => (
  <CreateStories
    stories={perkPicker}
    layout="card"
    orientation="vertical"
    headingLevel={headingLevel}
  />
);

export default PerkCard;
