import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
}) => {
  // Styles for 1st level parent item buttons
  const buttonMobile =
    "su-flex su-items-center su-w-full hocus:su-bg-cardinal-red-xxdark hocus:su-shadow-none su-py-20 su-pl-20 su-pr-80 su-text-20";
  const buttonDesktop =
    "lg:su-items-end lg:su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] lg:hocus:su-bg-transparent lg:su-whitespace-pre lg:hocus:su-text-digital-red-light lg:hocus:su-no-underline lg:su-border-b-[5px] lg:su-border-solid lg:su-border-transparent lg:hocus:su-border-digital-red-xlight lg:su-text-19 2xl:su-text-21";

  // Styles for the down chevron
  const chevronMobile =
    "su-absolute su-right-0 su-w-[3.4rem] su-pt-3 su-pb-1 su-px-2 su-bg-digital-red su-rounded-full group-hocus:!su-bg-digital-red-light su-mr-20";
  const chevronDesktop =
    "lg:su-relative lg:su-mr-0 lg:su-w-[1.2em] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 lg:su-bg-transparent lg:group-hocus:su-text-digital-red-xlight lg:group-hocus:!su-bg-transparent";

  return (
    <Popover
      as="li"
      className="lg:su-inline-block su-relative su-border-b su-border-solid su-border-digital-red-light last:su-border-none lg:su-border-none"
    >
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open
                ? "lg:hocus:su-text-white !su-bg-cardinal-red-xxdark lg:!su-bg-cardinal-red-xdark !su-border-cardinal-red-xdark hover:!su-bg-digital-red lg:hover:!su-bg-cardinal-red-xdark"
                : ""
            } su-group ${buttonMobile} ${buttonDesktop} su-font-bold su-text-left su-leading-snug su-bg-transparent focus:su-outline-none su-underline-offset`}
          >
            {parentText}
            {parentTextSecond && (
              <>
                <br className="su-hidden xl:su-inline 2xl:su-hidden" />
                {parentTextSecond}
              </>
            )}
            <ChevronDownIcon
              className={`su-inline-block su-text-white su-transition ${
                open ? "su-transform-gpu su-rotate-180" : ""
              } ${chevronMobile} ${chevronDesktop}`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="lg:su-transition lg:su-duration lg:su-ease-out"
            enterFrom={`lg:su-transform-gpu ${
              panelFacing === "left"
                ? "su-origin-top-right"
                : "su-origin-top-left"
            } lg:su-scale-75 lg:su-opacity-0`}
            enterTo={`lg:su-transform-gpu ${
              panelFacing === "left"
                ? "su-origin-top-right"
                : "su-origin-top-left"
            } lg:su-scale-100 lg:su-opacity-100`}
            leave="lg:su-transition lg:su-duration lg:su-ease-out"
            leaveFrom={`lg:su-transform-gpu ${
              panelFacing === "left"
                ? "su-origin-top-right"
                : "su-origin-top-left"
            } lg:su-scale-100 lg:su-opacity-100`}
            leaveTo={`lg:su-transform-gpu ${
              panelFacing === "left"
                ? "su-origin-top-right"
                : "su-origin-top-left"
            } lg:su-scale-75 lg:su-opacity-0`}
          >
            <Popover.Panel
              as="ul"
              className={`su-list-unstyled ${
                panelFacing === "left" ? "lg:su-right-0" : ""
              } ${
                open
                  ? "su-bg-cardinal-red-xxdark su-w-full lg:su-bg-cardinal-red-xdark"
                  : ""
              } lg:su-shadow-md lg:su-w-[29rem] su-px-20 su-pt-2 su-pb-10 lg:su-py-10 su-relative lg:su-absolute su-bg-cardinal-red-xdark children:su-mb-0`}
            >
              <CreateBloks blokSection={menuItems} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default MainMenuGroup;
