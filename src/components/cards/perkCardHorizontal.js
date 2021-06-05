import React from "react";
import CreateStories from "../../utilities/createStories";

const PerkCardHorizontal = ({ blok: { perkPicker, headingLevel } }) => (
  <CreateStories
    stories={perkPicker}
    layout="card"
    orientation="horizontal"
    headingLevel={headingLevel}
  />
);

export default PerkCardHorizontal;
