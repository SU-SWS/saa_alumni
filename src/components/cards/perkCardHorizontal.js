import React from "react";
import CreateStories from "../../utilities/createStories";

const PerkCardHorizontal = ({
  blok: { perkPicker, headingLevel, spacingBottom, cardImageFocus },
}) => (
  <CreateStories
    stories={perkPicker}
    layout="card"
    orientation="horizontal"
    headingLevel={headingLevel}
    spacingBottom={spacingBottom}
    cardImageFocus={cardImageFocus}
  />
);

export default PerkCardHorizontal;
