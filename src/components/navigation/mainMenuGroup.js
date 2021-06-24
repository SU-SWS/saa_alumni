import React, { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
}) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  }

  return (
    <li className="lg:su-inline-block su-relative">
      <button
        onClick={togglePanel}
        aria-expanded={panelOpened}
        className={`${
          panelOpened
            ? "!su-text-white !su-bg-cardinal-red-xdark !su-border-cardinal-red-xdark"
            : ""
        } su-group su-font-bold su-text-left lg:su-whitespace-pre su-leading-snug su-bg-transparent su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] su-border-solid su-border-b-[5px] su-border-transparent hocus:su-border-digital-red-xlight hocus:su-text-digital-red-xlight hocus:su-no-underline hocus:su-bg-transparent focus:su-outline-none`}
        aria-label={`${parentText} ${parentTextSecond} ${
          panelOpened ? "" : "- Collapsed"
        }`}
      >
        {parentText}
        {parentTextSecond && (
          <>
            <br className="su-hidden xl:su-inline 2xl:su-hidden"/>
            {parentTextSecond}
          </>
        )}
        <ChevronDownIcon
          className={`${panelOpened ? "su-transform-gpu su-rotate-180" : ""}
                      su-inline-block su-w-[1.2em] su-text-white su-transition group-hocus:su-text-digital-red-xlight`}
          aria-hidden="true"
        />
      </button>
      <ul
        className={`${
          panelFacing === "left" ? "lg:su-right-0" : ""
        } ${panelOpened ? "su-block" : "su-hidden"} su-list-unstyled su-shadow-md su-w-[29rem] su-px-20 su-py-10 su-relative lg:su-absolute su-bg-cardinal-red-xdark children:su-mb-0`}
      >
        <CreateBloks blokSection={menuItems}/>
      </ul>
    </li>
  )
};

export default MainMenuGroup;
