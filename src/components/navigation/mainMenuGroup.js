import React from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems }, blok }) => (
  <SbEditable content={blok}>
    <li>
      <button type="button">{parentText}</button>
      <ul>
        <CreateBloks blokSection={menuItems} />
      </ul>
    </li>
  </SbEditable>
);

export default MainMenuGroup;
