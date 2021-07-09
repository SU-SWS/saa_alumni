import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
}) => {
  const buttonMobile =
    "su-w-full hocus:su-bg-cardinal-red-xxdark hocus:su-shadow-none su-py-20";
  const buttonDesktop =
    "su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] lg:hocus:su-bg-transparent lg:su-whitespace-pre lg:hocus:su-text-digital-red-light lg:hocus:su-no-underline lg:su-border-b-[5px] lg:su-border-solid lg:su-border-transparent lg:hocus:su-border-digital-red-xlight";

  const chevronMobile =
    "su-absolute su-right-0 su-w-30 su-bg-digital-red su-rounded-full group-hocus:!su-bg-digital-red-xlight su-mr-15";
  const chevronDesktop =
    "lg:su-relative lg:su-mr-0 lg:su-w-[1.2em] lg:su-bg-transparent lg:group-hocus:su-text-digital-red-xlight lg:group-hocus:!su-bg-transparent";

  return (
    <Popover
      as="li"
      className="lg:su-inline-block su-relative su-border-b su-border-solid su-border-digital-red-xlight last:su-border-none lg:su-border-none"
    >
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open
                ? "!su-text-white !su-bg-cardinal-red-xdark !su-border-cardinal-red-xdark"
                : ""
            } su-group ${buttonMobile} ${buttonDesktop} su-font-bold su-text-left su-leading-snug su-bg-transparent focus:su-outline-none`}
          >
            {parentText}
            {parentTextSecond && (
              <>
                <br className="su-hidden xl:su-inline 2xl:su-hidden" />
                {parentTextSecond}
              </>
            )}
            <ChevronDownIcon
              className={`${open ? "su-transform-gpu su-rotate-180" : ""}
                       ${chevronMobile} ${chevronDesktop} su-inline-block su-text-white su-transition`}
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
              } su-list-unstyled su-shadow-md su-w-[29rem] su-px-20 su-py-10 su-relative lg:su-absolute su-bg-cardinal-red-xdark children:su-mb-0`}
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
