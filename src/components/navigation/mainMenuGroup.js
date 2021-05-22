import React from "react";
import SbEditable from "storyblok-react";
import { Menu } from "@headlessui/react";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems }, blok }) => (
  <SbEditable content={blok}>
    <li>
      <Menu>
        <Menu.Button>{parentText}</Menu.Button>
        <Menu.Items as="ul">
          <CreateBloks blokSection={menuItems} />
        </Menu.Items>
      </Menu>
    </li>
  </SbEditable>
);

export default MainMenuGroup;
