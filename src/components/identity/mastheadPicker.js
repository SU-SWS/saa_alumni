import React from "react";
import CreateStories from "../../utilities/createStories";

const MastheadPicker = ({ blok: { masthead } }) => (
  <CreateStories stories={masthead} />
);

export default MastheadPicker;
