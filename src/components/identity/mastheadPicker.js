import React from "react";
import CreateStories from "../../utilities/createStories";

const MastheadPicker = ({ blok: { masthead }, hasHero }) => (
  <CreateStories stories={masthead} hasHero={hasHero} />
);

export default MastheadPicker;
