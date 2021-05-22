import React from "react";
import SbEditable from "storyblok-react";
import { Menu } from "@headlessui/react";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems }, blok }) => (
  <SbEditable content={blok}>
    <li>
      <Menu>
        <Menu.Button className="su-font-bold su-bg-transparent su-pb-[4.7rem] su-border-solid su-border-b-[5px] su-border-transparent hocus:su-border-digital-red-xlight hocus:su-text-digital-red-xlight hocus:su-no-underline">{parentText}</Menu.Button>
        <Menu.Items as="ul" className="su-list-unstyled su-w-[28rem] su-absolute su-bg-cardinal-red">
          <CreateBloks blokSection={menuItems} />
        </Menu.Items>
      </Menu>
    </li>
  </SbEditable>
);

export default MainMenuGroup;
