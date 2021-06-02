import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({ blok: { parentText, menuItems } }) => (
  <Popover as="li" className="lg:su-inline-block">
    {({ open }) => (
      <>
        <Popover.Button
          className={`${
            open
              ? "!su-text-white !su-bg-cardinal-red-xdark su-border-none"
              : ""
          } su-group su-font-bold su-bg-transparent su-px-16 lg:su-pb-18 xl:su-pb-[4.2rem] su-border-solid su-border-b-[5px] su-border-transparent hocus:su-border-digital-red-xlight hocus:su-text-digital-red-xlight hocus:su-no-underline hocus:su-bg-transparent focus:su-outline-none`}
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
          as={Fragment}
          enter="su-transition su-duration su-ease-out"
          enterFrom="su-transform-gpu su-origin-top-left su-scale-y-50 lg:su-scale-75 su-opacity-0"
          enterTo="su-transform-gpu su-origin-top-left su-scale-y-100 lg:su-scale-100 su-opacity-100"
          leave="su-transition su-duration su-ease-out"
          leaveFrom="su-transform-gpu su-origin-top-left su-scale-y-100 lg:su-scale-100 su-opacity-100"
          leaveTo="su-transform-gpu su-origin-top-left su-scale-y-50 lg:su-scale-75 su-opacity-0"
        >
          <Popover.Panel
            as="ul"
            className="su-list-unstyled su-shadow-md su-w-[25rem] xl:su-w-[28rem] su-px-20 su-py-10 su-relative lg:su-absolute su-bg-cardinal-red-xdark children:su-mb-0"
          >
            <CreateBloks blokSection={menuItems} />
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export default MainMenuGroup;
