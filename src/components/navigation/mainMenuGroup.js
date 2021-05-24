import React from "react";
import { Popover, Transition } from "@headlessui/react";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems } }) => (
  <Popover as="li" className="focus-within:su-bg-cardinal-red">
    <Popover.Button className="su-font-bold su-bg-transparent su-pb-[4.7rem] su-border-solid su-border-b-[5px] su-border-transparent hover:su-border-digital-red-xlight hover:su-text-digital-red-xlight hocus:su-no-underline focus:su-bg-cardinal-red focus:su-text-white hocus:su-bg-transparent">
      {parentText}
    </Popover.Button>
    <Transition
      enter="su-transition su-ease-out"
      enterFrom="su-transform-gpu su-scale-95 su-opacity-0"
      enterTo="su-transform-gpu su-scale-100 su-opacity-100"
      leave="su-transition su-ease-out"
      leaveFrom="su-transform-gpu su-scale-100 su-opacity-100"
      leaveTo="su-transform-gpu su-scale-95 su-opacity-0"
    >
      <Popover.Panel
        as='ul'
        className="su-list-unstyled su-w-[28rem] su-absolute su-bg-cardinal-red children:su-mb-0"
      >
        <CreateBloks blokSection={menuItems} />
      </Popover.Panel>
    </Transition>
  </Popover>
);

export default MainMenuGroup;
