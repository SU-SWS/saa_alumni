import React from "react";
import CreateStories from "../../utilities/createStories";

const PerkCardHorizontal = ({
  blok: { perkPicker, headingLevel, spacingBottom },
}) => (
  <CreateStories
    stories={perkPicker}
    layout="card"
    orientation="horizontal"
    headingLevel={headingLevel}
    spacingBottom={spacingBottom}
  />
);

export default PerkCardHorizontal;
