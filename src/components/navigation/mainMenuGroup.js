import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems } }) => (
  <Popover as="li" className="lg:su-inline-block">
    {({ open }) => (
      <>
        <Popover.Button
          className={`${
            open ? "!su-text-white !su-bg-cardinal-red" : ""
          } su-group su-font-bold su-bg-transparent su-px-16 su-pb-[4.2rem] su-border-solid su-border-b-[5px] su-border-transparent hocus:su-border-digital-red-xlight hocus:su-text-digital-red-xlight hocus:su-no-underline hocus:su-bg-transparent focus:su-outline-none`}
          aria-haspopup
          aria-label={`${open ? "Show" : "Hide"} ${parentText} links`}
        >
          {parentText}
          <ChevronDownIcon
            className={`${open ? "su-transform-gpu su-rotate-180" : ""}
                      su-inline-block su-ml-2 su-w-[1.2em] su-text-white su-transition group-hocus:su-text-digital-red-xlight`}
            aria-hidden="true"
          />
        </Popover.Button>
        <Transition
          enter="su-transition su-duration su-ease-out"
          enterFrom="su-transform-gpu su-origin-top-left su-scale-y-50 lg:su-scale-75 su-opacity-0"
          enterTo="su-transform-gpu su-origin-top-left su-scale-y-100 lg:su-scale-100 su-opacity-100"
          leave="su-transition su-duration su-ease-out"
          leaveFrom="su-transform-gpu su-origin-top-left su-scale-y-100 lg:su-scale-100 su-opacity-100"
          leaveTo="su-transform-gpu su-origin-top-left su-scale-y-50 lg:su-scale-75 su-opacity-0"
        >
          <Popover.Panel
            as="ul"
            className="su-list-unstyled su-shadow-md su-w-[28rem] su-relative lg:su-absolute su-bg-cardinal-red children:su-mb-0"
          >
            <CreateBloks blokSection={menuItems} />
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export default MainMenuGroup;
