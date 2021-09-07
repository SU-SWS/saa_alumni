import React, { useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CreateBloks from "../../utilities/createBloks";
import UseEscape from "../../hooks/useEscape";
import UseOnClickOutside from "../../hooks/useOnClickOutside";

const MainMenuGroup = ({
  blok: { parentText, parentTextSecond, menuItems, panelFacing },
}) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const ref = useRef(null);
  const parentRef = useRef(null);

  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  };

  const isExpanded = (x) => x.getAttribute("aria-expanded") === "true";

  // Close dropdown if escape key is pressed and return focus to the parent item button
  UseEscape(() => {
    if (parentRef.current && isExpanded(parentRef.current)) {
      setPanelOpened(false);
      parentRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setPanelOpened(false));

  const isBrowser = typeof window !== "undefined";
  let activeButton = "";
  let activeChevron = "";

  if (isBrowser) {
    const browserUrl = window.location.href;

    // Loop through children menu items and add active styles to parent button if any childrem items are active
    for (let i = 0; i < menuItems.length; i += 1) {
      if (browserUrl.includes(menuItems[i].link?.cached_url)) {
        activeButton =
          "su-bg-cardinal-red-xxdark lg:su-text-digital-red-xlight lg:su-bg-transparent lg:!su-border-digital-red-xlight";
        activeChevron = "su-bg-digital-red-light lg:su-text-digital-red-xlight";
      }
    }
  }

  // Styles for 1st level parent item buttons
  const buttonMobile =
    "su-flex su-items-center su-w-full hocus:su-bg-cardinal-red-xxdark hocus:su-shadow-none hocus:su-underline su-py-20 su-pl-20 su-pr-80 su-text-20";
  const buttonDesktop =
    "lg:su-items-end lg:su-px-15 xl:su-pt-20 lg:su-pb-18 xl:su-pb-[3rem] lg:hocus:su-bg-transparent lg:su-whitespace-pre lg:hocus:su-text-digital-red-xlight lg:hocus:su-no-underline lg:su-border-b-[5px] lg:su-border-solid lg:su-border-transparent lg:hocus:su-border-digital-red-xlight lg:su-text-19 2xl:su-text-21";

  // Styles for the down chevron
  const chevronMobile =
    "su-absolute su-right-0 su-w-[3.4rem] su-pt-3 su-pb-1 su-px-2 su-bg-digital-red su-rounded-full group-hocus:!su-bg-digital-red-light su-mr-20";
  const chevronDesktop =
    "lg:su-relative lg:su-mr-0 lg:su-w-[1.2em] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 lg:su-bg-transparent lg:group-hocus:su-text-digital-red-xlight lg:group-hocus:!su-bg-transparent";

  return (
    <li
      className="lg:su-inline-block su-relative su-border-b su-border-solid su-border-digital-red-light last:su-border-none lg:su-border-none"
      ref={ref}
    >
      <button
        type="button"
        onClick={togglePanel}
        aria-expanded={panelOpened}
        ref={parentRef}
        className={`${
          panelOpened
            ? "lg:hocus:!su-text-white !su-bg-cardinal-red-xxdark lg:!su-bg-cardinal-red-xdark !su-border-cardinal-red-xdark hover:!su-bg-digital-red lg:hover:!su-bg-cardinal-red-xdark lg:!su-border-transparent"
            : ""
        } su-group su-text-white su-transition-colors ${buttonMobile} ${buttonDesktop} ${activeButton} su-font-bold su-text-left su-leading-snug su-bg-transparent focus:su-outline-none su-underline-offset`}
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
            panelOpened ? "su-transform-gpu su-rotate-180" : ""
          } ${chevronMobile} ${chevronDesktop} ${activeChevron}`}
          aria-hidden="true"
        />
      </button>
      <ul
        className={`su-list-unstyled ${
          panelFacing === "left"
            ? "lg:su-right-0 lg:su-origin-top-right"
            : "lg:su-origin-top-left"
        } ${
          panelOpened
            ? "su-bg-cardinal-red-xxdark su-w-full lg:su-bg-cardinal-red-xdark su-scale-y-100 lg:su-scale-100 su-opacity-100 su-visible su-pb-10"
            : "su-invisible !su-scale-y-75 lg:!su-scale-75 su-opacity-0 children:su-hidden su-pb-0"
        } su-transform-gpu su-transition su-ease-linear lg:su-ease-out su-origin-top lg:su-shadow-md lg:su-w-[29rem] su-px-20 su-pt-2 lg:su-py-10 su-relative lg:su-absolute su-bg-cardinal-red-xdark children:su-mb-0`}
        aria-hidden={!panelOpened}
      >
        <CreateBloks blokSection={menuItems} />
      </ul>
    </li>
  );
};

export default MainMenuGroup;
