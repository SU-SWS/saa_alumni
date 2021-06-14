import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
}) => (
  <Popover as="li" className="lg:su-inline-block su-relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={`${
            open
              ? "!su-text-white !su-bg-cardinal-red-xdark !su-border-cardinal-red-xdark"
              : ""
          } su-group su-font-bold su-text-left lg:su-whitespace-pre su-leading-snug su-bg-transparent su-px-16 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] su-border-solid su-border-b-[5px] su-border-transparent hocus:su-border-digital-red-xlight hocus:su-text-digital-red-xlight hocus:su-no-underline hocus:su-bg-transparent focus:su-outline-none`}
          aria-label={`${parentText} ${parentTextSecond} ${
            open ? "" : "- Collapsed"
          }`}
        >
          {parentText}
          {parentTextSecond && (
            <>
              <br className="su-hidden xl:su-inline 2xl:su-hidden" />
              {` ${parentTextSecond}`}
            </>
          )}
          <ChevronDownIcon
            className={`${open ? "su-transform-gpu su-rotate-180" : ""}
                      su-inline-block su-w-[1.2em] su-text-white su-transition group-hocus:su-text-digital-red-xlight`}
            aria-hidden="true"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="su-transition su-duration su-ease-out"
          enterFrom={`su-transform-gpu ${
            panelFacing === "left"
              ? "su-origin-top-right"
              : "su-origin-top-left"
          } su-scale-y-50 lg:su-scale-75 su-opacity-0`}
          enterTo={`su-transform-gpu ${
            panelFacing === "left"
              ? "su-origin-top-right"
              : "su-origin-top-left"
          } su-scale-y-100 lg:su-scale-100 su-opacity-100`}
          leave="su-transition su-duration su-ease-out"
          leaveFrom={`su-transform-gpu ${
            panelFacing === "left"
              ? "su-origin-top-right"
              : "su-origin-top-left"
          } su-scale-y-100 lg:su-scale-100 su-opacity-100`}
          leaveTo={`su-transform-gpu ${
            panelFacing === "left"
              ? "su-origin-top-right"
              : "su-origin-top-left"
          } su-scale-y-50 lg:su-scale-75 su-opacity-0`}
        >
          <Popover.Panel
            as="ul"
            className={`${
              panelFacing === "left" ? "lg:su-right-0" : ""
            } su-list-unstyled su-shadow-md su-w-[25rem] xl:su-w-[28rem] su-px-20 su-py-10 su-relative lg:su-absolute su-bg-cardinal-red-xdark children:su-mb-0`}
          >
            <CreateBloks blokSection={menuItems} />
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export default MainMenuGroup;
