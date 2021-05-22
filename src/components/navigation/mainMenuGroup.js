import React from "react";
import SbEditable from "storyblok-react";
import { Menu } from "@headlessui/react";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems }, blok }) => (
  <SbEditable content={blok}>
    <li className="focus-within:su-bg-cardinal-red">
      <Menu>
        <Menu.Button className="su-font-bold su-bg-transparent su-pb-[4.7rem] su-border-solid su-border-b-[5px] su-border-transparent hover:su-border-digital-red-xlight hover:su-text-digital-red-xlight hocus:su-no-underline focus:su-bg-cardinal-red focus:su-text-white hocus:su-bg-transparent">
          {parentText}
        </Menu.Button>
        <Menu.Items
          as="ul"
          className="su-list-unstyled su-w-[28rem] su-absolute su-bg-cardinal-red children:su-mb-0"
        >
          <CreateBloks blokSection={menuItems} />
        </Menu.Items>
      </Menu>
    </li>
  </SbEditable>
);

export default MainMenuGroup;
