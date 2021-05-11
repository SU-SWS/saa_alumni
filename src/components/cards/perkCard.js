import React from "react";
import CreateStories from "../../utilities/createStories";

const PerkCard = ({ blok: { perkPicker } }) => (
  <CreateStories stories={perkPicker} layout="card" />
);

export default PerkCard;
